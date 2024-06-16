import React from 'react';
import {Message} from '../../types';

interface MessagesProps {
  messages: Message[];
}

const Messages: React.FC<MessagesProps> = ({messages}) => {
  return (
    <div>
      {messages.map(message => (
        <div key={message._id}>
          <p>{message.author}: {message.message}</p>
          <p>{(message.datetime).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;