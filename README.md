# Realtime Chat App

A full-stack real-time chat application built with React, Vite, Node.js, Express, MongoDB, Socket.IO, JWT authentication, Zustand, Tailwind CSS, and DaisyUI.

## Requirements

Install the following before starting the project:

- Node.js 20 or newer
- npm
- MongoDB, either locally or through MongoDB Atlas
- Git, if you are cloning the repository

Check Node and npm versions in PowerShell:

```powershell
node --version
npm --version
```

## Project Structure

```text
Realtime-chat-app/
|-- backend/       Express API and Socket.IO server
|-- frontend/      React and Vite client
|-- package.json    Root build and production scripts
`-- README.md
```

The backend runs on port `3000` by default. The Vite frontend runs on port `5173` by default.

## Install the Project

From PowerShell:

```powershell
Set-Location "C:\Users\Mili\Desktop\Alt\Realtime-chat-app"

npm install --prefix backend
npm install --prefix frontend
```

You can also install both applications with the root build command:

```powershell
npm run build
```

## MongoDB Configuration

### MongoDB Atlas

If you use MongoDB Atlas:

1. Create or open a MongoDB Atlas project and cluster.
2. Create a database user under **Security > Database Access**.
3. Add your current IP address under **Security > Network Access**.
4. Open **Connect > Drivers**, select Node.js, and copy the connection string.
5. Replace the username, password, and database name in the connection string.

If the database password contains characters such as `@`, `:`, `/`, or `#`, URL-encode the password before putting it in the URI.

### Local MongoDB

For a local MongoDB installation, use a URI similar to:

```text
mongodb://127.0.0.1:27017/realtime-chat
```

Make sure the MongoDB service is running before starting the backend.

## Backend Environment Variables

Create the local environment file by copying the example:

```powershell
Set-Location "C:\Users\Mili\Desktop\Alt\Realtime-chat-app"
Copy-Item .\backend\.env.example .\backend\.env
```

Open `backend/.env` and replace every placeholder with your own value:

```dotenv
PORT=3000
NODE_ENV=development

MONGO_URI=mongodb://127.0.0.1:27017/realtime-chat
JWT_SECRET=replace-with-a-long-random-secret

CLIENT_URL=http://localhost:5173

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_verified_sender_email
EMAIL_FROM_NAME=Realtime Chat

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

### Configuration notes

- `MONGO_URI` is required. The backend exits if it cannot connect to MongoDB.
- `JWT_SECRET` is used to sign authentication cookies. Use a long random value.
- `CLIENT_URL` must match the frontend address exactly. Keep it as `http://localhost:5173` for local development.
- Resend values are used for welcome emails. Use a verified sender address for `EMAIL_FROM`.
- Cloudinary values are needed for image upload functionality.
- Arcjet values are used for API protection. Create an Arcjet project and use its key.
- Do not commit `backend/.env` or any API keys. The repository ignores local environment files.

## Run in Development

Start the backend in a first PowerShell terminal:

```powershell
Set-Location "C:\Users\Mili\Desktop\Alt\Realtime-chat-app\backend"
npm run dev
```

You should see a message showing that the server is running on port `3000` and that MongoDB connected successfully.

Start the frontend in a second PowerShell terminal:

```powershell
Set-Location "C:\Users\Mili\Desktop\Alt\Realtime-chat-app\frontend"
npm run dev
```

Open the URL displayed by Vite, normally:

```text
http://localhost:5173
```

The frontend automatically sends API requests to:

```text
http://localhost:3000/api
```

Keep both terminals running while using the application.

## Test the Main Flow

1. Open `http://localhost:5173`.
2. Create a new account from the signup page.
3. Log in with the new account.
4. Open another browser window or private window and create a second account.
5. Use the contact list to start a conversation.
6. Send messages and verify that online status, typing indicators, and notifications update in real time.

If welcome emails are not configured, signup may fail when the backend tries to send the email. Configure Resend with a valid API key and verified sender, or inspect the backend email handler before disabling that feature.

## Available npm Scripts

### Root

```powershell
npm run build   # Install dependencies and build the frontend
npm start       # Start the backend in production mode
```

### Backend

```powershell
npm run dev     # Start with Nodemon
npm start       # Start with Node.js
```

### Frontend

```powershell
npm run dev     # Start Vite development server
npm run build   # Create frontend/dist
npm run preview # Preview the production frontend build
npm run lint    # Run ESLint
```

## Run in Production Mode Locally

Make sure `backend/.env` contains:

```dotenv
NODE_ENV=production
CLIENT_URL=http://localhost:3000
```

Build and start from the project root:

```powershell
Set-Location "C:\Users\Mili\Desktop\Alt\Realtime-chat-app"
npm run build
npm start
```

Open:

```text
http://localhost:3000
```

In production mode, Express serves the compiled files from `frontend/dist` and also serves the API and Socket.IO connection.

## Troubleshooting

### MongoDB connection error

- Check that `MONGO_URI` is correct.
- Confirm that your Atlas IP address is allowed.
- Confirm that the database username and password are correct.
- URL-encode special characters in the password.
- For local MongoDB, confirm that the MongoDB service is running.

### CORS or network errors in the browser

- Confirm that the backend is running on port `3000`.
- Confirm that the frontend is running on port `5173`.
- Confirm that `CLIENT_URL=http://localhost:5173`.
- Restart the backend after changing `.env`.

### Port already in use

Change `PORT` in `backend/.env`. If you change the backend port, also update the frontend API URL in `frontend/src/lib/axios.js` for development.

### Missing package or module errors

Reinstall dependencies:

```powershell
Set-Location "C:\Users\Mili\Desktop\Alt\Realtime-chat-app"
Remove-Item .\backend\node_modules, .\frontend\node_modules -Recurse -Force -ErrorAction SilentlyContinue
npm install --prefix backend
npm install --prefix frontend
```

## Security

Never publish these files or values:

- `backend/.env`
- MongoDB passwords and connection strings
- JWT secrets
- Resend API keys
- Cloudinary API secrets
- Arcjet keys

The repository keeps `backend/.env.example` as a safe configuration template. Put real values only in your local `backend/.env` file.
