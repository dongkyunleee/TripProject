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

// 회원가입 처리 (Insert 작업)
app.post('/api/signup', (req, res) => {
    console.log("req.body:", res.body);

    const { username, password, email , phone} = req.body;

    // 필수 데이터 확인
    if (!username || !password || !email || !phone) {
        return res.status(400).json({ message: '아이디, 비밀번호, 이메일, 전화번호를 모두 입력하세요.' });
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
        const insertQuery = 'INSERT INTO login (username, password, email, phone) VALUES (?, ?, ?, ?)';
        db.query(insertQuery, [username, password, email , phone], (err, result) => {
            if (err) {
                console.error('DB Insert Error:', err);
                return res.status(500).json({ message: '회원가입에 실패했습니다. 다시 시도해주세요.' });
            }

            console.log('회원가입 성공:', result);
            res.status(201).json({ message: '회원가입 성공' });
        });
    });
});

// GET /api/users - 모든 사용자 데이터 조회
app.get('/api/user', (req, res) => {
    console.log("Authorization Header:", req.headers.authorization); // 요청 헤더에서 authorization 가져오기

    const token = req.headers.authorization?.split(' ')[1]; // Bearer token
    // 토큰 정보로 로그인 확인
    if (!token) {
        return res.status(401).json({ message: '로그인이 필요합니다.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
        }

        const userId = decoded.username; // 또는 decoded.id, 상황에 맞게 수정
        const query = 'SELECT id, username, email FROM login WHERE username = ?'; // userId를 사용하도록 변경

        db.query(query, [userId], (err, results) => {
            if (err) {
                return res.status(500).json({ message: '서버 오류' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
            }

            res.status(200).json(results[0]); // 사용자 정보 반환
        });
    });
});

//Post /api/update - 사용자 업데이트
app.post('/api/update', (req, res) => {
    const { id, username, email, phone} = req.body;
    console.log('Received data:', { username, email, phone, id });
    // 필수 필드가 없는 경우
    if (!id || !username || !email || !phone) {
        return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
    }
console.log("!!!!!!!")
    // UPDATE 쿼리 작성 (사용자 정보 수정)
    const query = `
        UPDATE login 
        SET username = ?, email = ?, phone = ?
        WHERE id = ?
    `;

    // 데이터베이스 쿼리 실행
    db.query(query, [username, email, phone, id], (err, result) => {
        if (err) {
            console.error('DB Query Error:', err);
            return res.status(500).json({ message: '서버 오류' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        res.status(200).json({ message: '사용자 정보가 성공적으로 업데이트되었습니다.' });
    });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});