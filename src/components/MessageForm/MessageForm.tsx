import React, {useState} from 'react';
import {Form, Button, Container} from 'react-bootstrap';

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
    <Container className="mt-3">
      <Form onSubmit={submitMessage}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Type in your name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type in your message"
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" type="submit">
            Send
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default MessageForm;