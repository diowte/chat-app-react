// SocketContext.js
import React, { createContext, useContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext(null);

// 🔑 LA CLÉ DU CORRECTIF :
// Le socket est créé ICI, au niveau du MODULE, complètement en dehors de React.
// Ainsi React StrictMode (qui monte/démonte les composants 2x) ne peut PAS le détruire.
// Chaque onglet du navigateur charge son propre module → chaque onglet a son propre socket.

// URL serveur en priorite via variable d'environnement (Vercel/React).
// Fallback local pour le developpement.
const SOCKET_URLS = [
    "http://localhost:5000", // PC local
    "http://10.0.0.40:5000", // telephone sur le meme Wi-Fi
];

const DEFAULT_SOCKET_URL = process.env.REACT_APP_SERVER_URL || SOCKET_URLS[0];

const socket = io(DEFAULT_SOCKET_URL, { autoConnect: false });

// ────────────────
// PROVIDER REACT
// ────────────────
export function SocketProvider({ children }) {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

// ────────────────
// HOOK UTILITAIRE
// ────────────────
export function useSocket() {
    return useContext(SocketContext);
}
