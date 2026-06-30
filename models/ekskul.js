const mongoose = require("mongoose");

const ekskulSchema = new mongoose.Schema({
  id_ekskul: Number,

  upload_gambar: String,

  nama_ekskul: String,

  pelatih: String,

  deskripsi: String,

  deskripsi_lengkap: String,

  jadwal: String,

  lokasi: String,

  id_admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LoginAdmin",
  },
});

module.exports = mongoose.model("ekskul", ekskulSchema, "ekskul");
