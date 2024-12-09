require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const secret = process.env.JWT_SECRET || 'default_secret_key';
console.log('JWT_SECRET:', process.env.JWT_SECRET); // undefined인지 확인

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('DB connection failed:', err);
        return;
    }
    console.log('Connected to MariaDB!');
});
// POST /api/login - 로그인 처리
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log("req.bodyreq.body",req.body)
    if (!username || !password) {
        return res.status(400).json({ message: '아이디와 비밀번호를 입력하세요.' });
    }

    const query = 'SELECT * FROM login WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('DB Query Error:', err);
            return res.status(500).json({ message: '서버 오류' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
        }

        const user = results[0];
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: '로그인 성공',
            token: token,
            user: { id: user.id, username: user.username },
        });
    });
});

app.post('/api/signup', (req, res) => {
    console.log("req.body:", res.body);

    const { username, password, email } = req.body;

    // 필수 데이터 확인
    if (!username || !password || !email) {
        return res.status(400).json({ message: '아이디, 비밀번호, 이메일을 모두 입력하세요.' });
    }

    // 아이디 중복 확인
    const checkQuery = 'SELECT * FROM login WHERE username = ?';
    db.query(checkQuery, [username], (err, results) => {
        if (err) {
            console.error('DB Query Error:', err);
            return res.status(500).json({ message: '서버 오류' });
        }

        if (results.length > 0) {
            return res.status(409).json({ message: '이미 존재하는 아이디입니다.' });
        }

        // 사용자 정보 삽입
        const insertQuery = 'INSERT INTO login (username, password, email) VALUES (?, ?, ?)';
        db.query(insertQuery, [username, password, email], (err, result) => {
            if (err) {
                console.error('DB Insert Error:', err);
                return res.status(500).json({ message: '회원가입에 실패했습니다. 다시 시도해주세요.' });
            }

            console.log('회원가입 성공:', result);
            res.status(201).json({ message: '회원가입 성공' });
        });
    });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});