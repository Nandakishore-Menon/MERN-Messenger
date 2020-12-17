import express from 'express'
import mongoose from 'mongoose'
import messages from './Messages.js'
import rooms from './Rooms.js'
import cors from 'cors'
import Pusher from 'pusher'
import path from 'path'
import dotenv from 'dotenv'

const app = express();
dotenv.config();
app.use(cors());
const port = process.env.PORT || 9000;

app.use(express.json());

const pusher = new Pusher({
    appId: `${process.env.REACT_APP_PUSHER_APP_ID}`,
    key: `${process.env.REACT_APP_PUSHER_APP_KEY}`,
    secret: `${process.env.REACT_APP_PUSHER_APP_SECRET}`,
    cluster: `${process.env.REACT_APP_PUSHER_CLUSTER}`,
    useTLS: true
});

// Database Config
mongoose.connect(`${process.env.MONGODB_URI}`, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
});

// mongoose.Promise = global.Promise;



const mongodb = mongoose.connection
mongodb.once("open", () => {
    console.log("Connected to MongoDB");
    // const messageCollect = mongodb.collection("messagecontents");
    const changeStream = mongodb.watch();

    changeStream.on('change', (change) => {
        console.log(change);
        if (change.operationType === 'insert') {
            const messageInfo = change.fullDocument;
            if (messageInfo.hasOwnProperty('time')) {
                pusher.trigger('messages', 'inserted', {
                    _id: messageInfo._id,
                    room: messageInfo.room,
                    name: messageInfo.name,
                    message: messageInfo.message,
                    time: messageInfo.time,
                    received: messageInfo.received
                });
            } else {
                pusher.trigger('rooms', 'inserted', {
                    _id: messageInfo._id,
                    name: messageInfo.name
                });
            }
        } else {
            console.log("Error while triggering Pusher")
        }


    });
});


app.get('/api/messages/sync', (req, res) => {
    messages.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    })
});
app.get('/api/rooms/get', (req, res) => {
    rooms.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    })
});
app.get('/api/rooms/:id', (req, res) => {
    rooms.find({ _id: req.params.id }, (err, data) => {
        // console.log(data);
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    })
});

app.get('/api/room/search/:id', (req, res) => {
    rooms.find(
        { "name": { "$regex": `${req.params.id}`, "$options": "i" } },
        function (err, data) {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(201).send(data);
            }
        }
    );
});


app.post('/api/messages/sent', (req, res) => {
    const message = req.body;
    // console.log("Server recieved>>>",message);
    messages.create(message, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    })
});
app.post('/api/rooms/add', (req, res) => {
    const room = req.body;
    rooms.create(room, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    })
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    });
}
app.listen(port, () => console.log(`Listening on localhost:${port}`));