import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { usePosition } from "./Enterprisehooks/usePosition";

import Loading from "../layout/Loading";
import Message from "../layout/Message";
import EnterForm from "../enter/EnterForm";
import EnterDesc from "../enter/EnterDesc.jsx";
import PositionForm from "../position/PositionForm";
import PositionCard from "../position/PositionCard";


function Enter() {
  const { id } = useParams();
  const [enterprise, setEnterprise] = useState({});
  const [showEnterpriseForm, setShowEnterpriseForm] = useState(false);
  const [showPositionForm, setShowPositionForm] = useState(false);
  const [positions, setPositions] = useState([]);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/enterprises/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setEnterprise(data);
          setPositions(data.positions);
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, [id]);

  function editPost(enterprise) {
    fetch(`http://localhost:5000/enterprises/${enterprise.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enterprise),
    })
      .then((res) => res.json())
      .then((data) => {
        setEnterprise(data);
        setShowEnterpriseForm(false);
        setMessage("Enterprise atualizado com sucesso!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  const { createPosition, removePosition } = usePosition({
    enterprise,
    setEnterprise,
    setMessage,
    setType,
    setPositions,
    setShowPositionForm,
  });

  function toggleEnterpriseForm() {
    setShowEnterpriseForm(!showEnterpriseForm);
  }

  function togglePositionForm() {
    setShowPositionForm(!showPositionForm);
  }

  return (
    <>
      {enterprise.name ? (
        <div className="container my-4">
          {message && <Message type={type} msg={message} />}

          {/* Card principal */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="fw-bold text-primary section-title">{enterprise.name}</h2>
                <button
                  className={`btn btn-${
                    showEnterpriseForm ? "primary" : "outline-primary"
                  }`}
                  onClick={toggleEnterpriseForm}
                >
                  {showEnterpriseForm ? "Fechar" : "Editar empresa"}
                </button>
              </div>

              {!showEnterpriseForm ? (
                <EnterDesc
                  razao={enterprise.razao}
                  photo={enterprise.photo}
                  email={enterprise.email}
                  fone={enterprise.fone}
                  mei={enterprise.mei}
                  cep={enterprise.cep}
                  state={enterprise.state?.name}
                  city={enterprise.city}
                  district={enterprise.district}
                  date={enterprise.date}
                  sector={enterprise.sector?.name}
                  status={enterprise.status}
                  capital={enterprise.capital}
            
                />
              ) : (
                <EnterForm
                  handleSubmit={editPost}
                  btnText="Concluir edição"
                  enterpriseData={enterprise}
                />
              )}
            </div>
          </div>

          {/* Cargos */}
          <div className="card shadow-sm mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="m-0">Cargos</h4>
              <button
                className={`btn btn-${
                  showPositionForm ? "secondary" : "outline-success"
                }`}
                onClick={togglePositionForm}
              >
                {showPositionForm ? "Fechar" : "Adicionar Cargo"}
              </button>
            </div>
            <div className="card-body">
              {showPositionForm && (
                <PositionForm
                  handleSubmit={createPosition}
                  btnText="Adicionar cargo"
                  enterpriseData={enterprise}
                />
              )}
              <div className="row">
                {positions.length > 0 ? (
                  positions.map((position) => (
                    <div className="col-md-6 mb-3" key={position.id}>
                      <PositionCard
                        id={position.id}
                        name={position.name}
                        wage={position.wage}
                        description={position.description}
                        handleRemove={removePosition}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-muted">Não há cargos registrados.</p>
                )}
              </div>
            </div>
          </div> 
            </div>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center w-100"
          style={{ height: "100vh" }}
        >
          <Loading />
        </div>
      )}
    </>
  );
}

export default Enter;
