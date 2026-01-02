import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import LinkButton from "../layout/LinkButton";
import { motion } from "framer-motion";
import logo from "../../assets/img/enter_logo.png";

function Enterprises() {
  const [enterprises, setEnterprises] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [enterpriseMessage, setEnterpriseMessage] = useState("");
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || "");
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 novo estado

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/enterprises")
        .then((resp) => resp.json())
        .then((data) => {
          setEnterprises(data);
          setRemoveLoading(true);
        })
        .catch(console.log);
    }, 1000);
  }, []);

  function removeFunc(id) {
    fetch(`http://localhost:5000/enterprises/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        setEnterprises(enterprises.filter((e) => e.id !== id));
        setEnterpriseMessage("Empresa removida com sucesso!");
      })
      .catch(console.log);
  }

  return (
    <motion.div
      className="container py-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container my-4">
        {/* 🔹 Título + pesquisa + botão */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h1 className="text-primary section-title mb-0">Empresas</h1>

          <div className="d-flex align-items-center gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar empresa..."
              style={{ maxWidth: "250px" }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <LinkButton to="/newenter" text="Cadastrar Empresa" />
          </div>
        </div>

        {/* Mensagens de sucesso */}
        {message && <div className="alert alert-success">{message}</div>}
        {enterpriseMessage && (
          <div className="alert alert-success">{enterpriseMessage}</div>
        )}

        {/* 🔹 Lista filtrada */}
        <div className="row g-3">
          {enterprises.length > 0 &&
            enterprises
              .filter((enterprise) =>
                enterprise.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((enterprise) => (
                <div
                  className="col-md-6 col-lg-4 shadow-sm h-100"
                  key={enterprise.id}
                >
                  <div className="card shadow-sm border h-100">
                    <div className="card-body text-center">
                      <img
                        src={enterprise.photo || logo}
                        alt={enterprise.name}
                        className="rounded-circle mb-3"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                        }}
                      />
                      <h5 className="card-title text-dark fw-bold mb-2">
                        {enterprise.name}
                      </h5>
                      <p className="card-text text-muted small mb-2">
                        {`(${enterprise.razao})` || "Razão não informada"}
                      </p>
                      <p className="card-text text-muted small mb-2">
                        {enterprise.sector?.name || "Setor não informado"}
                      </p>
                      <p className="text-muted small mb-2">
                        {enterprise.city} - {enterprise.state?.name}
                      </p>
                      <p className="mb-2">{enterprise.status}</p>

                      <div className="d-flex justify-content-center gap-2 mt-3">
                        <a
                          href={`/enter/${enterprise.id}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          Ver Detalhes
                        </a>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFunc(enterprise.id)}
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

          {removeLoading && enterprises.length === 0 && (
            <p className="text-center text-muted">
              Não há empresas cadastradas!
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Enterprises;
