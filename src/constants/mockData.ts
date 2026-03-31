// mock-data.ts

export enum Role {
    UTILISATEUR = 'UTILISATEUR',
    CENTRE_APPEL = 'CENTRE_APPEL',
    ADMIN = 'ADMIN',
}

export enum AvailabilityStatus {
    DISPONIBLE = 'DISPONIBLE',
    INDISPONIBLE = 'INDISPONIBLE',
    A_CONFIRMER = 'A_CONFIRMER',
}

export enum ShiftSlot {
    DAY = 'DAY',
    NIGHT = 'NIGHT',
}

export enum NotificationType {
    INFO = 'INFO',
    URGENT = 'URGENT',
    PLANNING = 'PLANNING',
    FORMATION = 'FORMATION',
}

/**
 * Types front alignés avec Prisma
 * Pour le front, je garde Date en string ISO pour simplifier l'affichage / sérialisation.
 */

export type User = {
    id: string
    firstName: string
    lastName: string
    email: string
    phone?: string | null
    passwordHash: string
    role: Role
    skills: string[]
    isActive: boolean
    createdAt: string
    updatedAt: string
}

export type Availability = {
    id: string
    date: string
    slot: ShiftSlot
    status: AvailabilityStatus
    comment?: string | null
    createdAt: string
    updatedAt: string
    userId: string
}

export type OperationalNeed = {
    id: string
    date: string
    slot: ShiftSlot
    neededCount: number
    requiredSkills: string[]
    note?: string | null
    createdAt: string
    updatedAt: string
    createdById: string
}

export type Notification = {
    id: string
    title: string
    message: string
    type: NotificationType
    urgent: boolean
    createdAt: string
    createdById: string
    recipientIds: string[]
}

export type TrainingTrack = {
    id: string
    title: string
    percentage: number
    createdAt: string
    updatedAt: string
    userId: string
}

export type TrainingItem = {
    id: string
    label: string
    completed: boolean
    completedAt?: string | null
    trainingTrackId: string
}

export type Document = {
    id: string
    name: string
    fileUrl: string
    category: string
    createdAt: string
    uploadedById: string
}

/* -------------------------------------------------------------------------- */
/*                                   USERS                                    */
/* -------------------------------------------------------------------------- */

export const users: User[] = [
    {
        id: 'user_admin_001',
        firstName: 'Claire',
        lastName: 'Martin',
        email: 'claire.martin@cis-chessy.fr',
        phone: '0600000001',
        passwordHash: '$2b$10$adminhash',
        role: Role.ADMIN,
        skills: ['commandement', 'secours', 'organisation'],
        isActive: true,
        createdAt: '2026-01-05T08:00:00.000Z',
        updatedAt: '2026-03-30T10:00:00.000Z',
    },
    {
        id: 'user_call_001',
        firstName: 'Julien',
        lastName: 'Roux',
        email: 'julien.roux@cis-chessy.fr',
        phone: '0600000002',
        passwordHash: '$2b$10$callhash',
        role: Role.CENTRE_APPEL,
        skills: ['coordination', 'radio', 'dispatch'],
        isActive: true,
        createdAt: '2026-01-08T08:00:00.000Z',
        updatedAt: '2026-03-28T09:15:00.000Z',
    },
    {
        id: 'user_001',
        firstName: 'Lucas',
        lastName: 'Bernard',
        email: 'lucas.bernard@cis-chessy.fr',
        phone: '0600000003',
        passwordHash: '$2b$10$userhash1',
        role: Role.UTILISATEUR,
        skills: ['prompt-secours', 'incendie', 'secours-routier'],
        isActive: true,
        createdAt: '2026-01-12T08:00:00.000Z',
        updatedAt: '2026-03-25T11:00:00.000Z',
    },
    {
        id: 'user_002',
        firstName: 'Emma',
        lastName: 'Petit',
        email: 'emma.petit@cis-chessy.fr',
        phone: '0600000004',
        passwordHash: '$2b$10$userhash2',
        role: Role.UTILISATEUR,
        skills: ['secours-a-personne', 'prompt-secours'],
        isActive: true,
        createdAt: '2026-01-14T08:00:00.000Z',
        updatedAt: '2026-03-26T10:20:00.000Z',
    },
    {
        id: 'user_003',
        firstName: 'Nathan',
        lastName: 'Moreau',
        email: 'nathan.moreau@cis-chessy.fr',
        phone: '0600000005',
        passwordHash: '$2b$10$userhash3',
        role: Role.UTILISATEUR,
        skills: ['incendie', 'ARI', 'lance'],
        isActive: true,
        createdAt: '2026-01-16T08:00:00.000Z',
        updatedAt: '2026-03-27T07:50:00.000Z',
    },
    {
        id: 'user_004',
        firstName: 'Chloé',
        lastName: 'Garcia',
        email: 'chloe.garcia@cis-chessy.fr',
        phone: '0600000006',
        passwordHash: '$2b$10$userhash4',
        role: Role.UTILISATEUR,
        skills: ['transmission', 'secours-a-personne'],
        isActive: true,
        createdAt: '2026-01-20T08:00:00.000Z',
        updatedAt: '2026-03-24T14:30:00.000Z',
    },
    {
        id: 'user_005',
        firstName: 'Hugo',
        lastName: 'Leclerc',
        email: 'hugo.leclerc@cis-chessy.fr',
        phone: '0600000007',
        passwordHash: '$2b$10$userhash5',
        role: Role.UTILISATEUR,
        skills: ['secours-routier', 'desincarceration', 'incendie'],
        isActive: true,
        createdAt: '2026-01-22T08:00:00.000Z',
        updatedAt: '2026-03-21T12:45:00.000Z',
    },
    {
        id: 'user_006',
        firstName: 'Lina',
        lastName: 'Faure',
        email: 'lina.faure@cis-chessy.fr',
        phone: null,
        passwordHash: '$2b$10$userhash6',
        role: Role.UTILISATEUR,
        skills: ['secours-a-personne', 'logistique'],
        isActive: true,
        createdAt: '2026-01-25T08:00:00.000Z',
        updatedAt: '2026-03-29T16:10:00.000Z',
    },
    {
        id: 'user_007',
        firstName: 'Tom',
        lastName: 'Chevalier',
        email: 'tom.chevalier@cis-chessy.fr',
        phone: '0600000009',
        passwordHash: '$2b$10$userhash7',
        role: Role.UTILISATEUR,
        skills: ['incendie', 'chef-agres', 'ARI'],
        isActive: false,
        createdAt: '2026-01-27T08:00:00.000Z',
        updatedAt: '2026-03-18T18:00:00.000Z',
    },
    {
        id: 'user_008',
        firstName: 'Sarah',
        lastName: 'Robin',
        email: 'sarah.robin@cis-chessy.fr',
        phone: '0600000010',
        passwordHash: '$2b$10$userhash8',
        role: Role.UTILISATEUR,
        skills: ['formation', 'secours-a-personne', 'incendie'],
        isActive: true,
        createdAt: '2026-02-01T08:00:00.000Z',
        updatedAt: '2026-03-30T08:40:00.000Z',
    },
]

/* -------------------------------------------------------------------------- */
/*                              AVAILABILITIES                                */
/* -------------------------------------------------------------------------- */

export const availabilities: Availability[] = [
    {
        id: 'availability_001',
        date: '2026-04-01T00:00:00.000Z',
        slot: ShiftSlot.DAY,
        status: AvailabilityStatus.DISPONIBLE,
        comment: 'Disponible toute la journée',
        createdAt: '2026-03-28T08:00:00.000Z',
        updatedAt: '2026-03-28T08:00:00.000Z',
        userId: 'user_001',
    },
    {
        id: 'availability_002',
        date: '2026-04-01T00:00:00.000Z',
        slot: ShiftSlot.NIGHT,
        status: AvailabilityStatus.A_CONFIRMER,
        comment: 'Sous réserve',
        createdAt: '2026-03-28T08:10:00.000Z',
        updatedAt: '2026-03-29T09:00:00.000Z',
        userId: 'user_001',
    },
    {
        id: 'availability_003',
        date: '2026-04-01T00:00:00.000Z',
        slot: ShiftSlot.DAY,
        status: AvailabilityStatus.INDISPONIBLE,
        comment: 'Travail',
        createdAt: '2026-03-28T08:20:00.000Z',
        updatedAt: '2026-03-28T08:20:00.000Z',
        userId: 'user_002',
    },
    {
        id: 'availability_004',
        date: '2026-04-01T00:00:00.000Z',
        slot: ShiftSlot.NIGHT,
        status: AvailabilityStatus.DISPONIBLE,
        comment: null,
        createdAt: '2026-03-28T08:30:00.000Z',
        updatedAt: '2026-03-28T08:30:00.000Z',
        userId: 'user_002',
    },
    {
        id: 'availability_005',
        date: '2026-04-02T00:00:00.000Z',
        slot: ShiftSlot.DAY,
        status: AvailabilityStatus.DISPONIBLE,
        comment: null,
        createdAt: '2026-03-29T07:00:00.000Z',
        updatedAt: '2026-03-29T07:00:00.000Z',
        userId: 'user_003',
    },
    {
        id: 'availability_006',
        date: '2026-04-02T00:00:00.000Z',
        slot: ShiftSlot.NIGHT,
        status: AvailabilityStatus.DISPONIBLE,
        comment: 'Joignable par téléphone',
        createdAt: '2026-03-29T07:15:00.000Z',
        updatedAt: '2026-03-29T07:15:00.000Z',
        userId: 'user_003',
    },
    {
        id: 'availability_007',
        date: '2026-04-02T00:00:00.000Z',
        slot: ShiftSlot.DAY,
        status: AvailabilityStatus.A_CONFIRMER,
        comment: 'Peut-être disponible en fin de matinée',
        createdAt: '2026-03-29T08:00:00.000Z',
        updatedAt: '2026-03-30T12:00:00.000Z',
        userId: 'user_004',
    },
    {
        id: 'availability_008',
        date: '2026-04-02T00:00:00.000Z',
        slot: ShiftSlot.NIGHT,
        status: AvailabilityStatus.INDISPONIBLE,
        comment: null,
        createdAt: '2026-03-29T08:20:00.000Z',
        updatedAt: '2026-03-29T08:20:00.000Z',
        userId: 'user_004',
    },
    {
        id: 'availability_009',
        date: '2026-04-03T00:00:00.000Z',
        slot: ShiftSlot.DAY,
        status: AvailabilityStatus.DISPONIBLE,
        comment: null,
        createdAt: '2026-03-29T09:00:00.000Z',
        updatedAt: '2026-03-29T09:00:00.000Z',
        userId: 'user_005',
    },
    {
        id: 'availability_010',
        date: '2026-04-03T00:00:00.000Z',
        slot: ShiftSlot.NIGHT,
        status: AvailabilityStatus.DISPONIBLE,
        comment: 'Disponible jusqu’à 6h',
        createdAt: '2026-03-29T09:10:00.000Z',
        updatedAt: '2026-03-29T09:10:00.000Z',
        userId: 'user_005',
    },
    {
        id: 'availability_011',
        date: '2026-04-03T00:00:00.000Z',
        slot: ShiftSlot.DAY,
        status: AvailabilityStatus.INDISPONIBLE,
        comment: 'Formation externe',
        createdAt: '2026-03-29T09:30:00.000Z',
        updatedAt: '2026-03-29T09:30:00.000Z',
        userId: 'user_006',
    },
    {
        id: 'availability_012',
        date: '2026-04-03T00:00:00.000Z',
        slot: ShiftSlot.NIGHT,
        status: AvailabilityStatus.A_CONFIRMER,
        comment: null,
        createdAt: '2026-03-29T09:45:00.000Z',
        updatedAt: '2026-03-29T09:45:00.000Z',
        userId: 'user_006',
    },
]

/* -------------------------------------------------------------------------- */
/*                             OPERATIONAL NEEDS                              */
/* -------------------------------------------------------------------------- */

export const operationalNeeds: OperationalNeed[] = [
    {
        id: 'need_001',
        date: '2026-04-01T00:00:00.000Z',
        slot: ShiftSlot.DAY,
        neededCount: 4,
        requiredSkills: ['incendie', 'prompt-secours'],
        note: 'Renfort journée secteur nord',
        createdAt: '2026-03-30T07:00:00.000Z',
        updatedAt: '2026-03-30T07:00:00.000Z',
        createdById: 'user_admin_001',
    },
    {
        id: 'need_002',
        date: '2026-04-01T00:00:00.000Z',
        slot: ShiftSlot.NIGHT,
        neededCount: 2,
        requiredSkills: ['secours-a-personne'],
        note: 'Garde de nuit standard',
        createdAt: '2026-03-30T07:15:00.000Z',
        updatedAt: '2026-03-30T07:15:00.000Z',
        createdById: 'user_call_001',
    },
    {
        id: 'need_003',
        date: '2026-04-02T00:00:00.000Z',
        slot: ShiftSlot.DAY,
        neededCount: 3,
        requiredSkills: ['secours-routier', 'desincarceration'],
        note: 'Exercice départemental',
        createdAt: '2026-03-30T08:00:00.000Z',
        updatedAt: '2026-03-30T08:10:00.000Z',
        createdById: 'user_admin_001',
    },
    {
        id: 'need_004',
        date: '2026-04-03T00:00:00.000Z',
        slot: ShiftSlot.NIGHT,
        neededCount: 3,
        requiredSkills: ['ARI', 'incendie'],
        note: null,
        createdAt: '2026-03-30T08:30:00.000Z',
        updatedAt: '2026-03-30T08:30:00.000Z',
        createdById: 'user_call_001',
    },
]

/* -------------------------------------------------------------------------- */
/*                               NOTIFICATIONS                                */
/* -------------------------------------------------------------------------- */

export const notifications: Notification[] = [
    {
        id: 'notif_001',
        title: 'Mise à jour du planning',
        message: 'Le planning du 1er avril a été mis à jour.',
        type: NotificationType.PLANNING,
        urgent: false,
        createdAt: '2026-03-30T09:00:00.000Z',
        createdById: 'user_admin_001',
        recipientIds: ['user_001', 'user_002', 'user_003', 'user_004', 'user_005', 'user_006', 'user_008'],
    },
    {
        id: 'notif_002',
        title: 'Besoin urgent de renfort',
        message: 'Renfort immédiat demandé pour la garde de nuit du 1er avril.',
        type: NotificationType.URGENT,
        urgent: true,
        createdAt: '2026-03-30T10:15:00.000Z',
        createdById: 'user_call_001',
        recipientIds: ['user_001', 'user_003', 'user_005', 'user_008'],
    },
    {
        id: 'notif_003',
        title: 'Nouvelle formation SAP',
        message: 'Une session de formation secours à personne est disponible.',
        type: NotificationType.FORMATION,
        urgent: false,
        createdAt: '2026-03-30T11:00:00.000Z',
        createdById: 'user_admin_001',
        recipientIds: ['user_002', 'user_004', 'user_006', 'user_008'],
    },
    {
        id: 'notif_004',
        title: 'Information générale',
        message: 'Merci de vérifier vos disponibilités pour la semaine prochaine.',
        type: NotificationType.INFO,
        urgent: false,
        createdAt: '2026-03-30T12:00:00.000Z',
        createdById: 'user_admin_001',
        recipientIds: ['user_001', 'user_002', 'user_003', 'user_004', 'user_005', 'user_006', 'user_007', 'user_008'],
    },
]

/* -------------------------------------------------------------------------- */
/*                              TRAINING TRACKS                               */
/* -------------------------------------------------------------------------- */

export const trainingTracks: TrainingTrack[] = [
    {
        id: 'track_001',
        title: 'Formation Incendie Niveau 1',
        percentage: 75,
        createdAt: '2026-02-10T08:00:00.000Z',
        updatedAt: '2026-03-20T09:00:00.000Z',
        userId: 'user_001',
    },
    {
        id: 'track_002',
        title: 'Formation SAP Initiale',
        percentage: 100,
        createdAt: '2026-02-12T08:00:00.000Z',
        updatedAt: '2026-03-18T17:00:00.000Z',
        userId: 'user_002',
    },
    {
        id: 'track_003',
        title: 'Maintien des acquis ARI',
        percentage: 50,
        createdAt: '2026-02-15T08:00:00.000Z',
        updatedAt: '2026-03-22T14:00:00.000Z',
        userId: 'user_003',
    },
    {
        id: 'track_004',
        title: 'Transmission radio',
        percentage: 25,
        createdAt: '2026-02-20T08:00:00.000Z',
        updatedAt: '2026-03-21T12:00:00.000Z',
        userId: 'user_004',
    },
    {
        id: 'track_005',
        title: 'Secours routier avancé',
        percentage: 60,
        createdAt: '2026-02-22T08:00:00.000Z',
        updatedAt: '2026-03-25T16:00:00.000Z',
        userId: 'user_005',
    },
    {
        id: 'track_006',
        title: 'Logistique opérationnelle',
        percentage: 40,
        createdAt: '2026-02-25T08:00:00.000Z',
        updatedAt: '2026-03-26T10:00:00.000Z',
        userId: 'user_006',
    },
    {
        id: 'track_007',
        title: 'Encadrement formation interne',
        percentage: 90,
        createdAt: '2026-02-28T08:00:00.000Z',
        updatedAt: '2026-03-29T08:30:00.000Z',
        userId: 'user_008',
    },
]

export const trainingItems: TrainingItem[] = [
    { id: 'item_001', label: 'Théorie combustion', completed: true, completedAt: '2026-02-15T10:00:00.000Z', trainingTrackId: 'track_001' },
    { id: 'item_002', label: 'Manipulation lance', completed: true, completedAt: '2026-03-01T10:00:00.000Z', trainingTrackId: 'track_001' },
    { id: 'item_003', label: 'Exercice caisson', completed: true, completedAt: '2026-03-15T10:00:00.000Z', trainingTrackId: 'track_001' },
    { id: 'item_004', label: 'Validation finale', completed: false, completedAt: null, trainingTrackId: 'track_001' },

    { id: 'item_005', label: 'Bilan vital', completed: true, completedAt: '2026-02-20T11:00:00.000Z', trainingTrackId: 'track_002' },
    { id: 'item_006', label: 'PSE protocole', completed: true, completedAt: '2026-02-25T11:00:00.000Z', trainingTrackId: 'track_002' },
    { id: 'item_007', label: 'Mises en situation', completed: true, completedAt: '2026-03-10T11:00:00.000Z', trainingTrackId: 'track_002' },

    { id: 'item_008', label: 'Contrôle matériel ARI', completed: true, completedAt: '2026-03-01T09:00:00.000Z', trainingTrackId: 'track_003' },
    { id: 'item_009', label: 'Progression sous ARI', completed: true, completedAt: '2026-03-12T09:00:00.000Z', trainingTrackId: 'track_003' },
    { id: 'item_010', label: 'Évacuation victime', completed: false, completedAt: null, trainingTrackId: 'track_003' },
    { id: 'item_011', label: 'Validation annuelle', completed: false, completedAt: null, trainingTrackId: 'track_003' },

    { id: 'item_012', label: 'Procédure radio', completed: true, completedAt: '2026-03-05T14:00:00.000Z', trainingTrackId: 'track_004' },
    { id: 'item_013', label: 'Canaux opérationnels', completed: false, completedAt: null, trainingTrackId: 'track_004' },
    { id: 'item_014', label: 'Exercice coordination', completed: false, completedAt: null, trainingTrackId: 'track_004' },

    { id: 'item_015', label: 'Sécurisation véhicule', completed: true, completedAt: '2026-03-03T15:00:00.000Z', trainingTrackId: 'track_005' },
    { id: 'item_016', label: 'Découpe avancée', completed: true, completedAt: '2026-03-14T15:00:00.000Z', trainingTrackId: 'track_005' },
    { id: 'item_017', label: 'Extraction victime', completed: false, completedAt: null, trainingTrackId: 'track_005' },
    { id: 'item_018', label: 'Scénario complet', completed: false, completedAt: null, trainingTrackId: 'track_005' },

    { id: 'item_019', label: 'Gestion stock', completed: true, completedAt: '2026-03-02T10:00:00.000Z', trainingTrackId: 'track_006' },
    { id: 'item_020', label: 'Préparation départ', completed: false, completedAt: null, trainingTrackId: 'track_006' },
    { id: 'item_021', label: 'Suivi matériel', completed: false, completedAt: null, trainingTrackId: 'track_006' },

    { id: 'item_022', label: 'Pédagogie adulte', completed: true, completedAt: '2026-03-04T08:30:00.000Z', trainingTrackId: 'track_007' },
    { id: 'item_023', label: 'Animation atelier', completed: true, completedAt: '2026-03-18T08:30:00.000Z', trainingTrackId: 'track_007' },
    { id: 'item_024', label: 'Évaluation stagiaires', completed: true, completedAt: '2026-03-27T08:30:00.000Z', trainingTrackId: 'track_007' },
    { id: 'item_025', label: 'Validation encadrant', completed: false, completedAt: null, trainingTrackId: 'track_007' },
]

/* -------------------------------------------------------------------------- */
/*                                 DOCUMENTS                                  */
/* -------------------------------------------------------------------------- */

export const documents: Document[] = [
    {
        id: 'doc_001',
        name: 'guide-incendie-2026.pdf',
        fileUrl: 'https://example.com/docs/guide-incendie-2026.pdf',
        category: 'PROCÉDURE',
        createdAt: '2026-03-01T08:00:00.000Z',
        uploadedById: 'user_admin_001',
    },
    {
        id: 'doc_002',
        name: 'planning-avril.xlsx',
        fileUrl: 'https://example.com/docs/planning-avril.xlsx',
        category: 'PLANNING',
        createdAt: '2026-03-28T09:00:00.000Z',
        uploadedById: 'user_call_001',
    },
    {
        id: 'doc_003',
        name: 'checklist-vsav.pdf',
        fileUrl: 'https://example.com/docs/checklist-vsav.pdf',
        category: 'MATÉRIEL',
        createdAt: '2026-03-15T10:00:00.000Z',
        uploadedById: 'user_008',
    },
    {
        id: 'doc_004',
        name: 'formation-sap-session-2.pdf',
        fileUrl: 'https://example.com/docs/formation-sap-session-2.pdf',
        category: 'FORMATION',
        createdAt: '2026-03-20T14:00:00.000Z',
        uploadedById: 'user_admin_001',
    },
    {
        id: 'doc_005',
        name: 'procedure-radio.pdf',
        fileUrl: 'https://example.com/docs/procedure-radio.pdf',
        category: 'PROCÉDURE',
        createdAt: '2026-03-22T07:30:00.000Z',
        uploadedById: 'user_004',
    },
]

/* -------------------------------------------------------------------------- */
/*                              MOCK DB EXPORT                                */
/* -------------------------------------------------------------------------- */

export const mockDb = {
    users,
    availabilities,
    operationalNeeds,
    notifications,
    trainingTracks,
    trainingItems,
    documents,
}

/* -------------------------------------------------------------------------- */
/*                        HELPERS / VUES POUR LE FRONT                        */
/* -------------------------------------------------------------------------- */

export const getUserById = (id: string) => users.find((u) => u.id === id)

export const usersWithRelations = users.map((user) => ({
    ...user,
    availabilities: availabilities.filter((a) => a.userId === user.id),
    notifications: notifications.filter((n) => n.recipientIds.includes(user.id)),
    notificationsCreated: notifications.filter((n) => n.createdById === user.id),
    trainingTracks: trainingTracks
        .filter((t) => t.userId === user.id)
        .map((track) => ({
            ...track,
            items: trainingItems.filter((item) => item.trainingTrackId === track.id),
        })),
    documents: documents.filter((d) => d.uploadedById === user.id),
    operationalNeedsCreated: operationalNeeds.filter((n) => n.createdById === user.id),
}))

export const notificationsHydrated = notifications.map((notification) => ({
    ...notification,
    createdBy: getUserById(notification.createdById) ?? null,
    recipients: users.filter((user) => notification.recipientIds.includes(user.id)),
}))

export const operationalNeedsHydrated = operationalNeeds.map((need) => ({
    ...need,
    createdBy: getUserById(need.createdById) ?? null,
}))

export const documentsHydrated = documents.map((doc) => ({
    ...doc,
    uploadedBy: getUserById(doc.uploadedById) ?? null,
}))

export const trainingTracksHydrated = trainingTracks.map((track) => ({
    ...track,
    user: getUserById(track.userId) ?? null,
    items: trainingItems.filter((item) => item.trainingTrackId === track.id),
}))

/* -------------------------------------------------------------------------- */
/*                          EXEMPLES DE DONNÉES UTILES                        */
/* -------------------------------------------------------------------------- */

export const currentUser = usersWithRelations.find((u) => u.id === 'user_001')!

export const dashboardMock = {
    currentUser,
    upcomingNeeds: operationalNeedsHydrated,
    recentNotifications: notificationsHydrated.slice(0, 3),
    documents: documentsHydrated,
}