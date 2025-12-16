import { useCallback, useEffect, useRef, useState } from "react";
import type { ConnectionStatus, Message, OutgoingMessage } from "../types/chat";

interface UseWebSocketProps {
    username: string;
    channel: string;
    url: string;
}

interface UseWebSocketReturn {
    messages: Message[];
    connectionStatus: ConnectionStatus;
    error: string | null;
    sendMessage: (content: string) => void;
    disconnect: () => void;
}

export function useWebSocket({ username, channel, url} : UseWebSocketProps) : UseWebSocketReturn {
    const [messages, setMessages] = useState<Message[]>([]);
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');
    const [error, setError] = useState<string | null>(null);

    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<number | null>(null);
    const shouldReconnectRef = useRef<boolean>(true);
    const mountedRef = useRef<boolean>(true);

    useEffect(() => {
        mountedRef.current = true;
        shouldReconnectRef.current = true;
    
        const connect = () => {
            if (!mountedRef.current || !shouldReconnectRef.current) return;

            try {
                setConnectionStatus('connecting');
                setError(null);
    
                const wsUrl = `${url}?username=${username}&channel=${channel}`;
                console.log('Connecting to:', wsUrl);
                const ws = new WebSocket(wsUrl);
    
                ws.onopen = () => {
                    if (!mountedRef.current || !shouldReconnectRef.current) {
                        ws.close();
                        return;
                    }
                    console.log('Connected to WebSocket server');
                    setConnectionStatus('connected');
                    setError(null);
                };
    
                ws.onmessage = (event) => {
                    if (!mountedRef.current) return;
                    try {
                        const message: Message = JSON.parse(event.data);
                        console.log('Received message:', message);
                        setMessages((prev) => [...prev, message]);
                    } catch (error) {
                        console.error('Failed to parse message:', error);
                    }
                };
    
                ws.onerror = (event) => {
                    if (!mountedRef.current) return;
                    console.error('WebSocket error:', event);
                    setError('Connection error. Please check if the server is running.');
                    setConnectionStatus('disconnected');
                };
    
                ws.onclose = (event) => {
                    if (!mountedRef.current) return;
                    console.log('WebSocket closed:', event.code, event.reason, 'wasClean:', event.wasClean);
                    setConnectionStatus('disconnected');
                    wsRef.current = null;
    
                    // Only attempt to reconnect if it wasn't a clean close and we should reconnect
                    if (!event.wasClean && shouldReconnectRef.current) {
                        setError('Connection lost. Attempting to reconnect...');
    
                        reconnectTimeoutRef.current = window.setTimeout(() => {
                            if (shouldReconnectRef.current && mountedRef.current) {
                                console.log('Attempting to reconnect...');
                                connect();
                            }
                        }, 3000);
                    } else if (event.wasClean) {
                        console.log('Clean disconnect - not reconnecting');
                    }
                };
    
                wsRef.current = ws;
            } catch (error) {
                console.error('Failed to connect to WebSocket:', error);
                setError('Failed to establish connection. Make sure the server is running on ws://localhost:8080');
                setConnectionStatus('disconnected');
            }
        };
    
        // Small delay to avoid double connection in React StrictMode
        const timeoutId = window.setTimeout(() => {
            connect();
        }, 100);
    
        return () => {
            console.log('Cleaning up WebSocket connection');
            mountedRef.current = false;
            shouldReconnectRef.current = false;
            clearTimeout(timeoutId);
            
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
                reconnectTimeoutRef.current = null;
            }
            
            if (wsRef.current) {
                const ws = wsRef.current;
                if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
                    ws.close(1000, 'Component unmounted');
                }
                wsRef.current = null;
            }
        };
    }, [username, channel, url]);

    const sendMessage = useCallback((content: string) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const message: OutgoingMessage = {
                type: 'message',
                content
            };
            console.log('Sending message:', message);
            wsRef.current.send(JSON.stringify(message));
        } else {
            console.error('Cannot send message: WebSocket not connected. ReadyState:', wsRef.current?.readyState);
            setError('Cannot send message: not connected');
        }
    }, []);

    const disconnect = useCallback(() => {
        console.log('Manual disconnect requested');
        shouldReconnectRef.current = false;
        
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
        }

        if (wsRef.current) {
            const ws = wsRef.current;
            if (ws.readyState === WebSocket.OPEN) {
                ws.close(1000, 'User disconnected');
            }
            wsRef.current = null;
        }
        
        setConnectionStatus('disconnected');
        setError(null);
    }, []);

    return {
        messages,
        connectionStatus,
        error,
        sendMessage,
        disconnect,
    }
}