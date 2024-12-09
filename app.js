require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");

const app = express();
// const userRoutes = require('./routes/userRoutes');
const adminRoutes = require("./src/routes/adminRoutes");
const newadminRoutes = require("./src/modules/admin/routers/newadminRoutes");
const authRoutes = require("./src/modules/admin/routers/authRoutes");

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
// app.use('/api/users', userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/newadmin", newadminRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
