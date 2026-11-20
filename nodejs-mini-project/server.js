const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'students.json');

function readStudents() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return [];
  }
}

function send(res, status, body, type = 'text/html') {
  res.writeHead(status, { 'Content-Type': `${type}; charset=utf-8` });
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    const html = fs.readFileSync(path.join(__dirname, 'public', 'index.html'));
    return send(res, 200, html);
  }

  if (req.method === 'GET' && req.url === '/api/students') {
    return send(res, 200, JSON.stringify(readStudents()), 'application/json');
  }

  if (req.method === 'POST' && req.url === '/api/students') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const student = JSON.parse(body);
        if (!student.name || !student.course) {
          return send(res, 400, JSON.stringify({ error: 'Name and course are required.' }), 'application/json');
        }
        const students = readStudents();
        students.push({
          id: Date.now(),
          name: String(student.name).trim(),
          course: String(student.course).trim(),
          email: String(student.email || '').trim()
        });
        fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2));
        send(res, 201, JSON.stringify(students[students.length - 1]), 'application/json');
      } catch {
        send(res, 400, JSON.stringify({ error: 'Invalid request.' }), 'application/json');
      }
    });
    return;
  }

  if (req.method === 'DELETE' && req.url.startsWith('/api/students/')) {
    const id = Number(req.url.split('/').pop());
    const students = readStudents();
    const updated = students.filter(student => student.id !== id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2));
    return send(res, 200, JSON.stringify({ success: true }), 'application/json');
  }

  send(res, 404, 'Page not found');
});

server.listen(PORT, () => {
  console.log(`Student Management App running at http://localhost:${PORT}`);
});
