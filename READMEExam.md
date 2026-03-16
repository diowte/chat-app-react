

## Q1 

**App.js**  
Gère l’état global de l’application (pseudo, room, connexion) et affiche soit **Join.js** soit **Chat.js** selon si l’utilisateur est connecté.

**Chat.js**  
Affiche l’interface principale du chat. Gère l’envoi et la réception des messages, la liste des utilisateurs et l’affichage de la sidebar.

**Message.js**  
Affiche un message individuel dans la conversation avec son contenu, son auteur et l’heure.

**Sidebar.js**  
Affiche la barre latérale avec les utilisateurs connectés dans la room.

**Join.js**  
Affiche l’écran de connexion. Permet d’entrer un pseudo, choisir une room existante ou créer une nouvelle room.

**server.js**  
Gère le backend avec **Node.js**, **Express** et **Socket.io**. Il s’occupe des connexions, des rooms, des utilisateurs et des messages en temps réel.

**SocketContext.js**  
Crée une seule instance Socket.io et la partage dans toute l’application React grâce au Context.

---

## Q2 - Communication frontend / backend

### 1. Création et partage du socket

Dans **SocketContext.js**, le socket est créé avec :

```js

const socket = io(DEFAULT_SOCKET_URL, { autoConnect: false });

```


### 2. Événement émis lorsqu’un utilisateur rejoint une room

Dans **Join.js**, le frontend envoie l’événement **join_room** avec :
- **username** : le pseudo
- **room** : la room choisie

Le serveur reçoit cet événement dans **server.js** et ajoute l’utilisateur à la room.

### 3. Diffusion des messages dans la room

Dans **Chat.js**, le frontend envoie l’événement **send_message** avec le message.  
Ensuite, dans **server.js**, le serveur rediffuse ce message avec **receive_message** à tous les utilisateurs de la room.

La méthode utilisée est **io.to(data.room).emit(...)**, donc le message est envoyé à tout le monde dans la room, y compris l’expéditeur.

## Q3, Q4, Q5, explication:
## Q3 - Modification de Message.js

J’ai ajouté un indicateur visuel **Lu ✔✔** sous mes propres messages.  
Cet indicateur apparaît seulement lorsqu’un autre utilisateur a reçu le message.  
Le style a été ajouté avec du CSS standard dans **App.css**.

## Q4 - Bouton Quitter la salle

J’ai ajouté un bouton **Quitter la salle** dans le header de **Chat.js**.  
Ce bouton envoie un événement Socket.io au serveur, retire l’utilisateur de la room et réaffiche l’écran **Join.js**.

## Q5 - Historique des connexions dans Sidebar.js

J’ai ajouté un historique des 5 dernières activités dans **Sidebar.js**.  
Le serveur envoie un événement **activity_log** à chaque connexion et déconnexion, puis le client affiche ces événements dans la sidebar sous le titre **Activité récente**.