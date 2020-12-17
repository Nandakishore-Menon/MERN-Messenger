import React,{useState,useEffect} from 'react';
import "./Sidebar.css";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton, Avatar} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import Pusher from 'pusher-js';
import axios from './axios.js'
import {useStateValue} from './StateProvider.js';
function Sidebar(){

    const [rooms, setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();
    useEffect(()=>{
        axios.get('/api/rooms/get').then((res)=>{
        setRooms(res.data);
        });
    },[]);

    useEffect(() => {
        const pusher = new Pusher(`${process.env.REACT_APP_PUSHER_APP_KEY}`, {
        cluster: `${process.env.REACT_APP_PUSHER_CLUSTER}`
        });

        const channel = pusher.subscribe('rooms');
        channel.bind('inserted', function(data) {
        // alert(JSON.stringify(data));
        setRooms([...rooms,data])
        });

        return ()=>{
        channel.unbind_all();
        channel.unsubscribe();
        }
    }, [rooms]);
    
    // console.log("Rooms>>>",rooms);
    const searchfunc = (e)=>{
        if(e === ""||" "){
            axios.get(`/api/rooms/get`).then((res)=>{
                setRooms(res.data);
            }).catch((err)=> alert(err));
        }else{
            axios.get(`/api/room/search/${e}`).then((res)=>{
                setRooms(res.data);
            }).catch((err)=> alert(err));
        }
    }

    return (
        <div className="sidebar">
            <div className = "sidebar_header">
                <Avatar src={user?.photoURL}    />
                <div className = "header_options">
                    <IconButton style = {{color: "#E1E6E2"}}>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton style = {{color: "#E1E6E2"}}>
                        <ChatIcon />
                    </IconButton>
                    <IconButton style = {{color: "#E1E6E2"}}>
                        <MoreVertIcon />
                    </IconButton>
                </div>  
            </div>
            <div className = "sidebar_search">
                <div className="search_container">
                    <SearchOutlined />
                    <input type="text" onChange = {(e)=> searchfunc(e.target.value)} placeholder="Search or start new chat"/>
                </div>
            </div>
            <div className= "sidebar_chats">
                <SidebarChat addNewChat/>
                {/* <SidebarChat />
                <SidebarChat /> */}
                {
                    rooms.map((room) => (
                        <SidebarChat key = {room._id} id = {room._id}
                        name = {room.name} />
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar