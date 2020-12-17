import  React,{useState,useEffect} from 'react'
import "./SidebarChat.css"
import {Avatar} from "@material-ui/core"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from './axios.js'
import {Link} from 'react-router-dom'
import Pusher from 'pusher-js'
import "./ChatMessage.css"
import twemoji from 'twemoji'
function SidebarChat( {id, name, addNewChat} ) {
    
    const [messages, setMessages] = useState("");
    useEffect(()=>{
        axios.get('/api/messages/sync').then((res)=>{
        const mes = (res.data).filter((mes)=> mes.room === id);
        mes.length?setMessages((mes[mes.length -1]).message):setMessages("");
        });
    },[id]);
    useEffect(() => {
        const pusher = new Pusher(`${process.env.REACT_APP_PUSHER_APP_KEY}`, {
            cluster: `${process.env.REACT_APP_PUSHER_CLUSTER}`
        });

        var channel = pusher.subscribe('messages');
        channel.bind('inserted', function(data) {
        // alert(JSON.stringify(data));
        if(data.room === id)
            setMessages(data.message)
        });

        return ()=>{
        channel.unbind_all();
        channel.unsubscribe();
        }
    }, [messages,id]);
    const createNewChat = () =>{
        const chatName = prompt("Enter Chat Name");

        if (chatName){
            axios.post("/api/rooms/add",{
                name: chatName
            });
        }
    };

    return !addNewChat ? (
        <Link to = {`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar />
                <div className="chat_info">
                    <h3>{name}</h3>
                    <p dangerouslySetInnerHTML={{__html: messages?twemoji.parse(messages, {
  folder: 'svg',
  ext: '.svg'
}):""}}></p>
                </div>
            </div>
        </Link>
    ) : (
        <div className="sidebarChat add" onClick={createNewChat}>
            <AddCircleIcon />
            <h3>Add new chat</h3>
        </div>
    );
}

export default SidebarChat
