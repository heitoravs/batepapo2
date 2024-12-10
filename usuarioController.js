const fs = require("fs");
const path = require("path");

const usuariosPath = path.join(__dirname, "../data/usuarios.json");
let usuarios = JSON.parse(fs.readFileSync(usuariosPath, "utf-8"));

exports.getCadastroPage = (req, res) => {
  res.render("cadastroUsuario", { usuarios });
};

exports.postCadastro = (req, res) => {
  const { nome, dataNascimento, nickname } = req.body;
  if (!nome || !dataNascimento || !nickname) {
    return res.render("cadastroUsuario", {
      error: "Todos os campos são obrigatórios!",
      usuarios,
    });
  }

  usuarios.push({ nome, dataNascimento, nickname });
  fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
  res.redirect("/usuarios/cadastro");
};
