import React from "react";
import { COLORS } from "../constants/colors";
import { HomeIcon, CalendarIcon, BellIcon, BookIcon } from "./icons";

const NAV_ITEMS = [
    { id: "home",     label: "Accueil",   Icon: HomeIcon },
    { id: "planning", label: "Planning",  Icon: CalendarIcon },
    { id: "alerts",   label: "Alertes",   Icon: BellIcon },
    { id: "training", label: "Formation", Icon: BookIcon },
];

export default function BottomNav({ page, setPage }) {
    return (
        <div style={{
            height: 82,
            background: COLORS.surface,
            borderTop: `1px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "0 4px 16px",
            flexShrink: 0,
        }}>
            {NAV_ITEMS.map(({ id, label, Icon }) => {
                const active = page === id;
                return (
                    <div
                        key={id}
                        onClick={() => setPage(id)}
                        style={{
                            display: "flex", flexDirection: "column", alignItems: "center",
                            gap: 4, cursor: "pointer", flex: 1, padding: "6px 0", position: "relative",
                        }}
                    >
                        {active && (
                            <div style={{
                                position: "absolute", top: 0, width: 32, height: 3,
                                borderRadius: "0 0 3px 3px", background: COLORS.primary,
                            }} />
                        )}
                        <Icon size={22} color={active ? COLORS.primary : COLORS.textLight} />
                        <span style={{
                            fontSize: 10,
                            fontWeight: active ? 700 : 500,
                            color: active ? COLORS.primary : COLORS.textLight,
                        }}>
              {label}
            </span>
                    </div>
                );
            })}
        </div>
    );
}