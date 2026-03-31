import * as mockAuth from './mock/auth.mock'
import * as mockDashboard from './mock/dashboard.mock'
import * as mockAlerts from './mock/alerts.mock'
import * as mockPlanning from './mock/planning.mock'
import * as mockTraining from './mock/training.mock'
import * as mockUsers from './mock/users.mock'

import * as apiAuth from './api/auth.api'
import * as apiDashboard from './api/dashboard.api'
import * as apiAlerts from './api/alerts.api'
import * as apiPlanning from './api/planning.api'
import * as apiTraining from './api/training.api'
import * as apiUsers from './api/users.api'

const USE_MOCK = true

export const services = {
    auth: USE_MOCK ? mockAuth : apiAuth,
    dashboard: USE_MOCK ? mockDashboard : apiDashboard,
    alerts: USE_MOCK ? mockAlerts : apiAlerts,
    planning: USE_MOCK ? mockPlanning : apiPlanning,
    training: USE_MOCK ? mockTraining : apiTraining,
    users: USE_MOCK ? mockUsers : apiUsers,
}