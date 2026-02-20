import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import LinkButton from "../layout/LinkButton";
import { motion } from "framer-motion";
import logo from "../../assets/img/enter_logo.png";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";

function Enterprises() {
  const [enterprises, setEnterprises] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [enterpriseMessage, setEnterpriseMessage] = useState("");
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || "");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // 🔵 BUSCAR EMPRESAS DO SUPABASE (COM JOIN)
  useEffect(() => {
    async function loadEnterprises() {
      const { data, error } = await supabase
        .from("enterprises")
        .select(`
          *,
          states ( name ),
          sectors ( name )
        `);

      if (error) {
        console.log(error);
      } else {
        setEnterprises(data);
        setRemoveLoading(true);
      }
    }

    loadEnterprises();
  }, []);

  // 🔴 REMOVER EMPRESA
  async function removeFunc(id) {
    const { error } = await supabase
      .from("enterprises")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
    } else {
      setEnterprises(enterprises.filter((e) => e.id !== id));
      setEnterpriseMessage("Empresa removida com sucesso!");
    }
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
        {/* Título + pesquisa + botão */}
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

        {/* Mensagens */}
        {message && <div className="alert alert-success">{message}</div>}
        {enterpriseMessage && (
          <div className="alert alert-success">{enterpriseMessage}</div>
        )}

        {/* Lista */}
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
                        ({enterprise.razao || "Razão não informada"})
                      </p>

                      <p className="card-text text-muted small mb-2">
                        {enterprise.sectors?.name || "Setor não informado"}
                      </p>

                      <p className="text-muted small mb-2">
                        {enterprise.city} - {enterprise.states?.name}
                      </p>

                      <p className="mb-2">{enterprise.status}</p>

                      <div className="d-flex justify-content-center gap-2 mt-3">
                        <Link
                          to={`/enter/${enterprise.id}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          Ver Detalhes
                        </Link>

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
