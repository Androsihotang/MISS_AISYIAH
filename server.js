const artikelRoutes = require("./routes/artikelRoutes");
const agendaRoutes = require("./routes/agendaRoutes");
const pengumumanRoutes = require("./routes/pengumumanRoutes");
const prestasiRoutes = require("./routes/prestasiRoutes");
const guruRoutes = require("./routes/guruRoutes");
const fasilitasRoutes = require("./routes/fasilitasRoutes");
const galeryRoutes = require("./routes/galeryRoutes");
const ekskulRoutes = require("./routes/ekskulRoutes");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();



const app = express();

// Middleware HARUS di atas route
app.use(cors());
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/dashboard", express.static(path.join(__dirname, "public", "dashboard")));

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// Routes
app.use("/api", authRoutes);
app.use("/api/artikel", artikelRoutes);
app.use("/api/agenda", agendaRoutes);
app.use("/api/pengumuman", pengumumanRoutes);
app.use("/api/prestasi", prestasiRoutes);
app.use("/api/guru", guruRoutes);
app.use("/api/fasilitas", fasilitasRoutes);
app.use("/api/galery", galeryRoutes);
app.use("/api/ekskul", ekskulRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
  });

// Fallback untuk Dashboard
app.use("/dashboard/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard", "index.html"));
});

app.use("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server berjalan di port ${process.env.PORT}`);
});