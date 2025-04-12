const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const businessRoutes = require("./routes/businesses");
const productRoutes = require("./routes/product");
const financialRoutes = require("./routes/financials");
const topFinancialRoutes = require("./routes/topFinancialRoutes");
const messageRoutes = require("./routes/messages");
const userRoutes = require("./routes/user");



// console.log("messageRoutes is:", messageRoutes);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("Biz Connect API is running 🚀");
});

app.use("/api/auth", authRoutes);

app.use("/api/business", businessRoutes);

app.use("/api/products",productRoutes);


app.use("/api/financial", financialRoutes);

app.use("/api/financials", topFinancialRoutes);

app.use("/api/messages", messageRoutes);

app.use("/api/users", userRoutes);


// MongoDB connection
const PORT = process.env.PORT || 5050;
const MONGO_URI = process.env.MONGO_URI ;

mongoose.connect(MONGO_URI)
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error("❌ MongoDB connection failed:", err.message);
});
