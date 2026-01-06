import { useLocation } from "react-router-dom";
import Loading from "../layout/Loading";
import LinkButton from "../layout/LinkButton";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";

function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [funcMessage, setFuncMessage] = useState("");
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || "");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/funcionarios", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setFuncionarios(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, []);

  function removeFunc(id) {
    fetch(`http://localhost:5000/funcionarios/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then(() => {
        setFuncionarios(funcionarios.filter((func) => func.id !== id));
        setFuncMessage("Funcionário removido com sucesso!");
        setTimeout(() => setFuncMessage(""), 1000);
      })
      .catch((err) => console.log(err));
  }

  function removeAllFuncionarios() {
    if (
      !window.confirm("Tem certeza que deseja remover TODOS os funcionários?")
    ) {
      return;
    }

    setRemoveLoading(false);

    Promise.all(
      funcionarios.map((func) =>
        fetch(`http://localhost:5000/funcionarios/${func.id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
      )
    )
      .then(() => {
        setFuncionarios([]);
        setFuncMessage("Todos os funcionários foram removidos com sucesso!");
        setTimeout(() => setFuncMessage(""), 3000);
        setRemoveLoading(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <motion.div
      className="container py-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container py-4 ">
        {/* Título e botão */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h1 className="text-primary section-title mb-0">
            Meus Funcionários
          </h1>

          <div className="d-flex align-items-center gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar funcionário..."
              style={{ maxWidth: "250px" }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <LinkButton to="/newfunc" text="Cadastrar Funcionário" />

            <button
              className="btn btn-danger"
              onClick={removeAllFuncionarios}
              disabled={funcionarios.length === 0}
            >
              Limpar funcionários
            </button>
          </div>
        </div>

        {/* Mensagens */}
        {message && (
          <div className="alert alert-success text-center" role="alert">
            {message}
          </div>
        )}
        {funcMessage && (
          <div className="alert alert-info text-center" role="alert">
            {funcMessage}
          </div>
        )}

        {/* Lista */}
        <div className="row g-3 ">
          {funcionarios.length > 0 &&
            funcionarios
              .filter((func) =>
                (func.name ?? "")
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((func) => (
                <div
                  className="col-md-6 col-lg-4 shadow-sm h-100"
                  key={func.id}
                >
                  <div className="card shadow-sm border h-100">
                    <div className="card-body text-center">
                      <img
                        src={
                          func.photo ??
                          "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                        }
                        alt={func.name ?? "Funcionário"}
                        className="rounded-circle mb-3"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                        }}
                      />

                      <h5 className="card-title text-dark fw-bold mb-2">
                        {func.name ?? "N/A"}
                      </h5>

                      <p className="card-text text-muted small mb-2">
                        {func.position?.name ?? "N/A"}
                      </p>

                      <p className="mb-2">
                        <strong>Setor:</strong>{" "}
                        {func.sector?.name ?? "N/A"}
                      </p>

                      <p className="mb-2">
                        <strong>Salário:</strong>{" "}
                        {func.wage ?? "N/A"}
                      </p>

                      <p className="text-muted small mb-2">
                        {func.city ?? "N/A"} - {func.state?.name ?? "N/A"}
                      </p>

                      <div className="d-flex justify-content-center gap-2 mt-3">
                        <a
                          href={`/func/${func.id}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          Ver Detalhes
                        </a>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFunc(func.id)}
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

          {!removeLoading && (
            <div className="text-center py-5">
              <Loading />
            </div>
          )}

          {removeLoading && funcionarios.length === 0 && (
            <p className="text-center text-muted">
              Não há funcionários cadastrados!
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Funcionarios;
