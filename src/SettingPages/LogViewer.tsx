import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import {getLogs, getUserData, logout} from "../functionality/AuthService";
import {User} from "../models/user";

export type LogType = 'INFO' | 'WARN' | 'ERROR';

export interface Log {
    time: string;
    type: LogType;
    text: string;
}

// let logs: Log[] = [
//     // { time: '2024-06-07 12:00:00', type: 'INFO', text: 'This is an info message.' },
//     // { time: '2024-06-07 12:05:00', type: 'WARN', text: 'This is a warning message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//     // { time: '2024-06-07 12:10:00', type: 'ERROR', text: 'This is an error message.' },
//
// ];

const logStyles: Record<LogType, { backgroundColor: string; color: string }> = {
    INFO: {
        backgroundColor: '#e3f2fd', // Синий светлый фон
        color: '#1e88e5', // Синий текст
    },
    WARN: {
        backgroundColor: '#fff3e0', // Оранжевый светлый фон
        color: '#fb8c00', // Оранжевый текст
    },
    ERROR: {
        backgroundColor: '#ffebee', // Красный светлый фон
        color: '#e53935', // Красный текст
    },
};

const LogViewer: React.FC = () => {
    const [logsDetails, setLogsDetails] = React.useState<Log[]>([]);
    
    React.useEffect(() => {
            getLogs().then((loggs) => {
                if (loggs != null) {
                    setLogsDetails(loggs);
                } else {
                    console.log("error1 logs!");
                }
            });
        },
        []);

    return (
        <Container maxWidth="md">
            <Typography gutterBottom>
                История событий
            </Typography>
            <List>
                {logsDetails.map((log, index) => (
                    <ListItem key={index} style={logStyles[log.type]}>
                        <ListItemText
                            primary={`${log.time} - ${log.type}`}
                            secondary={log.text}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default LogViewer;