import mongoose from 'mongoose'

const messagingSchema = mongoose.Schema({
    room :String,
    message: String,
    name: String,
    time: String,
    received: Boolean
});

// export {messagingSchema};
export default mongoose.model('messagecontents', messagingSchema);