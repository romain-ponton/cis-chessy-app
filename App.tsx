import React, { useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import { Asset } from 'expo-asset';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from './src/store/authStore';
import { UserRole } from './src/types/role';
import { AvailabilityStatus, ShiftSlot } from './src/types/planning';
import { AppNotification } from './src/types/notifications';
import { Skill, User } from './src/types/user';
import { TrainingItem } from './src/types/trainning';

type RootTabs = {
  Accueil: undefined;
  Planning: undefined;
  Alertes: undefined;
  Formation: undefined;
  Profil: undefined;
};

type AlertItem = AppNotification & {
  id: string;
  responses: string[];
};

type NeedBySlot = {
  needed: number;
  skill: Skill;
};

type UserTrainingState = {
  items: TrainingItem[];
};

type PlanningCursor = {
  year: number;
  month: number;
  day: number;
};

const Tab = createBottomTabNavigator<RootTabs>();
const DEFAULT_PLANNING_CURSOR: PlanningCursor = { year: 2026, month: 12, day: 24 };
const MONTHS_FR = [
  'Janvier',
  'Fevrier',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Aout',
  'Septembre',
  'Octobre',
  'Novembre',
  'Decembre',
];

const theme = {
  appBackground: '#E4E4E4',
  card: '#D7D7D7',
  dark: '#2F2F32',
  blue: '#2852B3',
  red: '#E31E24',
  green: '#2C964A',
  amber: '#CFB45D',
};

const SKILLS: Skill[] = ['HDR', 'COND VSAV', 'COND PL', 'CA1E', 'CATE'];

const INITIAL_USERS: User[] = [
  {
    id: 'u1',
    firstName: 'Hugo',
    lastName: 'Martin',
    phone: '0601020304',
    email: 'hugo.martin@cis.local',
    role: 'utilisateur',
    skills: ['COND VSAV', 'HDR'],
  },
  {
    id: 'c1',
    firstName: 'Lea',
    lastName: 'Durand',
    phone: '0605060708',
    email: 'lea.durand@cis.local',
    role: 'centre_appel',
    skills: ['CA1E'],
  },
  {
    id: 'a1',
    firstName: 'Nora',
    lastName: 'Petit',
    phone: '0611111111',
    email: 'nora.petit@cis.local',
    role: 'admin',
    skills: ['CATE', 'COND PL'],
  },
];

const INITIAL_AVAILABILITY: Record<string, AvailabilityStatus> = {
  'u1|2026-12-24|07h-19h': 'Disponible',
  'u1|2026-12-24|19h-07h': 'À confirmer',
};

const INITIAL_NEEDS: Record<string, NeedBySlot> = {
  '2026-12-24|07h-19h': { needed: 3, skill: 'COND VSAV' },
  '2026-12-24|19h-07h': { needed: 2, skill: 'HDR' },
};

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'al1',
    title: 'Urgent',
    message: 'Besoin de 2 agents ce soir 19h-7h',
    urgent: true,
    createdAt: '2026-03-30T10:00:00.000Z',
    createdByRole: 'centre_appel',
    responses: [],
  },
  {
    id: 'al2',
    title: 'Info',
    message: 'Changement de planning pour samedi',
    urgent: false,
    createdAt: '2026-03-30T12:00:00.000Z',
    createdByRole: 'admin',
    responses: [],
  },
];

const INITIAL_TRAININGS: Record<string, UserTrainingState> = {
  u1: {
    items: [
      { id: 't1', title: 'Inventaire VTU', completed: true },
      { id: 't2', title: 'Manoeuvre VSAV', completed: false },
      { id: 't3', title: 'Procedure radio', completed: true },
      { id: 't4', title: 'Protocoles urgents', completed: false },
      { id: 't5', title: 'Conduite defensive', completed: false },
    ],
  },
};

const TRAINING_DOCUMENTS = [
  { id: 'd1', name: 'Fiche reflexe VSAV' },
  { id: 'd2', name: 'Procedure EVASAN' },
  { id: 'd3', name: 'Guide materiel VTU' },
];

async function downloadLogoGifFile() {
  try {
    const asset = Asset.fromModule(require('./assets/logo-48H-Pompier.gif'));
    await asset.downloadAsync();

    const sourceUri = asset.localUri ?? asset.uri;
    if (!sourceUri || !FileSystem.documentDirectory) {
      throw new Error('Source ou destination indisponible');
    }

    const destinationUri = `${FileSystem.documentDirectory}logo-48H-Pompier.gif`;
    const exists = await FileSystem.getInfoAsync(destinationUri);
    if (exists.exists) {
      await FileSystem.deleteAsync(destinationUri, { idempotent: true });
    }

    await FileSystem.copyAsync({
      from: sourceUri,
      to: destinationUri,
    });

    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(destinationUri, {
        mimeType: 'image/gif',
        dialogTitle: 'Telecharger logo-48H-Pompier.gif',
      });
    } else {
      Alert.alert('Telechargement termine', 'logo-48H-Pompier.gif est pret.');
    }
  } catch {
    Alert.alert('Erreur', 'Impossible de telecharger le document pour le moment.');
  }
}

function dayLabel(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function slotKey(date: string, slot: ShiftSlot): string {
  return `${date}|${slot}`;
}

function availabilityKey(userId: string, date: string, slot: ShiftSlot): string {
  return `${userId}|${date}|${slot}`;
}

function progress(items: TrainingItem[]): number {
  if (items.length === 0) return 0;
  const done = items.filter((item) => item.completed).length;
  return Math.round((done / items.length) * 100);
}

function roleLabel(role: UserRole): string {
  if (role === 'admin') return 'Admin';
  if (role === 'centre_appel') return 'Centre';
  return 'Roles';
}

function roleFullLabel(role: UserRole): string {
  if (role === 'admin') return 'Administrateur';
  if (role === 'centre_appel') return 'Centre appel';
  return 'Utilisateur';
}

function statusColor(status: AvailabilityStatus) {
  if (status === 'Disponible') return styles.statusPillGreen;
  if (status === 'Indisponible') return styles.statusPillRed;
  return styles.statusPillAmber;
}

function statusShort(status: AvailabilityStatus) {
  if (status === 'Disponible') return 'DISPO';
  if (status === 'Indisponible') return 'INDISPO';
  return 'A CONF';
}

function useAppData(role: UserRole) {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [availability, setAvailability] =
    useState<Record<string, AvailabilityStatus>>(INITIAL_AVAILABILITY);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [needs, setNeeds] = useState<Record<string, NeedBySlot>>(INITIAL_NEEDS);
  const [trainings, setTrainings] =
    useState<Record<string, UserTrainingState>>(INITIAL_TRAININGS);

  const currentUser = useMemo(() => {
    const byRole = users.find((user) => user.role === role);
    return byRole ?? users[0];
  }, [role, users]);

  const updateAvailability = (
    userId: string,
    date: string,
    slot: ShiftSlot,
    status: AvailabilityStatus
  ) => {
    const key = availabilityKey(userId, date, slot);
    setAvailability((prev) => ({ ...prev, [key]: status }));
  };

  const addAlert = (
    title: string,
    message: string,
    urgent: boolean,
    createdByRole: 'centre_appel' | 'admin'
  ) => {
    if (!message.trim()) return;
    setAlerts((prev) => [
      {
        id: `al${Date.now()}`,
        title: title.trim() || (urgent ? 'Urgent' : 'Info'),
        message: message.trim(),
        urgent,
        createdAt: new Date().toISOString(),
        createdByRole,
        responses: [],
      },
      ...prev,
    ]);
  };

  const respondAlert = (alertId: string, userId: string) => {
    setAlerts((prev) =>
      prev.map((alert) => {
        if (alert.id !== alertId) return alert;
        if (alert.responses.includes(userId)) return alert;
        return { ...alert, responses: [...alert.responses, userId] };
      })
    );
  };

  const setNeed = (date: string, slot: ShiftSlot, value: NeedBySlot) => {
    const key = slotKey(date, slot);
    setNeeds((prev) => ({ ...prev, [key]: value }));
  };

  const toggleTraining = (userId: string, itemId: string) => {
    setTrainings((prev) => {
      const current = prev[userId] ?? { items: [] };
      return {
        ...prev,
        [userId]: {
          items: current.items.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          ),
        },
      };
    });
  };

  const addUser = (newUser: User) => {
    setUsers((prev) => [newUser, ...prev]);
    if (!trainings[newUser.id]) {
      setTrainings((prev) => ({
        ...prev,
        [newUser.id]: {
          items: [
            { id: `t-${newUser.id}-1`, title: 'Accueil securite', completed: false },
            { id: `t-${newUser.id}-2`, title: 'Manoeuvre base', completed: false },
          ],
        },
      }));
    }
  };

  return {
    users,
    currentUser,
    availability,
    alerts,
    needs,
    trainings,
    updateAvailability,
    addAlert,
    respondAlert,
    setNeed,
    toggleTraining,
    addUser,
  };
}

function HeaderShell({
  role,
  title,
  children,
  showRolePill = true,
}: {
  role: UserRole;
  title: string;
  children: React.ReactNode;
  showRolePill?: boolean;
}) {
  const logout = useAuthStore((state) => state.logout);

  return (
    <SafeAreaView style={styles.appArea}>
      <View style={styles.phoneShell}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={styles.headerRight}>
            <Pressable onPress={logout} style={styles.logoutIconButton}>
              <Ionicons name="log-out-outline" size={16} color="#FFFFFF" />
            </Pressable>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>CIS</Text>
            </View>
            {showRolePill && (
              <View style={styles.rolePill}>
                <Text style={styles.rolePillText}>{roleLabel(role)}</Text>
              </View>
            )}
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {children}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function CalendarCard({
  year,
  month,
  selectedDay,
  onSelectDay,
  onPrevMonth,
  onNextMonth,
}: {
  year: number;
  month: number;
  selectedDay: number;
  onSelectDay: (day: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}) {
  const weekHeaders = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const totalDays = getDaysInMonth(year, month);
  const days = Array.from({ length: totalDays }, (_, index) => index + 1);
  const monthLabel = `${MONTHS_FR[month - 1]} ${year}`;

  return (
    <View style={styles.block}>
      <View style={styles.calendarHeader}>
        <Pressable onPress={onPrevMonth} style={styles.calendarArrowButton}>
          <Text style={styles.calendarArrow}>{'<'}</Text>
        </Pressable>
        <Text style={styles.blockTitle}>{monthLabel}</Text>
        <Pressable onPress={onNextMonth} style={styles.calendarArrowButton}>
          <Text style={styles.calendarArrow}>{'>'}</Text>
        </Pressable>
      </View>
      <View style={styles.calendarRow}>
        {weekHeaders.map((header) => (
          <Text key={header} style={[styles.calendarCell, styles.calendarWeek]}>
            {header}
          </Text>
        ))}
      </View>
      {Array.from({ length: 6 }, (_, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.calendarRow}>
          {days.slice(rowIndex * 7, rowIndex * 7 + 7).map((day) => (
            <Pressable
              key={day}
              style={[
                styles.calendarDayButton,
                selectedDay === day && styles.calendarDayButtonActive,
              ]}
              onPress={() => onSelectDay(day)}
            >
              <Text
                style={[
                  styles.calendarCell,
                  selectedDay === day && styles.calendarCellActive,
                ]}
              >
                {day}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

function DocumentRow({
  name,
  onPress,
}: {
  name: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.docRow} onPress={onPress}>
      <Text style={styles.docIcon}>PDF</Text>
      <View style={styles.docTextWrap}>
        <Text style={styles.docTitle}>{name}</Text>
        <Text style={styles.docSubtitle}>Ajoute aujourd hui</Text>
      </View>
      <Ionicons name="download-outline" size={16} color="#464646" />
    </Pressable>
  );
}

function ProgressLine({ value }: { value: number }) {
  return (
    <View style={styles.progressWrap}>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${value}%` }]} />
      </View>
      <Text style={styles.progressValue}>{value}%</Text>
    </View>
  );
}

function LoginView() {
  const login = useAuthStore((state) => state.login);

  return (
    <SafeAreaView style={styles.loginArea}>
      <StatusBar style="light" />
      <View style={styles.loginPanel}>
        <View style={styles.logoBigCircle}>
          <Text style={styles.logoBigText}>CIS</Text>
        </View>
        <Text style={styles.loginTitle}>CIS Chessy</Text>
        <Text style={styles.loginSubtitle}>
          Disponibilites, alertes, planning et formation
        </Text>

        <Pressable style={styles.loginBtn} onPress={() => login('utilisateur')}>
          <Text style={styles.loginBtnText}>Entrer comme Utilisateur</Text>
        </Pressable>

        <Pressable style={styles.loginBtn} onPress={() => login('centre_appel')}>
          <Text style={styles.loginBtnText}>Entrer comme Centre appel</Text>
        </Pressable>

        <Pressable style={styles.loginBtn} onPress={() => login('admin')}>
          <Text style={styles.loginBtnText}>Entrer comme Administrateur</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function UserHome({
  user,
  trainings,
  alerts,
  onDownloadDocument,
}: {
  user: User;
  trainings: Record<string, UserTrainingState>;
  alerts: AlertItem[];
  onDownloadDocument: () => void;
}) {
  const userProgress = progress(trainings[user.id]?.items ?? []);
  const urgentCount = alerts.filter((alert) => alert.urgent).length;

  return (
    <HeaderShell
      role={user.role}
      title={`${user.firstName} ${user.lastName}`}
      showRolePill={user.role !== 'admin'}
    >
      <View style={styles.blockCompact}>
        <Text style={styles.blockLabel}>PROCHAIN SERVICE :</Text>
        <View style={styles.serviceLine}>
          <Text>24/12/2026</Text>
          <Text>19H</Text>
        </View>
      </View>

      <View style={[styles.block, styles.alertMain]}>
        <Text style={styles.alertMainTitle}>Alertes :</Text>
        <Text style={styles.alertMainText}>{urgentCount} urgentes</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.sectionTitle}>Ma progression FORMATION :</Text>
        <Text style={styles.lightText}>Suivi des items valides par le stagiaire</Text>
        <ProgressLine value={userProgress} />
      </View>

      <Text style={styles.sectionTitle}>Documents :</Text>
      {TRAINING_DOCUMENTS.map((doc) => (
        <DocumentRow key={doc.id} name={doc.name} onPress={onDownloadDocument} />
      ))}
    </HeaderShell>
  );
}

function AdminDashboard({
  user,
  users,
  alerts,
  availability,
  planningCursor,
  onSelectDay,
  onPrevMonth,
  onNextMonth,
}: {
  user: User;
  users: User[];
  alerts: AlertItem[];
  availability: Record<string, AvailabilityStatus>;
  planningCursor: PlanningCursor;
  onSelectDay: (day: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}) {
  const selectedDate = dayLabel(
    planningCursor.year,
    planningCursor.month,
    planningCursor.day
  );

  const firefighters = users.filter((member) => member.role === 'utilisateur');
  const availableAgents = firefighters.filter((member) => {
    const morning =
      availability[availabilityKey(member.id, selectedDate, '07h-19h')] ===
      'Disponible';
    const night =
      availability[availabilityKey(member.id, selectedDate, '19h-07h')] ===
      'Disponible';
    return morning || night;
  }).length;
  const unavailableAgents = Math.max(0, firefighters.length - availableAgents);

  const activeAlert = alerts[0];

  return (
    <HeaderShell role={user.role} title="Administrateur" showRolePill={false}>
      <Text style={styles.dashboardTitle}>Tableau de bord</Text>

      <View style={styles.dashboardPanel}>
        <Text style={styles.dashboardPanelTitle}>Alertes Actives</Text>
        <View style={styles.dashboardAlertRow}>
          <Text style={styles.dashboardAlertName}>
            {activeAlert?.message ?? "Nom de l'alerte"}
          </Text>
          <View style={styles.dashboardAlertButton}>
            <Text style={styles.dashboardAlertButtonText}>Voir</Text>
          </View>
        </View>
      </View>

      <View style={styles.dashboardKpiRow}>
        <View style={styles.dashboardKpiCard}>
          <Text style={styles.dashboardKpiLabel}>Agents disponible :</Text>
          <Text style={styles.dashboardKpiValue}>{availableAgents}</Text>
        </View>
        <View style={styles.dashboardKpiCard}>
          <Text style={styles.dashboardKpiLabel}>Agents indisponible :</Text>
          <Text style={styles.dashboardKpiValue}>{unavailableAgents}</Text>
        </View>
      </View>

      <CalendarCard
        year={planningCursor.year}
        month={planningCursor.month}
        selectedDay={planningCursor.day}
        onSelectDay={onSelectDay}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
      />
    </HeaderShell>
  );
}

function UserPlanning({
  user,
  planningCursor,
  onSelectDay,
  onPrevMonth,
  onNextMonth,
  availability,
  updateAvailability,
  needs,
  canManageNeed,
  setNeed,
}: {
  user: User;
  planningCursor: PlanningCursor;
  onSelectDay: (day: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  availability: Record<string, AvailabilityStatus>;
  updateAvailability: (
    userId: string,
    date: string,
    slot: ShiftSlot,
    status: AvailabilityStatus
  ) => void;
  needs: Record<string, NeedBySlot>;
  canManageNeed: boolean;
  setNeed: (date: string, slot: ShiftSlot, value: NeedBySlot) => void;
}) {
  const selectedDate = dayLabel(
    planningCursor.year,
    planningCursor.month,
    planningCursor.day
  );
  const slots: ShiftSlot[] = ['07h-19h', '19h-07h'];

  return (
    <HeaderShell role={user.role} title={canManageNeed ? 'Gestion planning' : 'Mon Planning'}>
      <CalendarCard
        year={planningCursor.year}
        month={planningCursor.month}
        selectedDay={planningCursor.day}
        onSelectDay={onSelectDay}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
      />
      <View style={[styles.block, styles.shiftCard]}>
        <Text style={styles.shiftDate}>{selectedDate}</Text>
        {slots.map((slot) => {
          const status =
            availability[availabilityKey(user.id, selectedDate, slot)] ?? 'À confirmer';
          const slotNeed = needs[slotKey(selectedDate, slot)] ?? {
            needed: 0,
            skill: 'HDR',
          };
          return (
            <View key={slot} style={styles.shiftZone}>
              <View style={styles.rowBetween}>
                <Text style={styles.shiftTime}>{slot}</Text>
                <Text style={styles.needText}>
                  Besoin: {slotNeed.needed} ({slotNeed.skill})
                </Text>
              </View>
              <View style={styles.shiftLine}>
                {(['Disponible', 'À confirmer', 'Indisponible'] as AvailabilityStatus[]).map(
                  (candidate) => (
                    <Pressable
                      key={`${slot}-${candidate}`}
                      style={[statusColor(candidate), status === candidate && styles.statusPillActive]}
                      onPress={() => updateAvailability(user.id, selectedDate, slot, candidate)}
                    >
                      <Text style={styles.statusPillText}>{statusShort(candidate)}</Text>
                    </Pressable>
                  )
                )}
              </View>

              {canManageNeed && (
                <View style={styles.needActionsRow}>
                  <Pressable
                    style={styles.smallActionBtn}
                    onPress={() =>
                      setNeed(selectedDate, slot, {
                        ...slotNeed,
                        needed: Math.max(0, slotNeed.needed - 1),
                      })
                    }
                  >
                    <Text style={styles.smallActionText}>-</Text>
                  </Pressable>
                  <Pressable
                    style={styles.smallActionBtn}
                    onPress={() =>
                      setNeed(selectedDate, slot, {
                        ...slotNeed,
                        needed: slotNeed.needed + 1,
                      })
                    }
                  >
                    <Text style={styles.smallActionText}>+</Text>
                  </Pressable>
                  <Pressable
                    style={styles.smallActionBtn}
                    onPress={() => {
                      const idx = SKILLS.indexOf(slotNeed.skill);
                      const next = SKILLS[(idx + 1) % SKILLS.length];
                      setNeed(selectedDate, slot, { ...slotNeed, skill: next });
                    }}
                  >
                    <Text style={styles.smallActionText}>Skill</Text>
                  </Pressable>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </HeaderShell>
  );
}

function AlertsView({
  user,
  alerts,
  respondAlert,
  addAlert,
  canCreate,
}: {
  user: User;
  alerts: AlertItem[];
  respondAlert: (alertId: string, userId: string) => void;
  addAlert: (
    title: string,
    message: string,
    urgent: boolean,
    createdByRole: 'centre_appel' | 'admin'
  ) => void;
  canCreate: boolean;
}) {
  const [urgentOnly, setUrgentOnly] = useState(true);
  const [newTitle, setNewTitle] = useState('Urgent');
  const [newMessage, setNewMessage] = useState('');

  const visibleAlerts = alerts.filter((alert) => (urgentOnly ? alert.urgent : !alert.urgent));

  return (
    <HeaderShell role={user.role} title="Alertes">
      <View style={styles.segmentLine}>
        <Pressable
          style={[styles.segmentBtn, urgentOnly ? styles.segmentBtnRed : styles.segmentBtnGrey]}
          onPress={() => setUrgentOnly(true)}
        >
          <Text style={urgentOnly ? styles.segmentTextLight : styles.segmentTextDark}>Urgentes</Text>
        </Pressable>
        <Pressable
          style={[styles.segmentBtn, !urgentOnly ? styles.segmentBtnRed : styles.segmentBtnGrey]}
          onPress={() => setUrgentOnly(false)}
        >
          <Text style={!urgentOnly ? styles.segmentTextLight : styles.segmentTextDark}>Infos</Text>
        </Pressable>
      </View>

      {visibleAlerts.map((alert) => {
        const alreadyResponded = alert.responses.includes(user.id);
        return (
          <View
            key={alert.id}
            style={[
              styles.alertCard,
              alert.urgent ? styles.alertUrgent : styles.alertNormal,
            ]}
          >
            <Text style={alert.urgent ? styles.alertTypeRed : styles.alertTypeBlue}>{alert.title}</Text>
            <Text style={styles.alertText}>{alert.message}</Text>
            <Text style={styles.lightText}>Dispos: {alert.responses.length}</Text>

            {!canCreate && alert.urgent && (
              <Pressable
                disabled={alreadyResponded}
                style={[styles.primaryButtonSmall, alreadyResponded && styles.disabledButton]}
                onPress={() => respondAlert(alert.id, user.id)}
              >
                <Text style={styles.primaryButtonSmallText}>
                  {alreadyResponded ? 'Reponse enregistree' : 'Je suis disponible'}
                </Text>
              </Pressable>
            )}
          </View>
        );
      })}

      {canCreate && (
        <View style={styles.blockCompact}>
          <Text style={styles.sectionTitle}>Creer une alerte</Text>
          <TextInput
            style={styles.input}
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder="Titre"
            placeholderTextColor="#888"
          />
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Message"
            placeholderTextColor="#888"
            multiline
          />
          <View style={styles.rowGap}>
            <Pressable
              style={styles.smallActionBtn}
              onPress={() =>
                addAlert(newTitle, newMessage, true, user.role === 'admin' ? 'admin' : 'centre_appel')
              }
            >
              <Text style={styles.smallActionText}>Urgente</Text>
            </Pressable>
            <Pressable
              style={styles.smallActionBtn}
              onPress={() =>
                addAlert(newTitle, newMessage, false, user.role === 'admin' ? 'admin' : 'centre_appel')
              }
            >
              <Text style={styles.smallActionText}>Info</Text>
            </Pressable>
          </View>
        </View>
      )}
    </HeaderShell>
  );
}

function FormationView({
  user,
  users,
  trainings,
  toggleTraining,
  canManageTraining,
  onDownloadDocument,
}: {
  user: User;
  users: User[];
  trainings: Record<string, UserTrainingState>;
  toggleTraining: (userId: string, itemId: string) => void;
  canManageTraining: boolean;
  onDownloadDocument: () => void;
}) {
  const trainees = users.filter((member) => member.role === 'utilisateur');
  const [selectedFirstName, setSelectedFirstName] = useState<string>(
    trainees[0]?.firstName ?? ''
  );

  const selectedTrainee =
    trainees.find((member) => member.firstName === selectedFirstName) ?? trainees[0];

  if (canManageTraining) {
    const selectedItems = selectedTrainee ? trainings[selectedTrainee.id]?.items ?? [] : [];

    return (
      <HeaderShell role={user.role} title="Suivi formation">
        <Text style={styles.sectionTitle}>Validation par prenom</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.firstNameRow}>
          <View style={styles.firstNameRowInner}>
            {trainees.map((member) => (
              <Pressable
                key={member.id}
                style={[
                  styles.firstNameChip,
                  selectedTrainee?.id === member.id && styles.firstNameChipActive,
                ]}
                onPress={() => setSelectedFirstName(member.firstName)}
              >
                <Text
                  style={[
                    styles.firstNameChipText,
                    selectedTrainee?.id === member.id && styles.firstNameChipTextActive,
                  ]}
                >
                  {member.firstName}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {selectedTrainee ? (
          <View style={styles.blockCompact}>
            <Text style={styles.userName}>
              {selectedTrainee.firstName} {selectedTrainee.lastName}
            </Text>
            <Text style={styles.lightText}>Progression {progress(selectedItems)}%</Text>
          </View>
        ) : (
          <View style={styles.blockCompact}>
            <Text style={styles.lightText}>Aucun stagiaire utilisateur disponible.</Text>
          </View>
        )}

        {selectedItems.map((item) => (
          <Pressable
            key={item.id}
            style={styles.trainingRow}
            onPress={() => selectedTrainee && toggleTraining(selectedTrainee.id, item.id)}
          >
            <Text style={styles.trainingTitle}>{item.title}</Text>
            <View style={item.completed ? styles.checkboxOn : styles.checkboxOff}>
              {item.completed && <Text style={styles.checkboxText}>OK</Text>}
            </View>
          </Pressable>
        ))}

        <Text style={styles.sectionTitle}>Documents fournis</Text>
        {TRAINING_DOCUMENTS.map((doc) => (
          <DocumentRow key={doc.id} name={doc.name} onPress={onDownloadDocument} />
        ))}
      </HeaderShell>
    );
  }

  const items = trainings[user.id]?.items ?? [];
  const userProgress = progress(items);

  return (
    <HeaderShell role={user.role} title="Formation">
      <View style={styles.block}>
        <Text style={styles.sectionTitle}>Progression globale</Text>
        <ProgressLine value={userProgress} />
      </View>

      <Text style={styles.sectionTitle}>Mes formations</Text>
      {items.map((item) => (
        <View key={item.id} style={styles.trainingRow}>
          <Text style={styles.trainingTitle}>{item.title}</Text>
          <View style={item.completed ? styles.checkboxOn : styles.checkboxOff}>
            {item.completed && <Text style={styles.checkboxText}>OK</Text>}
          </View>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Documents</Text>
      {TRAINING_DOCUMENTS.map((doc) => (
        <DocumentRow key={doc.id} name={doc.name} onPress={onDownloadDocument} />
      ))}
    </HeaderShell>
  );
}

function ProfileView({
  user,
  users,
  addUser,
  isAdmin,
}: {
  user: User;
  users: User[];
  addUser: (newUser: User) => void;
  isAdmin: boolean;
}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('utilisateur');

  if (!isAdmin) {
    return (
      <HeaderShell role={user.role} title="Profil">
        <View style={styles.blockCompact}>
          <View style={styles.userHeadLine}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.userName}>
                {user.firstName} {user.lastName}
              </Text>
              <Text style={styles.lightText}>{roleFullLabel(user.role)}</Text>
            </View>
          </View>
          <Text style={styles.profileLine}>{user.phone}</Text>
          <Text style={styles.profileLine}>{user.email}</Text>
        </View>

        <View style={styles.blockCompact}>
          <Text style={styles.sectionTitle}>Mes competences</Text>
          <View style={styles.skillGrid}>
            {user.skills.map((skill) => (
              <View key={skill} style={styles.skillTag}>
                <Text style={styles.skillTagText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      </HeaderShell>
    );
  }

  return (
    <HeaderShell role={user.role} title="Gestion utilisateurs">
      <Text style={styles.sectionTitle}>Utilisateurs</Text>
      {users.map((member) => (
        <View key={member.id} style={styles.userListRow}>
          <View style={styles.userHeadLine}>
            <View style={styles.avatarSmall} />
            <View>
              <Text style={styles.userName}>
                {member.firstName} {member.lastName}
              </Text>
              <Text style={styles.lightText}>{roleFullLabel(member.role)}</Text>
            </View>
          </View>
          <View style={styles.pillActionBlue}>
            <Text style={styles.pillActionText}>{member.skills.length} skills</Text>
          </View>
        </View>
      ))}

      <View style={styles.blockCompact}>
        <Text style={styles.sectionTitle}>Ajouter un profil</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Prenom"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Nom"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Telephone"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#888"
        />

        <View style={styles.rowGap}>
          <Pressable
            style={styles.smallActionBtn}
            onPress={() =>
              setRole((prev) => {
                if (prev === 'utilisateur') return 'centre_appel';
                if (prev === 'centre_appel') return 'admin';
                return 'utilisateur';
              })
            }
          >
            <Text style={styles.smallActionText}>Role: {roleFullLabel(role)}</Text>
          </Pressable>

          <Pressable
            style={styles.smallActionBtn}
            onPress={() => {
              if (!firstName.trim() || !lastName.trim()) return;
              addUser({
                id: `u-${Date.now()}`,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                phone: phone.trim() || 'NC',
                email: email.trim() || 'nc@cis.local',
                role,
                skills: ['HDR'],
              });
              setFirstName('');
              setLastName('');
              setPhone('');
              setEmail('');
              setRole('utilisateur');
            }}
          >
            <Text style={styles.smallActionText}>Creer</Text>
          </Pressable>
        </View>
      </View>
    </HeaderShell>
  );
}

function AppTabs() {
  const role = useAuthStore((state) => state.role);
  const {
    users,
    currentUser,
    availability,
    alerts,
    needs,
    trainings,
    updateAvailability,
    addAlert,
    respondAlert,
    setNeed,
    toggleTraining,
    addUser,
  } = useAppData(role);

  const isAdmin = role === 'admin';
  const canManageTraining = role === 'admin' || role === 'centre_appel';
  const canCreateAlert = role === 'admin' || role === 'centre_appel';
  const canManageNeed = role === 'admin' || role === 'centre_appel';
  const handleDownloadDocument = async () => {
    await downloadLogoGifFile();
  };
  const [planningCursor, setPlanningCursor] = useState<PlanningCursor>(
    DEFAULT_PLANNING_CURSOR
  );

  const handleSelectPlanningDay = (day: number) => {
    setPlanningCursor((prev) => ({ ...prev, day }));
  };

  const handlePrevPlanningMonth = () => {
    setPlanningCursor((prev) => {
      const newMonth = prev.month === 1 ? 12 : prev.month - 1;
      const newYear = prev.month === 1 ? prev.year - 1 : prev.year;
      const maxDay = getDaysInMonth(newYear, newMonth);
      return { ...prev, year: newYear, month: newMonth, day: Math.min(prev.day, maxDay) };
    });
  };

  const handleNextPlanningMonth = () => {
    setPlanningCursor((prev) => {
      const newMonth = prev.month === 12 ? 1 : prev.month + 1;
      const newYear = prev.month === 12 ? prev.year + 1 : prev.year;
      const maxDay = getDaysInMonth(newYear, newMonth);
      return { ...prev, year: newYear, month: newMonth, day: Math.min(prev.day, maxDay) };
    });
  };

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: isAdmin ? '#D0D0D0' : '#2F2F32',
            borderTopWidth: 0,
            height: 62,
            paddingTop: 8,
            paddingBottom: 8,
          },
          tabBarActiveTintColor: isAdmin ? '#1F1F1F' : '#FFFFFF',
          tabBarInactiveTintColor: isAdmin ? '#666666' : '#A0A0A0',
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Accueil') {
              return <Ionicons name="home" size={size} color={color} />;
            }
            if (route.name === 'Planning') {
              return <Ionicons name="calendar" size={size} color={color} />;
            }
            if (route.name === 'Alertes') {
              return <Ionicons name="notifications" size={size} color={color} />;
            }
            if (route.name === 'Formation') {
              return (
                <MaterialCommunityIcons
                  name="clipboard-check-outline"
                  size={size}
                  color={color}
                />
              );
            }
            return <Ionicons name="person" size={size} color={color} />;
          },
        })}
      >
        {isAdmin ? (
          <>
            <Tab.Screen name="Accueil">
              {() => (
                <AdminDashboard
                  user={currentUser}
                  users={users}
                  alerts={alerts}
                  availability={availability}
                  planningCursor={planningCursor}
                  onSelectDay={handleSelectPlanningDay}
                  onPrevMonth={handlePrevPlanningMonth}
                  onNextMonth={handleNextPlanningMonth}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Planning">
              {() => (
                <UserPlanning
                  user={currentUser}
                  planningCursor={planningCursor}
                  onSelectDay={handleSelectPlanningDay}
                  onPrevMonth={handlePrevPlanningMonth}
                  onNextMonth={handleNextPlanningMonth}
                  availability={availability}
                  updateAvailability={updateAvailability}
                  needs={needs}
                  canManageNeed={canManageNeed}
                  setNeed={setNeed}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Profil">
              {() => (
                <ProfileView
                  user={currentUser}
                  users={users}
                  addUser={addUser}
                  isAdmin={isAdmin}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Formation">
              {() => (
                <FormationView
                  user={currentUser}
                  users={users}
                  trainings={trainings}
                  toggleTraining={toggleTraining}
                  canManageTraining={canManageTraining}
                  onDownloadDocument={handleDownloadDocument}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Alertes">
              {() => (
                <AlertsView
                  user={currentUser}
                  alerts={alerts}
                  respondAlert={respondAlert}
                  addAlert={addAlert}
                  canCreate={canCreateAlert}
                />
              )}
            </Tab.Screen>
          </>
        ) : (
          <>
            <Tab.Screen name="Accueil">
              {() => (
                <UserHome
                  user={currentUser}
                  trainings={trainings}
                  alerts={alerts}
                  onDownloadDocument={handleDownloadDocument}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Planning">
              {() => (
                <UserPlanning
                  user={currentUser}
                  planningCursor={planningCursor}
                  onSelectDay={handleSelectPlanningDay}
                  onPrevMonth={handlePrevPlanningMonth}
                  onNextMonth={handleNextPlanningMonth}
                  availability={availability}
                  updateAvailability={updateAvailability}
                  needs={needs}
                  canManageNeed={canManageNeed}
                  setNeed={setNeed}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Alertes">
              {() => (
                <AlertsView
                  user={currentUser}
                  alerts={alerts}
                  respondAlert={respondAlert}
                  addAlert={addAlert}
                  canCreate={canCreateAlert}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Formation">
              {() => (
                <FormationView
                  user={currentUser}
                  users={users}
                  trainings={trainings}
                  toggleTraining={toggleTraining}
                  canManageTraining={canManageTraining}
                  onDownloadDocument={handleDownloadDocument}
                />
              )}
            </Tab.Screen>
            <Tab.Screen name="Profil">
              {() => (
                <ProfileView
                  user={currentUser}
                  users={users}
                  addUser={addUser}
                  isAdmin={isAdmin}
                />
              )}
            </Tab.Screen>
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <LoginView />;
  }

  return <AppTabs />;
}

const styles = StyleSheet.create({
  appArea: {
    flex: 1,
    backgroundColor: theme.appBackground,
  },
  phoneShell: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 8,
    backgroundColor: theme.card,
    borderRadius: 12,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: theme.dark,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoutIconButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#C84B4F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#29448D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#2B2B2B',
    fontSize: 11,
    fontWeight: '800',
  },
  rolePill: {
    backgroundColor: theme.red,
    paddingHorizontal: 10,
    borderRadius: 999,
    paddingVertical: 2,
  },
  rolePillText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 16,
  },
  block: {
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CFCFCF',
  },
  blockCompact: {
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  blockLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  serviceLine: {
    marginTop: 6,
    backgroundColor: '#F9F9F9',
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alertMain: {
    backgroundColor: theme.red,
  },
  alertMainTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 24,
  },
  alertMainText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },
  dashboardTitle: {
    textAlign: 'center',
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 8,
  },
  dashboardPanel: {
    backgroundColor: '#CCCCCE',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  dashboardPanelTitle: {
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 10,
  },
  dashboardAlertRow: {
    backgroundColor: '#DCDCDD',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dashboardAlertName: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    marginRight: 8,
  },
  dashboardAlertButton: {
    backgroundColor: '#D81F24',
    borderRadius: 999,
    paddingHorizontal: 28,
    paddingVertical: 8,
  },
  dashboardAlertButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
  },
  dashboardKpiRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  dashboardKpiCard: {
    flex: 1,
    backgroundColor: '#CCCCCE',
    borderRadius: 14,
    padding: 12,
    minHeight: 152,
  },
  dashboardKpiLabel: {
    fontSize: 18,
    fontWeight: '800',
  },
  dashboardKpiValue: {
    marginTop: 20,
    textAlign: 'center',
    color: '#D81F24',
    fontSize: 46,
    fontWeight: '800',
  },
  lightText: {
    color: '#4A4A4A',
    fontSize: 14,
  },
  progressWrap: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressTrack: {
    flex: 1,
    height: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.blue,
    borderRadius: 8,
  },
  progressValue: {
    minWidth: 44,
    textAlign: 'right',
    color: theme.blue,
    fontWeight: '700',
  },
  docRow: {
    marginBottom: 8,
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  docIcon: {
    color: '#E31E24',
    fontWeight: '800',
    fontSize: 12,
  },
  docTextWrap: {
    flex: 1,
  },
  docTitle: {
    fontWeight: '700',
    fontSize: 13,
  },
  docSubtitle: {
    fontSize: 11,
    color: '#6A6A6A',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  calendarArrow: {
    fontSize: 18,
    color: '#777777',
    fontWeight: '700',
  },
  calendarArrowButton: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  calendarDayButton: {
    width: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  calendarDayButtonActive: {
    backgroundColor: theme.blue,
  },
  calendarCell: {
    width: 32,
    textAlign: 'center',
    fontSize: 12,
    color: '#454545',
    paddingVertical: 3,
    borderRadius: 8,
  },
  calendarWeek: {
    fontWeight: '700',
  },
  calendarCellActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  shiftCard: {
    backgroundColor: theme.blue,
  },
  shiftDate: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 10,
  },
  shiftZone: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    paddingBottom: 8,
  },
  shiftLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  shiftTime: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  needText: {
    color: '#E5ECFF',
    fontSize: 12,
  },
  statusPillGreen: {
    backgroundColor: theme.green,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  statusPillAmber: {
    backgroundColor: theme.amber,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  statusPillRed: {
    backgroundColor: theme.red,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  statusPillActive: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  statusPillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  segmentLine: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  segmentBtn: {
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 999,
  },
  segmentBtnRed: {
    backgroundColor: theme.red,
  },
  segmentBtnGrey: {
    backgroundColor: '#BEBEC3',
  },
  segmentTextLight: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  segmentTextDark: {
    color: '#202020',
    fontWeight: '700',
  },
  alertCard: {
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  },
  alertUrgent: {
    backgroundColor: '#E8C5C7',
    borderColor: '#D27073',
  },
  alertNormal: {
    backgroundColor: '#C5CDE8',
    borderColor: '#6179BE',
  },
  alertTypeRed: {
    color: theme.red,
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 2,
  },
  alertTypeBlue: {
    color: theme.blue,
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 2,
  },
  alertText: {
    fontSize: 15,
    marginBottom: 8,
  },
  primaryButtonSmall: {
    alignSelf: 'stretch',
    marginTop: 10,
    backgroundColor: theme.blue,
    borderRadius: 9,
    paddingVertical: 8,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  primaryButtonSmallText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  userHeadLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#AAAAAA',
  },
  avatarSmall: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#AAAAAA',
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
  },
  profileLine: {
    marginTop: 10,
    fontSize: 15,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  skillTag: {
    backgroundColor: '#2C964A',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  skillTagText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  userListRow: {
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    padding: 9,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CFCFCF',
  },
  pillActionBlue: {
    backgroundColor: theme.blue,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  pillActionText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  needActionsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  smallActionBtn: {
    backgroundColor: '#303030',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  smallActionText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  rowGap: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
  },
  firstNameRow: {
    marginBottom: 10,
  },
  firstNameRowInner: {
    flexDirection: 'row',
    gap: 8,
  },
  firstNameChip: {
    backgroundColor: '#D8D8D8',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  firstNameChipActive: {
    backgroundColor: theme.blue,
  },
  firstNameChipText: {
    color: '#2A2A2A',
    fontWeight: '700',
  },
  firstNameChipTextActive: {
    color: '#FFFFFF',
  },
  trainingRow: {
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    padding: 10,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trainingTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  checkboxOn: {
    width: 56,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#2C964A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOff: {
    width: 56,
    height: 26,
    borderRadius: 8,
    backgroundColor: '#A9A9A9',
  },
  checkboxText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },
  input: {
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
    color: '#1B1B1B',
  },
  inputMultiline: {
    minHeight: 78,
    textAlignVertical: 'top',
  },
  loginArea: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1F2128',
  },
  loginPanel: {
    backgroundColor: '#2B2E37',
    borderRadius: 16,
    padding: 20,
  },
  logoBigCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 14,
  },
  logoBigText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '800',
  },
  loginTitle: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 28,
    marginBottom: 8,
  },
  loginSubtitle: {
    textAlign: 'center',
    color: '#C5C5C5',
    marginBottom: 22,
  },
  loginBtn: {
    backgroundColor: theme.blue,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
