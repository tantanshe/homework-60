import {useEffect, useState} from 'react';
import './App.css';
import {Message} from '../types';

const url = 'http://146.185.154.90:8000/messages';

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [interval, setInterval] = useState<number | null>(null);

  useEffect(() => {
    const fetchMessages = async (datetime?: string) => {
      try {
        let fetchUrl = url;
        if (datetime) {
          fetchUrl += `?datetime=${datetime}`;
        }
        const response = await fetch(fetchUrl);
        const data: Message[] = await response.json();
        setMessages(prev => [...data, ...prev].sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()));
      } catch (error) {
        console.error('Error fetching messages', error);
      }
      const newInterval: number = window.setInterval(() => {
        const lastMessage = messages[messages.length - 1];
        fetchMessages(lastMessage?.datetime);
      }, 3000);
      setInterval(newInterval);

      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    };
  }, []);


  return (
    <>
    </>
  );
};

export default App;
