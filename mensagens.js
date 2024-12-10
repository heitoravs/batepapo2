const express = require("express");
const router = express.Router();


let mensagens = [
  { usuario: "Admin", mensagem: "Bem-vindo ao bate-papo!", data: "2023-01-01 12:00" },
];


router.get("/batePapo", (req, res) => {
  const usuarios = [
    { nickname: "Admin" },
    { nickname: "User1" },
    { nickname: "User2" },
  ]; 
  res.render("batePapo", { usuarios, mensagens, error: null });
});

router.post("/batePapo", (req, res) => {
  const { usuario, mensagem } = req.body;

  if (!usuario || !mensagem) {
    const usuarios = [
      { nickname: "Admin" },
      { nickname: "User1" },
      { nickname: "User2" },
    ];
    return res.render("batePapo", {
      usuarios,
      mensagens,
      error: "Preencha todos os campos!",
    });
  }


  mensagens.push({ usuario, mensagem, data: new Date().toLocaleString() });
  res.redirect("/mensagens/batePapo");
});

module.exports = router;
