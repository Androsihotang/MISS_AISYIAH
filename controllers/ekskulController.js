const Ekskul = require("../models/ekskul");

const getEkskul = async (req, res) => {
    try {
        const ekskul = await Ekskul.find();
        res.status(200).json(ekskul);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEkskulById = async (req, res) => {
    try {
        const ekskul = await Ekskul.findOne({ id_ekskul: req.params.id });
        if (!ekskul) {
            return res.status(404).json({ message: "Ekskul tidak ditemukan" });
        }
        res.status(200).json(ekskul);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEkskul = async (req, res) => {
    try {
        const { nama_ekskul, pelatih, deskripsi, deskripsi_lengkap, jadwal, lokasi } = req.body;
        const upload_gambar = req.file ? req.file.filename : null;

        const last = await Ekskul.findOne().sort({ id_ekskul: -1 });
        const newId = last ? last.id_ekskul + 1 : 1;

        const ekskul = new Ekskul({
            id_ekskul: newId,
            nama_ekskul,
            pelatih,
            deskripsi,
            deskripsi_lengkap,
            jadwal,
            lokasi,
            upload_gambar,
            id_admin: req.admin.id,
        });

        await ekskul.save();
        res.status(201).json({ message: "Ekskul berhasil ditambahkan", ekskul });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEkskul = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) updateData.upload_gambar = req.file.filename;

        const ekskul = await Ekskul.findOneAndUpdate(
            { id_ekskul: req.params.id },
            updateData,
            { returnDocument: "after" }
        );

        if (!ekskul) {
            return res.status(404).json({ message: "Ekskul tidak ditemukan" });
        }

        res.status(200).json({ message: "Ekskul berhasil diupdate", ekskul });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEkskul = async (req, res) => {
    try {
        const ekskul = await Ekskul.findOneAndDelete({ id_ekskul: req.params.id });
        if (!ekskul) {
            return res.status(404).json({ message: "Ekskul tidak ditemukan" });
        }
        res.status(200).json({ message: "Ekskul berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getEkskul, getEkskulById, createEkskul, updateEkskul, deleteEkskul };
