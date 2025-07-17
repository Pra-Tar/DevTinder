require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const RazorPay = require("razorpay");
const http = require("http");
const socketIo = require("socket.io");

const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const connectionRoutes = require("./routes/connectionRoutes");

const razorpay = new RazorPay({
  key_id: "rzp_test_hKM4GwHeWK3w5f",
  key_secret: "0HqeNIVS2VSDw75xStEUpAKz",
});

const app = express();

app.use(
  cors({
    origin: "https://devtinder-frontend-zz8f.onrender.com",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

connectDB();

// Create HTTP server to use with socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://devtinder-frontend-zz8f.onrender.com",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.post("create-order", async (req, res) => {
  try {
    const options = {
      amount: 50000, // Amount in paise (i.e., ₹500 = 50000 paise)
      currency: "INR",
      receipt: "order_receipt_1234",
      payment_capture: 1, // Automatic payment capture
    };

    // Create an order with Razorpay
    const response = await razorpay.orders.create(options);

    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Socket.io connection for real-time events
io.on("connection", (socket) => {
  console.log("A user connected");

  // Event for receiving a new message from the client
  socket.on("send-message", (messageData) => {
    console.log("Received message:", messageData);

    // Broadcast the message to all connected clients
    io.emit("new-message", messageData);
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/connections", connectionRoutes);

app.get("/", (req, res) => res.send("API is running..."));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found!",
  });
});

server.listen(PORT, () => {
  console.log(`Server started on PORT:${PORT}`);
});
