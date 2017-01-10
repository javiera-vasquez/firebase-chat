import React from 'react'

const ChatRooms = ({rooms, handleClick, activeElement}) => {
  return (
    <ul className="chat-loop">
      {rooms.map((room, index)=> (
        <li
          className={index === activeElement ? 'active room-box': 'room-box'}
          key={index.toString()}
          onClick={() => handleClick(room, index)}
        >{room}
        </li>
      ))}
    </ul>
  );
}

export default ChatRooms;