import React from 'react'
import twemoji from 'twemoji'
import './ChatMessage.css'
function ChatMessage({message}) {
    return (
        <span dangerouslySetInnerHTML={{__html:twemoji.parse(message, {
  folder: 'svg',
  ext: '.svg'
})}}>
            
        </span>
    )
}

export default ChatMessage
