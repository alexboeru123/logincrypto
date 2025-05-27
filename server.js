import express from 'express';
import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

const app = express();
const PORT = 3000;
const usersFilePath = path.join(__dirname, 'users.json');

app.use(express.json());

// Citirea datelor utilizatorilor din fișier
let users = [];
if (fs.existsSync(usersFilePath)) {
  users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
}

// Criptarea parolei
const hashPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
};

// Generarea unui salt unic
const generateSalt = () => {
  return crypto.randomBytes(16).toString('hex');
};

// Înregistrarea unui utilizator nou
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find(user => user.username === username);

  if (existingUser) {
    return res.json({ error: 'Nume de utilizator deja existent!' });
  }

  const salt = generateSalt();
  const hashedPassword = hashPassword(password, salt);

  users.push({ username, password: hashedPassword, salt });
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  res.json({ message: 'Înregistrare reușită!' });
});

// Logarea unui utilizator
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (!user) {
    return res.json({ error: 'Nume de utilizator sau parolă incorecte!' });
  }

  const hashedPassword = hashPassword(password, user.salt);

  if (hashedPassword !== user.password) {
    return res.json({ error: 'Nume de utilizator sau parolă incorecte!' });
  }

  res.json({ message: 'Logare reușită!' });
});

app.listen(PORT, () => {
  console.log(`Serverul rulează pe http://localhost:${PORT}`);
});
