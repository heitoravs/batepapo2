const fs = require("fs");
const path = require("path");

const mensagensPath = path.join(__dirname, "../data/mensagens.json");
let mensagens = JSON.parse(fs.readFileSync(mensagensPath, "utf-8"));

exports.getBatePapoPage = (req, res) => {
  const usuarios = require("../data/usuarios.json");
  res.render("batePapo", { usuarios, mensagens });
};

exports.postMensagem = (req, res) => {
  const { usuario, mensagem } = req.body;
  if (!usuario || !mensagem) {
    return res.render("batePapo", {
      error: "Preencha todos os campos!",
      mensagens,
    });
  }

  mensagens.push({ usuario, mensagem, data: new Date().toLocaleString() });
  fs.writeFileSync(mensagensPath, JSON.stringify(mensagens, null, 2));
  res.redirect("/mensagens/batePapo");
};
