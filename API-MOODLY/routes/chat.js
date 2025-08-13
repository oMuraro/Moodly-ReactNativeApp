import express from "express";
import pool from "../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware de auth
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token não fornecido" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch {
        res.status(401).json({ message: "Token inválido" });
    }
};

// Salvar mensagem
router.post("/", auth, async (req, res) => {
    const { mensagem, remetente } = req.body;

    if (!mensagem || !remetente) return res.status(400).json({ message: "Campos obrigatórios" });

    try {
        await pool.query(
            "INSERT INTO chatbot_conversas (usuario_id, mensagem, remetente) VALUES (?, ?, ?)",
            [req.userId, mensagem, remetente]
        );
        res.status(201).json({ message: "Mensagem salva" });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error });
    }
});

// Listar mensagens do usuário
router.get("/", auth, async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM chatbot_conversas WHERE usuario_id = ? ORDER BY enviado_em ASC",
            [req.userId]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error });
    }
});

export default router;
