const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const containerName = process.env.CONTAINER_NAME || os.hostname();

// In-memory "database"
let visitCount = 0;
const users = {
    // Contoh user untuk testing
    'admin': { password: 'admin123', isTrial: false },
    'trial': { password: 'trial123', isTrial: true }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// Endpoint utama
app.get('/', (req, res) => {
    visitCount++;
    res.send(`Container ID: ${process.env.HOSTNAME || os.hostname()}: Total visits: ${visitCount}`);
});

// Login page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Login handler
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if (users[username] && users[username].password === password) {
        const sessionId = uuidv4();
        res.cookie('sessionId', sessionId, { maxAge: 900000, httpOnly: true });
        
        if (users[username].isTrial) {
            res.send('Anda login sebagai trial user. Fitur terbatas.');
        } else {
            res.send('Login berhasil!');
        }
    } else {
        res.status(401).send('Username atau password salah');
    }
});

// Signup redirect
app.get('/signup', (req, res) => {
    res.redirect('https://accounts.google.com/signup');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
