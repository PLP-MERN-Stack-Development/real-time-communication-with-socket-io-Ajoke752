# Real-Time Chat Application with Socket.io

This assignment focuses on building a real-time chat application using Socket.io, implementing bidirectional communication between clients and server.

## Assignment Overview

You will build a chat application with the following features:

# Real-Time Chat Application — Socket.io + React

This repository is a fully working demonstration of a real-time chat application built with Socket.io on the server side and a React front-end. It was created as a learning project and includes a set of production-minded features while keeping the code approachable and easy to extend.

## Table of contents

- Project overview
- Features implemented
- Architecture and data flow
- Local setup and run instructions
- Environment variables
- Usage notes and end-user flows
- Design decisions and limitations
- Next steps and deployment suggestions
- Contributing
- License

## Project overview

The application enables multiple clients to communicate in real time via a Node.js server using Socket.io. Users can join with a display name, participate in a global chat room, send direct (private) messages, share images, react to messages, and see typing indicators and presence updates.

This repository contains both the server and client code so you can run the whole system locally for development or demonstration purposes.

## Features implemented

- Global broadcast messaging (all connected users)
- Username-based join / simple authentication flow
- Presence (online users list) and join/leave notifications
- Typing indicators (live 'user is typing' state)
- Private/direct messages between users
- File/image sharing (base64 for demo purposes)
- Read receipts (clients report visible messages)
- Message reactions (emoji reactions)
- Message delivery acknowledgement support (server-side callback)
- Room join/leave notifications and basic room support
- Browser notifications and optional sound notifications
- Basic reconnection support via Socket.io client options

At least three advanced features (private messaging, image sharing, read receipts/reactions) are implemented to satisfy the assignment's requirements.

## Architecture and data flow

- Server: `server/server.js`

  - Express.js application that also creates an HTTP server and mounts Socket.io.
  - Socket.io handles real-time events (user join, message send, private messages, typing, reactions, etc.).
  - In-memory stores for connected users, messages, and typing state are used for simplicity.

- Client: `client/` (React + Vite)
  - `client/src/socket/socket.js` exposes a preconfigured Socket.io client and a `useSocket` hook to centralize event handling.
  - React components provide the UI for login, chat, users list, message list, and message input.

Typical flow

- Client connects and emits `user_join` with a username.
- When a message is sent the client emits `send_message`; the server appends metadata (id, timestamp, sender) and emits `receive_message` to all clients.
- For private messages, the client emits `private_message` with the target socket id and the server routes the message accordingly.

## Local setup and run instructions

Prerequisites

- Node.js v18+ (or current LTS)
- npm (or yarn)

Start the server

```powershell
cd server
npm install
npm run start
```

Start the client (in a separate terminal)

```powershell
cd client
npm install
npm run dev
```

Open the client at http://localhost:5173. The server runs at http://localhost:5000 by default.

If you prefer, run both servers in separate terminals or use a process manager to run them together.

## Environment variables

- See `.env.example` for recommended environment variables.
- Important values:
  - `PORT` — the server port (default 5000).
  - `VITE_SOCKET_URL` — client-side variable for Socket.io host (e.g. `http://localhost:5000`). Vite requires client variables to be prefixed with `VITE_`.

## Usage notes and workflows

- Login: enter a display name in the client to join the chat.
- Global chat: send messages to broadcast to all users.
- Direct messages: select a user from the online list to send a private message.
- Typing indicator: the UI will show when other users are typing.
- Images: attach an image in the input; it is uploaded as a base64 payload for prototyping.
- Read receipts: messages that are visible to the user will trigger `message_read` events so senders can mark messages as read.

## Design decisions and limitations

- In-memory storage: chosen for simplicity in a demo project. Use a database (MongoDB/Postgres) or Redis for production.
- Images as base64: convenient for small demos but not efficient for production. Use a storage service and serve image URLs for larger files.
- Authentication: simple username-based onboarding. Replace with JWT/OAuth for real products.
- Security: basic CORS setup included. Add validation, sanitization, and rate limiting for a public deployment.

## Next steps and deployment suggestions

- Persist messages and user state (database + Redis for presence)
- Move file uploads to a dedicated upload pipeline (S3 / Cloud Storage)
- Add authentication and authorization (JWT, refresh tokens)
- Add pagination for chat history and search
- Harden security (helmet, rate limiting, input sanitization)
- Deploy: host the server on Render / Railway / Heroku (or containerize) and host the client on Vercel/Netlify.

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository and create a feature branch.
2. Implement changes and add tests where applicable.
3. Submit a pull request with a clear description.

## License
