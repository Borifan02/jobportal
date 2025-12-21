'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    timestamp: number;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    addNotification: (title: string, message: string, type?: Notification['type']) => void;
    markAsRead: (id: string) => void;
    clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('jobportal_notifications');
        if (stored) {
            try {
                setNotifications(JSON.parse(stored));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const save = (notes: Notification[]) => {
        setNotifications(notes);
        localStorage.setItem('jobportal_notifications', JSON.stringify(notes));
    };

    const addNotification = (title: string, message: string, type: Notification['type'] = 'info') => {
        const newNote: Notification = {
            id: Date.now().toString(),
            title,
            message,
            type,
            read: false,
            timestamp: Date.now()
        };
        save([newNote, ...notifications]);
    };

    const markAsRead = (id: string) => {
        const updated = notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        );
        save(updated);
    };

    const clearAll = () => {
        save([]);
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            addNotification,
            markAsRead,
            clearAll
        }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotifications must be used within NotificationProvider');
    return context;
}
