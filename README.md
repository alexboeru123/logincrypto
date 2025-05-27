# Login and Registration with Password Encryption

## Description
This project implements a login and registration page with password encryption using Node.js for the backend and React for the frontend. Passwords are encrypted using the `crypto` library available in Node.js.

## Contents
- **Frontend**: Registration and login forms.
- **Backend**: Express server for handling registration and login requests, password encryption, and storing user data in a JSON file.

## Installation and Configuration

1. **Install dependencies**:
   ```sh
   npm install
   ```

2. **Start the development server**:
   ```sh
   npm run dev
   ```

3. **Access the application**:
   - Open your browser and navigate to [http://localhost:5173/](http://localhost:5173/).

## Project Structure

```
login-registration/
├── node_modules/
├── src/
│   ├── index.css
│   └── main.jsx
├── server.js
├── package.json
├── vite.config.js
└── README.md
```

## Technical Details

- **Frontend**:
  - **Framework**: React
  - **Styling**: CSS

- **Backend**:
  - **Framework**: Express
  - **Encryption**: `crypto` library in Node.js

## Contributions
Contributions are welcome! Please create a pull request or open an issue if you have suggestions or questions.

## License
This project is licensed under the [MIT License](LICENSE).
