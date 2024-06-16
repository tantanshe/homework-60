import React from 'react';
import {Message} from '../../types';
import {Container, Card} from 'react-bootstrap';

interface MessagesProps {
  messages: Message[];
}

const MessagesList: React.FC<MessagesProps> = ({messages}) => {
  return (
    <Container className="mt-4">
      {messages.map((message) => (
        <Card key={message._id} className="border border-dark rounded mt-3 mb-3" bg="light">
          <Card.Body className="p-3">
            <Card.Title className="font-weight-bold">{message.author}</Card.Title>
            <Card.Text className="mt-1">{message.message}</Card.Text>
            <Card.Text className="text-muted mb-0">{new Date(message.datetime).toLocaleString()}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default MessagesList;