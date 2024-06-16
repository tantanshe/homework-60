import {useEffect, useState} from 'react';
import './App.css';
import {Message} from '../types';
import MessageForm from '../components/MessageForm/MessageForm';
import MessagesList from '../components/MessagesList/MessagesList';

const url = 'http://146.185.154.90:8000/messages';

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [intervalMsg, setIntervalMsg] = useState<number | null>(null);

  const fetchMessages = async (datetime?: string) => {
    try {
      let fetchUrl = url;
      if (datetime) {
        fetchUrl += `?datetime=${datetime}`;
      }
      const response = await fetch(fetchUrl);
      const data: Message[] = await response.json();
      setMessages(prev => {
        const newMessages = [...data, ...prev];
        const uniqueMessagesMap = new Map(newMessages.map(m => [m._id, m]));
        return Array.from(uniqueMessagesMap.values()).sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
      });
    } catch (error) {
      console.error('Error fetching messages', error);
    }
  };

  useEffect(() => {
    fetchMessages();

    const newIntervalMsg = window.setInterval(() => {
      const lastMessage = messages[messages.length - 1];
      fetchMessages(lastMessage?.datetime);
    }, 3000);
    setIntervalMsg(newIntervalMsg);

    return () => {
      if (intervalMsg) {
        clearInterval(intervalMsg);
      }
    };
  }, []);

  const handleSendMessage = async (message: string, author: string) => {
    try {
      const data = new URLSearchParams();
      data.set('message', message);
      data.set('author', author);

      await fetch(url, {
        method: 'POST',
        body: data,
      });
    } catch (error) {
      console.error('Error sending message', error);
    }
  };


  return (
    <>
      <MessageForm onSendMessage={handleSendMessage}/>
      <MessagesList messages={messages}/>
    </>
  );
};

export default App;