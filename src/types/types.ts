// User types
export interface User {
    name: string;
    role: string;
    avatar: string;
}

// Service types
export interface Service {
    date: string;
    start: string;
    end: string;
    location: string;
    type: string;
}

// Alert types
export type AlertType = 'critique' | 'urgence' | 'info';

export interface Alert {
    id: number;
    type: AlertType;
    title: string;
    desc: string;
    time: string;
    priority: number;
}

// Training types
export interface Training {
    id: number;
    title: string;
    progress: number;
    total: number;
    done: number;
}

// Document types
export type DocumentType = 'pdf' | 'form';

export interface Document {
    id: number;
    title: string;
    size: string;
    date: string;
    type: DocumentType;
}

// Calendar types
export interface CalendarDay {
    day: string;
    date: number;
    hasService: boolean;
    month: string;
}

// Navigation types
export type PageName = 'login' | 'home' | 'planning' | 'alerts' | 'training';

// Filter types
export interface Filter {
    id: string;
    label: string;
}

// Alert style types
export interface AlertStyle {
    color: string;
    bg: string;
    label: string;
}