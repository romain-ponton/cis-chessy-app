import { createContext, useContext} from "react";

export const UserContext = createContext(null);
export const useUser = () => useContext(UserContext);

export const MOCK_USERS = {
    admin: { name: 'Jean Dupont', role: 'admin', initials: 'JD' },
    centre_appel: { name: 'Marc Cabin', role: 'centre_appel', initials: 'MC' },
    user: { name: 'Sophie Durant', role: 'user', initials: 'SD' },
}