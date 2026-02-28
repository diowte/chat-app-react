# chat-app-React

Application de chat temps reel avec:
- `client`: React + Socket.IO client
- `server`: Express + Socket.IO server

## Prerequis
- Node.js 18+ (recommande)
- npm

## Structure
- `client/public/index.html` est deja present (fichier de depart front-end)
- `client/src` contient l'application React
- `server/server.js` contient le serveur HTTP + WebSocket

## Installation locale
Dans deux terminaux separes:

```bash
# Terminal 1
cd server
npm install
```

```bash
# Terminal 2
cd client
npm install
```

## Lancer en local
Terminal 1 (serveur):

```bash
cd server
npm start
```

Terminal 2 (client React):

```bash
cd client
npm start
```

Le client est sur `http://localhost:3000`.
Le serveur ecoute sur `http://localhost:5000` (ou `PORT` si definie).

## Variables d'environnement
### Frontend (client)
- `REACT_APP_SERVER_URL`: URL du backend Socket.IO (ex: `https://chat-app-server.up.railway.app`)

Le client utilise maintenant:
1. `REACT_APP_SERVER_URL` si definie
2. sinon `http://localhost:5000`

### Backend (server)
- `PORT`: port fourni par Railway
- `CLIENT_URL`: URL du frontend (ex: `https://chat-app-react.vercel.app`)

## Deploiement Backend sur Railway
1. Pousse ton code sur GitHub (deja fait).
2. Va sur Railway, `New Project` -> `Deploy from GitHub repo`.
3. Selectionne `MouradIntellij/chat-app-React`.
4. Dans les settings du service Railway:
- `Root Directory`: `server`
- `Build Command`: `npm install`
- `Start Command`: `npm start`
5. Dans `Variables`, ajoute:
- `CLIENT_URL=https://<ton-frontend-vercel>.vercel.app`
6. Deploy, puis copie l'URL publique Railway (ex: `https://chat-app-server.up.railway.app`).

## Deploiement Frontend sur Vercel
1. Va sur Vercel, `Add New...` -> `Project`.
2. Importe `MouradIntellij/chat-app-React`.
3. Configure le projet:
- `Root Directory`: `client`
- Framework detecte: Create React App
- Build command: `npm run build`
- Output: `build`
4. Ajoute la variable d'environnement Vercel:
- `REACT_APP_SERVER_URL=https://<ton-backend-railway>.up.railway.app`
5. Deploy.

## Ordre conseille
1. Deploy le backend Railway
2. Recupere son URL
3. Configure `REACT_APP_SERVER_URL` sur Vercel
4. Redeploy frontend

## GitHub
Depot distant:
`https://github.com/MouradIntellij/chat-app-React.git`
