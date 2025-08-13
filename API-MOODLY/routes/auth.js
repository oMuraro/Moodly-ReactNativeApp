import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = express.Router();

// Cadastro
router.post("/register", async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: "Preencha todos os campos" });
    }

    try {
        const [userExists] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (userExists.length > 0) {
            return res.status(400).json({ message: "E-mail já cadastrado" });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);
        await pool.query("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", [nome, email, hashedPassword]);

        res.status(201).json({ message: "Usuário cadastrado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: "Preencha todos os campos" });
    }

    try {
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(400).json({ message: "Senha incorreta" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token, user: { id: user.id, nome: user.nome, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Erro no servidor", error });
    }
});

export default router;
