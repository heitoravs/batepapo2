const express = require("express");
const router = express.Router();

router.get("/cadastro", (req, res) => {
  res.render("cadastroUsuario", { usuarios: [], error: null });
});

router.post("/cadastro", (req, res) => {
  const { nome, dataNascimento, nickname } = req.body;

  if (!nome || !dataNascimento || !nickname) {
    return res.render("cadastroUsuario", {
      usuarios: [],
      error: "Todos os campos são obrigatórios!",
    });
  }

  const usuarios = [{ nome, dataNascimento, nickname }];
  res.render("cadastroUsuario", { usuarios, error: null });
});

module.exports = router;
