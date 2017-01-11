import React from 'react';

const ChatMessageLoop = ({messages}) => {

  return (
    <div>
      {messages.map((message, index) => (
        <p key={index.toString()}> {message.text} </p>)
      )}
    </div>
  );
}

export default ChatMessageLoop;