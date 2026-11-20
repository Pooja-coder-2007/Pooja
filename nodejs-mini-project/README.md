# Student Management System (Node.js Mini Project)

A beginner-friendly mini project to add, view, and delete student records.

## Requirements
- Node.js installed
- Visual Studio Code (or another code editor)
- A web browser

## How to run
1. Extract the ZIP file.
2. Open the extracted `nodejs-mini-project` folder in VS Code.
3. Open the terminal in VS Code (`Terminal` -> `New Terminal`).
4. Run:

   ```bash
   npm start
   ```

5. Open this address in your browser:

   http://localhost:3000

No extra npm packages are required. Student records are saved in `students.json`.

## Features
- Add a student with name, course, and optional email.
- View all saved students.
- Delete a student.
- Store records locally in a JSON file.

## Project structure
- `server.js` - Node.js web server and API routes.
- `public/index.html` - User interface.
- `students.json` - Student data storage.
- `package.json` - Project information and start command.
