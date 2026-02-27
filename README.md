# 🏠 Chennai Roommate Finder

A full-stack modern web application designed to help users find and post rooms or roommates in Chennai with ease. Secure, fast, and user-friendly.

---

## 🛠 Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React, Tailwind CSS, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | SQLite, Sequelize ORM |
| **Tools** | Axios, Lucide-React, Multer, JWT |

---

## ✨ Features

- 🔐 **Authentication**: Secure Signup and Login using JWT and Bcrypt (password hashing).
- 🏘️ **Room Posting**: Users can post details about available rooms.
- 🖼️ **Image Upload**: Multi-image upload support using Multer.
- 🔍 **Search**: Find rooms based on location, budget, or other preferences.
- 🗑️ **Management**: Users can delete their own room listings.
- 📱 **Responsive Design**: Optimized for all screen sizes using Tailwind CSS.

---

## 🚀 Getting Started

Follow these steps to get the project up and running locally.

### Prerequisites

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Chennai-Roommate-Finder.git
cd Chennai-Roommate-Finder
```

### 2. Backend Setup

```bash
cd backend
npm install
```

- Create a `.env` file in the `backend` directory:
```env
JWT_SECRET=your_jwt_secret_here
PORT=5000
```
- Start the backend server:
```bash
npm run dev
```
*Note: The SQLite database will be automatically created and synced on startup.*

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```
*Open [http://localhost:5173](http://localhost:5173) in your browser.*

---

## 📁 Project Structure

```text
RM_Finder/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Auth and Upload middleware
│   ├── models/         # Sequelize schemas
│   ├── routes/         # API endpoints
│   ├── uploads/        # Stored room images
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Main application pages
│   │   ├── App.jsx     # Routing and core logic
│   │   └── main.jsx    # Entry point
│   └── index.html
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Authenticate user & get token

### Room Listings
- `GET /rooms` - Fetch all available rooms
- `GET /rooms/:id` - Get details of a single room
- `POST /rooms` - Create a new listing (Auth required, Multi-image)
- `PUT /rooms/:id` - Update a listing (Auth required)
- `DELETE /rooms/:id` - Remove a listing (Auth required)

---

## 💡 Usage Guide

1. **Sign Up**: Create an account to start posting rooms.
2. **Post a Room**: Click on 'Post Room', fill in details, and upload images.
3. **Search**: Browse listings on the home page or use the search bar.
4. **Delete**: Manage your listings by navigating to your posted rooms and clicking delete.

---

## 🔮 Future Improvements

- [ ] Email notifications for room inquiries.
- [ ] Real-time chat between users.
- [ ] Map integration (Google Maps/MapmyIndia).
- [ ] Advanced filters (amenities, gender preferences).
- [ ] Admin dashboard for moderation.

---

## 🛠 Troubleshooting

| Issue | Solution |
| :--- | :--- |
| **CORS Error** | Ensure backend `cors()` is configured correctly. |
| **Image not showing** | Check if images exist in `backend/uploads` and static serving is enabled in `server.js`. |
| **DB Connection fail** | Delete `database.sqlite` and restart the server to trigger a fresh sync. |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

---

⭐ *If you like this project, give it a star on GitHub!*
