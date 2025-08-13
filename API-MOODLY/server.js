import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import humorRouter from "./routes/humor.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Conexão com o banco
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Rotas
app.post("/usuarios", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const [result] = await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senha]
    );
    res.status(201).json({ message: "Usuário criado", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/usuarios", async (req, res) => {
  const [rows] = await pool.query("SELECT id, nome, email FROM usuarios");
  res.json(rows);
});

app.use("/auth", authRouter);
app.use("/humor", humorRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});
