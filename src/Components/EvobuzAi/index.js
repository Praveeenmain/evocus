import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import './index.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import bot from '../../assets/bot.png';
import bot1 from '../../assets/bot2.png'; // Custom Floating Icon

const ChatWithAPI = ({ previousStep, triggerNextStep }) => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchResponse = async (userMessage) => {
            try {
                const response = await axios.post('https://evocusbackend.onrender.com/chat', { message: userMessage });
                setMessage(response.data.response);
            } catch (error) {
                setMessage("Sorry, I'm having trouble connecting to the server.");
            } finally {
                setLoading(false);
                triggerNextStep({ value: message, trigger: 'user_input' });
            }
        };

        if (previousStep && previousStep.message) {
            fetchResponse(previousStep.message);
        }
    }, [previousStep, triggerNextStep]);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={bot} alt="Bot Avatar" style={{ width: 30, height: 30, marginRight: 10 }} />
            <span>{loading ? "Typing..." : message}</span>
        </div>
    );
};

const steps = [
    { id: 'welcome', message: "I am Evobuz AI.", trigger: 'user_input' },
    { id: 'user_input', user: true, trigger: 'bot_response' },
    { id: 'bot_response', component: <ChatWithAPI />, waitAction: true, trigger: 'user_input' },
];

const theme = {
    background: '#0A1931',
    headerBgColor: '#16213E',
    headerFontSize: '20px',
    botBubbleColor: '#1F4068',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#E94560',
    userFontColor: 'white',
};

const config = {
    botAvatar: bot,
    floating: true,
    floatingIcon: (
        <div className="glowing-icon">
            <img
                src={bot1}
                alt="Chat Icon"
                style={{
                    width: 50,
                    height: 50,
                    background: "#fff",
                    borderRadius: "50%",
                    padding: "5px",
                }}
            />
        </div>
    ),
};

function AI() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <ChatBot headerTitle="Evobuz AI" steps={steps} {...config} />
            </ThemeProvider>
        </div>
    );
}

export default AI;
