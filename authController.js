exports.postLogin = (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === "admin" && senha === "1234") {
    req.session.usuario = usuario; // Define a sessão do usuário
    res.cookie("ultimoAcesso", new Date().toLocaleString()); // Define o cookie de último acesso
    return res.redirect("/menu"); // Redireciona para o menu
  }

  res.render("login", { error: "Usuário ou senha inválidos!" });
};
