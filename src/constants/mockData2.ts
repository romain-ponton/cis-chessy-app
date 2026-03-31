import type { User, Service, Alert, Training, Document, CalendarDay} from "../types/types";

export const MOCK_USER: User = {
    name: 'Sophie Martin',
    role: 'Infirmière Chef',
    avatar: 'SM',
};

export const MOCK_SERVICE: Service = {
    date: 'Mercredi 2 Avril',
    start: '07:00',
    end: '19:00',
    location: 'Service Cardiologie — Bloc B',
    type: 'Jour',
};

export const MOCK_ALERTS: Alert[] = [
    {
        id: 1,
        type: 'critique',
        title: 'Stock critique — Adrénaline',
        desc: 'Niveau critique atteint en pharmacie centrale. Réapprovisionnement requis immédiatement.',
        time: 'Il y a 12 min',
        priority: 1,
    },
    {
        id: 2,
        type: 'urgence',
        title: 'Protocole mise à jour',
        desc: "Le protocole de gestion des urgences COVID a été révisé. Prise de connaissance obligatoire.",
        time: 'Il y a 2h',
        priority: 2,
    },
    {
        id: 3,
        type: 'info',
        title: "Réunion d'équipe",
        desc: 'Réunion mensuelle reprogrammée au vendredi 4 avril, 14h00.',
        time: 'Il y a 1 jour',
        priority: 3,
    },
    {
        id: 4,
        type: 'info',
        title: 'Maintenance système',
        desc: 'Interruption du système informatique prévue samedi de 02h à 04h.',
        time: 'Il y a 2 jours',
        priority: 4,
    },
    {
        id: 5,
        type: 'urgence',
        title: 'Formation obligatoire',
        desc: 'Rappel : formation incendie obligatoire avant le 15 avril.',
        time: 'Il y a 3 jours',
        priority: 5,
    },
];

export const MOCK_TRAININGS: Training[] = [
    { id: 1, title: "Gestes d'urgence & RCP", progress: 85, total: 12, done: 10 },
    { id: 2, title: "Protocoles d'hygiène", progress: 72, total: 8, done: 6 },
    { id: 3, title: 'Gestion des risques', progress: 60, total: 15, done: 9 },
    { id: 4, title: 'Droit des patients', progress: 40, total: 10, done: 4 },
    { id: 5, title: 'Pharmacologie avancée', progress: 20, total: 18, done: 4 },
];

export const MOCK_DOCS: Document[] = [
    { id: 1, title: 'Protocole RCP 2024', size: '2.4 MB', date: '28 mars 2025', type: 'pdf' },
    { id: 2, title: 'Référentiel hygiène hospitalière', size: '5.1 MB', date: '15 mars 2025', type: 'pdf' },
    { id: 3, title: 'Guide urgences pédiatriques', size: '3.8 MB', date: '01 mars 2025', type: 'pdf' },
    { id: 4, title: 'Formulaire déclaration incident', size: '0.9 MB', date: '20 fév. 2025', type: 'form' },
];

export const CALENDAR_DAYS: CalendarDay[] = [
    { day: 'Lun', date: 31, hasService: false, month: 'Mar' },
    { day: 'Mar', date: 1, hasService: true, month: 'Avr' },
    { day: 'Mer', date: 2, hasService: true, month: 'Avr' },
    { day: 'Jeu', date: 3, hasService: false, month: 'Avr' },
    { day: 'Ven', date: 4, hasService: false, month: 'Avr' },
    { day: 'Sam', date: 5, hasService: false, month: 'Avr' },
    { day: 'Dim', date: 6, hasService: true, month: 'Avr' },
];