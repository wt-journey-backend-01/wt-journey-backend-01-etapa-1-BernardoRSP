const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/sugestao", (req, res) => {
  const { nome, ingredientes } = req.query;

  res.send(`
    <h1>Obrigado pela sugestão, ${nome}!</h1>
    <p>Você sugeriu o lanche com os ingredientes: ${ingredientes}</p>
    <a href="/">Voltar ao início</a>
  `);
});

app.get("/contato", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contato.html"));
});

app.post("/contato", (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  res.send(`
    <h1>Mensagem Recebida!</h1>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Assunto:</strong> ${assunto}</p>
    <p><strong>Mensagem:</strong> ${mensagem}</p>
    <a href="/">Voltar ao início</a>
  `);
});

app.get("/api/lanches", (req, res) => {
  const lanchesPath = path.join(__dirname, "public", "data", "lanches.json");
  const lanches = JSON.parse(fs.readFileSync(lanchesPath, "utf-8"));
  res.json(lanches);
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () => {
  console.log(` Servidor da DevBurger rodando em http://localhost:${PORT}`);
});
