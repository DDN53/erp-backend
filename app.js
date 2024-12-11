require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");

const app = express();

const adminRoutes = require("./src/routes/adminRoutes");
const newadminRoutes = require("./src/modules/admin/routers/newadminRoutes");
const newauthRoutes = require("./src/modules/auth/routers/authRoutes");

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/auth", newauthRoutes);
// app.use("/api/admin", adminRoutes);
app.use("/api/admin", newadminRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
