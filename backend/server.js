const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// add this line
const { sequelize } = require("./models"); // Import sequelize to sync tables
const roomRoutes = require("./routes/roomRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/rooms", roomRoutes);
app.use("/api/auth", authRoutes);

sequelize.sync().then(() => {
    console.log("Database connected and synced");
    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });
}).catch(err => {
    console.error("Failed to sync database:", err);
});
