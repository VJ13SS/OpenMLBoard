# Open ML Board

Open ML Board is an open-source MERN stack platform where developers can share their Machine Learning projects, explore others' work, and connect with fellow developers. Users can register, submit projects, comment, search by various filters, and manage their own profiles. Admin approval ensures quality and authenticity of shared projects.

## Features

- **User Registration & Login** – Secure authentication for all members.
- **Profile Management** – Edit personal details and add a contact URL (portfolio, LinkedIn, etc.).
- **Project Submission** – Submit projects with name, description, category, and up to two links (demo/code).
- **Approval Workflow** – Projects are visible after admin approval.
- **Search & Filter** – Find projects by name, author, or category.
- **Commenting System** – Discuss and provide feedback on projects.
- **Personalized Notifications** – Receive feedback or modification requests from the admin.

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (MongoDB Atlas)
- **Authentication:** JWT, bcrypt
- **Deployment:** Vercel

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/VJ13SS/open-ml-board.git
2. Install dependencies:

```bash
   # Server
   cd server
   npm install

   # Client
   cd ../client
   npm install
```

3. Configure environment variables:
   Create a `.env` file in the `server` folder and set:

   ```
   PORT = PORT_NUMBER
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Run the app:

   ```bash
   # Start backend
   cd server
   npm run dev

   # Start frontend (in another terminal)
   cd client
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## License

This project is licensed under the MIT License.
