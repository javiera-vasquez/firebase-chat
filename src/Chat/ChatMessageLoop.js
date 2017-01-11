import React from 'react';

const ChatMessageLoop = ({messages}) => {

  return (
    <div className="inner-scroll">
      {messages.map((message, index) => (
        <div className="loop-in-chat clearfix" key={index.toString()}>
          <img className="left" role="presentation" src={message.author.user_image_url} />
          <div className="left">
            <p><strong>{message.author.name}</strong></p>
            <p> {message.text} </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMessageLoop;