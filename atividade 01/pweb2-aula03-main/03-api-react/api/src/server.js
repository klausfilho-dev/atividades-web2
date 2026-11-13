import express from "express";
import cors from "cors";
import { produtos } from "./produtos.js";
import { categorias } from "./categorias.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// O React roda em http://localhost:8094 e consome esta API em :8093.
app.use(cors({ origin: "http://localhost:8094" }));

// Log das requisições recebidas pela API.
app.use((req, res, next) => {
  const inicio = Date.now();
  res.on("finish", () => {
    console.log(`[API] ${req.method} ${req.originalUrl} - ${res.statusCode} - ${Date.now() - inicio}ms`);
  });
  next();
});

// GET /api/produtos — endpoint original: lista todos os produtos.
app.get("/api/produtos", (req, res) => {
  res.status(200).json(produtos);
});

// GET /api/produtos/:id — endpoint original: detalhe de um produto ou 404.
app.get("/api/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  res.status(200).json(produto);
});

// GET /api/categorias — atividade: retorna o array de categorias.
app.get("/api/categorias", (req, res) => {
  res.status(200).json(categorias);
});

// GET /api/categorias/:id — atividade: retorna a categoria com seus produtos.
app.get("/api/categorias/:id", (req, res) => {
  const id = Number(req.params.id);
  const categoria = categorias.find((c) => c.id === id);

  if (!categoria) {
    return res.status(404).json({ error: "Categoria não encontrada" });
  }

  const produtosDaCategoria = produtos.filter(
    (produto) => produto.categoria === categoria.nome
  );

  return res.status(200).json({
    ...categoria,
    produtos: produtosDaCategoria,
  });
});

app.listen(PORT, () => {
  console.log(`API da Loja rodando na porta ${PORT}`);
  console.log(`Ex.: http://localhost:8093/api/produtos`);
  console.log(`Categorias: http://localhost:8093/api/categorias`);
});
