// Importação de pacotes necessários
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");

const usuariosRoutes = require("./routes/usuarios"); // Importa rotas de usuários
const mensagensRoutes = require("./routes/mensagens"); // Importa rotas de mensagens

// Inicializa o aplicativo Express
const app = express();

// Middleware para análise de dados enviados no corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para gerenciar cookies
app.use(cookieParser());

// Middleware para sessões
app.use(
  session({
    secret: "salaBatePapo", // Chave secreta para a sessão
    resave: false,
    saveUninitialized: true,
  })
);

// Configuração do motor de templates EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware para arquivos estáticos (CSS, imagens, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Rotas específicas
app.use("/usuarios", usuariosRoutes);
app.use("/mensagens", mensagensRoutes);

// Rota para exibir a página de login
app.get("/login", (req, res) => {
  res.render("login", { error: null }); // Renderiza a página de login sem mensagem de erro
});

// Rota para processar o login
app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;

  // Verifica credenciais fixas
  if (usuario === "admin" && senha === "1234") {
    req.session.usuario = usuario; // Define o usuário na sessão
    res.cookie("ultimoAcesso", new Date().toLocaleString()); // Define um cookie de último acesso
    return res.redirect("/menu"); // Redireciona para o menu
  }

  // Exibe mensagem de erro se as credenciais forem inválidas
  res.render("login", { error: "Usuário ou senha inválidos!" });
});

// Rota para exibir o menu principal (protegida por sessão)
app.get("/menu", (req, res) => {
  if (!req.session.usuario) {
    return res.redirect("/login"); // Redireciona para login se não estiver logado
  }

  res.render("menu", { ultimoAcesso: req.cookies.ultimoAcesso || "Primeiro acesso" });
});

// Rota para logout
app.get("/logout", (req, res) => {
  req.session.destroy(); // Destrói a sessão do usuário
  res.redirect("/login"); // Redireciona para o login
});

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
