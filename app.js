'use Strict'

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const sequelize = require("./config/database")
const app = express();
const httpServer = require("http").createServer(app);
const drillingBitRouter = require('./src/modules/GroundWater/routers/DrillingBitRoute');
const newadminRoutes = require("./src/modules/admin/routers/newadminRoutes");
const newauthRoutes = require("./src/modules/auth/routers/authRoutes");
const wellRoutes = require('./src/modules/GroundWater/routers/wellRouter');
const chemicalRouter = require('./src/modules/GroundWater/routers/chemicalRouter');
const drillingCaseDataRouter = require('./src/modules/GroundWater/routers/DrillingCaseDataRoute');
const longTestRouter = require('./src/modules/GroundWater/routers/LongTestRoute');
const reamRouter = require('./src/modules/GroundWater/routers/ReamRoute');
const recommendedTestRouter = require('./src/modules/GroundWater/routers/RecommendedTestRoute');
const rockLayerRouter = require('./src/modules/GroundWater/routers/RockLayerRoute');
const waterqualityRouter = require('./src/modules/waterquality/routers/waterQualityRouter');
// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());


app.use("/api/auth", newauthRoutes);
app.use('/api/users',wellRoutes);
app.use('/api/chemicals', chemicalRouter); 
app.use("/api/admin", newadminRoutes);

app.use('/api/drilling-bits', drillingBitRouter);
app.use('/api/drilling-cases', drillingCaseDataRouter);
app.use('/api/long-tests', longTestRouter); 
app.use('/api/reams', reamRouter); 
app.use('/api/recommended-tests', recommendedTestRouter);
app.use('/api/rock-layers', rockLayerRouter); 
app.use("/api/waterquality", waterqualityRouter);
const PORT = process.env.PORT || 8000;
// // Start Server
// 
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

sequelize
  .sync()
  .then(() => {
    console.log("Database is synced");
  })
  .catch((err) => {
    console.error("Database sync failed:", err);
  });

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});