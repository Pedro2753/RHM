import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NewUser from "../pages/NewUser";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showUserForm, setShowUserForm] = useState(false);
  const [message, setMessage] = useState("")
  const navigate = useNavigate();

    function handleUserCreated(user) {
    // Fechar o formulário
    setShowUserForm(false);
    // Exibir mensagem
    setMessage("Usuário cadastrado com sucesso!");
        setEmail(user.email)
    setPassword(user.password)

    // Limpar a mensagem depois de 3s
    setTimeout(() => setMessage(""), 3000);

  }


  function toogleUserForm() {
    setShowUserForm(!showUserForm);
  }

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/users");
    const users = await res.json();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      alert("Credenciais inválidas");
    }
  }

  return (
     <motion.div
      className="container d-flex flex-column justify-content-center align-items-center min-vh-100"
      initial={{ opacity: 0, y: 30 }}   // começa invisível e mais abaixo
      animate={{ opacity: 1, y: 0 }}    // aparece suavemente
      exit={{ opacity: 0, y: -30 }}     // sai suavemente para cima
      transition={{ duration: 0.5 }}    // meio segundo de transição
    >
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{
        height: "100vh", // força altura total da tela
        width: "100vw", // força largura total
        overflow: "hidden", // remove possíveis barras de rolagem
      }}
    >
      
      <div
        className="card shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "18px",
        }}
      >
        <div className="text-center mb-4">
                      {message && (
        <div className="alert alert-success text-center" role="alert">
          {message}
        </div>
      )}
          <h2 className="text-primary fw-bold">Acesso à Plataforma</h2>
          <p className="text-muted mb-0">Entre com suas credenciais</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">E-mail</label>
            <input
              type="email"
              className="form-control"
              placeholder="seu@exemplo.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Entrar
          </button>

          <div className="text-center mt-3">
            <button
              type="button"
              onClick={toogleUserForm}
              className="btn btn-link text-decoration-none"
            >
              {!showUserForm ? "Criar nova conta" : "Fechar cadastro"}
            </button>
          </div>
        </form>

        

        {showUserForm && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75"
            style={{ zIndex: 1050, overflowY: "auto", padding: "2rem" }}
          >
            <div
              className="bg-white rounded shadow position-relative mx-auto"
              style={{
                maxWidth: "500px",
                width: "100%",
                margin: "auto",
                maxHeight: "90vh", // impede que passe da tela
                overflowY: "auto", // adiciona scroll interno se precisar
                padding: "1.5rem",
              }}
            >
              <button
                onClick={toogleUserForm}
                className="btn-close position-absolute top-0 end-0 m-3"
                aria-label="Fechar"
              ></button>

              <NewUser onUserCreated={handleUserCreated}/>
            </div>
          </div>
        )}
      </div>
    </div>
    </motion.div>
  );
}

export default Login;
