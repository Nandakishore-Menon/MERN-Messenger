import { Avatar, IconButton } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import React, {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom'
import axios from "./axios.js"
import Pusher from 'pusher-js'
import "./Chat.css";
import {useStateValue} from './StateProvider.js';
import { EmojiPicker,unifiedToNative} from 'react-twemoji-picker';
import EmojiData from "react-twemoji-picker/data/twemoji.json";
import ChatMessage from './ChatMessage.js';

function Chat(){
    const [input, setInput] = useState('');
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [{user},dispatch] = useStateValue();
    const [messages, setMessages] = useState([]);
    const [emojiBox, setemojiBox] = useState(false);
    const emojiData = Object.freeze(EmojiData)

    const handleEmojiSelect = (emoji) => {
        const nativeEmoji = unifiedToNative(emoji.unicode);
        // console.log(nativeEmoji);
        setInput(input.concat(nativeEmoji));
    }   
    useEffect(()=>{
        if (roomId){
            axios.get(`/api/rooms/${roomId}`)
            .then(function (response) {
                setRoomName((response.data)[0].name);
            }).catch(()=>{});
        }
        
    },[roomId]);

    useEffect(()=>{
        axios.get('/api/messages/sync').then((res)=>{
        setMessages((res.data).filter((mes)=> mes.room === roomId));
        }).catch(()=>{});
    },[roomId]);
    useEffect(() => {
        const pusher = new Pusher(`${process.env.REACT_APP_PUSHER_APP_KEY}`, {
        cluster: `${process.env.REACT_APP_PUSHER_CLUSTER}`
        });

        var channel = pusher.subscribe('messages');
        channel.bind('inserted', function(data) {
        if(data.room === roomId)
            setMessages([...messages,data])
        else
            setMessages(messages);
        });

        return ()=>{
        channel.unbind_all();
        channel.unsubscribe();
        }
    }, [messages,roomId]);

    const sendMessage =(e) => {
        e.preventDefault();
        axios.post("/api/messages/sent",{
            room: roomId,
            message: input,
            name: user.displayName,
            time: `${(new Date()).toUTCString()}`,
            received: false
        });
        setInput("");
    }

    return (
        <div key={roomId} className = "chat">
            <div className="chat_header">
                <Avatar />
                <div className="chat_header_info">
                    <h3>{roomName}</h3>
                    <p>{messages.length?(new Date((messages[messages.length -1]).time)).toLocaleString():""}</p>
                </div>
                <div className="chat_header_icons">
                </div>
            </div>
            <div id = "chats" className="chat_body">
                {
                    messages.map((message)=>{ return (
                        <p key ={message._id} className={`chat_message ${message.name === user.displayName && "receive"}`}>
                            <span className="chat_name">{(message.name).substr(0, (message.name).indexOf(" "))}</span>
                            <ChatMessage message = {message.message}/>
                            &nbsp;&nbsp;
                            <span className="chat_time">
                                {new Date(Date.parse(message.time)).toLocaleTimeString()}
                            </span>
                        </p>
                    )})
                }
            </div>
            
            <div className="chat_inputbar">
                <div style={{display:(true && emojiBox?"flex":"none"),position: "absolute",margin:"20px", bottom:"16vh", left:"37vw"}}>
                    <EmojiPicker emojiData={emojiData} onEmojiSelect={handleEmojiSelect} />
                </div>
                <IconButton onClick={() =>{setemojiBox(!emojiBox)}}>
                    <InsertEmoticonIcon style = {{color: "#E1E6E2", padding:"10px 0px 10px 15px",margin: "0"}} />
                </IconButton>
                <form>
                    <input 
                        id = "chatInput"
                        value = {input}
                        onChange = {(e) => setInput(e.target.value)}
                        placeholder = "Type a message"
                        type = "text" 
                        onFocusCapture={() =>{setemojiBox(false)}}/>
                        
                    <button onClick = {sendMessage} type = "submit"/>
                </form>
            </div>
        </div>
    )
}

export default Chat