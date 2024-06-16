import React, {useState} from 'react';

interface MessageFormProps {
  onSendMessage: (message: string, author: string) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({onSendMessage}) => {
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');

  const submitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message && author) {
      onSendMessage(message, author);
      setMessage('');
      setAuthor('');
    }
  };

  return (
    <form onSubmit={submitMessage}>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Type in your name"
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type in your message"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageForm;