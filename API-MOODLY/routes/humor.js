import express from "express";
import pool from "../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware para autenticação
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

// Criar humor
router.post("/", auth, async (req, res) => {
    const { emoji, texto_dia } = req.body;

    if (!emoji) return res.status(400).json({ message: "Emoji é obrigatório" });

    try {
        const dataAtual = new Date().toISOString().split("T")[0];
        const [result] = await pool.query(
            "INSERT INTO humor (usuario_id, emoji, texto_dia, data_registro) VALUES (?, ?, ?, ?)",
            [req.userId, emoji, texto_dia || "", dataAtual]
        );

        await pool.query("UPDATE usuarios SET ultimo_humor_id = ? WHERE id = ?", [result.insertId, req.userId]);

        res.status(201).json({ message: "Humor registrado", id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error });
    }
});

// Listar humores do usuário
router.get("/", auth, async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM humor WHERE usuario_id = ? ORDER BY data_registro DESC", [req.userId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error });
    }
});

// Atualizar humor
router.put('/:id', auth, async (req, res) => {
    const { emoji, texto_dia } = req.body;
    const { id } = req.params;
    if (!emoji) return res.status(400).json({ message: "Emoji é obrigatório" });
    try {
        const [result] = await pool.query(
            "UPDATE humor SET emoji = ?, texto_dia = ? WHERE id = ? AND usuario_id = ?",
            [emoji, texto_dia || "", id, req.userId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Humor não encontrado ou não pertence ao usuário" });
        }
        res.json({ message: "Humor atualizado" });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error });
    }
});

// Deletar humor
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query(
            "DELETE FROM humor WHERE id = ? AND usuario_id = ?",
            [id, req.userId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Humor não encontrado ou não pertence ao usuário" });
        }
        res.json({ message: "Humor deletado" });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error });
    }
});

export default router;
