require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT;

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const connectionRoutes = require("./routes/connectionRoutes");

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/connections", connectionRoutes);

app.get("/", (req, res) => res.send("API is running..."));

app.use((req, res)=>{
  res.status(404).json({
    success:false,
    message:"API endpoint not found!"
  })
})

app.listen(PORT, () => {
  console.log(`Server started on PORT:${PORT}`);
});
