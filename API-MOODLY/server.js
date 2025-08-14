// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import humorRouter from "./routes/humor.js";
import db from "./db.js"; // seu arquivo db.js deve exportar o pool do mysql2/promise

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas de usuários
app.post("/usuarios", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const [result] = await db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senha]
    );
    res.status(201).json({ message: "Usuário criado", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/usuarios", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, nome, email FROM usuarios");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para editar usuário
app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?",
      [nome, email, senha, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rotas de autenticação e humor
app.use("/auth", authRouter);
app.use("/humor", humorRouter);

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
