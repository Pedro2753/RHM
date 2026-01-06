import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useEducation } from "./FuncHooks/useEducation";
import { useExperience } from "./FuncHooks/useExperience";
import { useNavigate } from "react-router-dom";

import Loading from "../layout/Loading";
import Message from "../layout/Message";
import FuncForm from "../func/FuncForm";
import FuncDesc from "../func/FuncDesc";
import ExperienceForm from "../exp/ExperienceForm";
import ExperienceCard from "../exp/ExperienceCard";
import EducationCard from "../edu/EducationCard";
import EducationForm from "../edu/EducationForm";

function Func() {
  const { id } = useParams();
  const [func, setFunc] = useState({});
  const [showFuncForm, setShowFuncForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/funcionarios/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setFunc(data);
          setExperiences(data.experiences);
          setEducations(data.educations);
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, [id]);

  function editPost(func) {
    fetch(`http://localhost:5000/funcionarios/${func.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(func),
    })
      .then((res) => res.json())
      .then((data) => {
        setFunc(data);
        setShowFuncForm(false);
        setMessage("Funcionário atualizado com sucesso!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  const { createEducation, removeEducation } = useEducation({
    func,
    setFunc,
    setMessage,
    setEducations,
    setType,
  });

  const { createExperience, removeExperience } = useExperience({
    func,
    setFunc,
    setMessage,
    setType,
    setExperiences,
    setShowExperienceForm,
  });

  function toggleFuncForm() {
    setShowFuncForm(!showFuncForm);
  }

  function toggleExperienceForm() {
    setShowExperienceForm(!showExperienceForm);
  }

  function toggleEducationForm() {
    setShowEducationForm(!showEducationForm);
  }

  return (
    <>
      {func.name ? (
        <div className="container my-4">
          {message && <Message type={type} msg={message} />}

          {/* Card principal */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              {/* Botão voltar */}
              <button
                className="btn btn-outline-primary mb-2"
                onClick={() => navigate(-1)}
              >
                ← Voltar
              </button>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="fw-bold text-primary section-title">
                  {func.name}
                </h2>
                <button
                  className={`btn btn-${
                    showFuncForm ? "primary" : "outline-primary"
                  }`}
                  onClick={toggleFuncForm}
                >
                  {showFuncForm ? "Fechar" : "Editar funcionário"}
                </button>
              </div>

              {!showFuncForm ? (
                <FuncDesc
                  sector={func.sector?.name}
                  photo={func.photo}
                  position={func.position?.name}
                  email={func.email}
                  fone={func.fone}
                  gender={func.gender}
                  cep={func.cep}
                  state={func.state?.name}
                  city={func.city}
                  district={func.district}
                  date={func.date}
                  agency={func.agency}
                  wage={func.wage}
                  turn={func.turn?.name}
                />
              ) : (
                <FuncForm
                  handleSubmit={editPost}
                  btnText="Concluir edição"
                  funcData={func}
                />
              )}
            </div>
          </div>

          {/* Experiências */}
          <div className="card shadow-sm mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="m-0">Experiências</h4>
              <button
                className={`btn btn-${
                  showExperienceForm ? "secondary" : "outline-success"
                }`}
                onClick={toggleExperienceForm}
              >
                {showExperienceForm ? "Fechar" : "Adicionar experiência"}
              </button>
            </div>
            <div className="card-body">
              {showExperienceForm && (
                <ExperienceForm
                  handleSubmit={createExperience}
                  btnText="Adicionar experiência"
                  funcData={func}
                />
              )}
              <div className="row">
                {experiences.length > 0 ? (
                  experiences.map((exp) => (
                    <div className="col-md-6 mb-3" key={exp.id}>
                      <ExperienceCard
                        id={exp.id}
                        name={exp.name}
                        wage={exp.wage}
                        description={exp.description}
                        admi_date={exp.admi_date}
                        demi_date={exp.demi_date}
                        handleRemove={removeExperience}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-muted">Não há experiência registrada.</p>
                )}
              </div>
            </div>
          </div>

          {/* Educação */}
          <div className="card shadow-sm mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="m-0">Educação</h4>
              <button
                className={`btn btn-${
                  showEducationForm ? "secondary" : "outline-info"
                }`}
                onClick={toggleEducationForm}
              >
                {showEducationForm ? "Fechar" : "Adicionar formação"}
              </button>
            </div>
            <div className="card-body">
              {showEducationForm && (
                <EducationForm
                  handleSubmit={createEducation}
                  btnText="Adicionar formação"
                  funcData={func}
                />
              )}
              <div className="row">
                {educations.length > 0 ? (
                  educations.map((edu) => (
                    <div className="col-md-6 mb-3" key={edu.id}>
                      <EducationCard
                        id={edu.id}
                        name={edu.name}
                        description={edu.description}
                        start_date={edu.start_date}
                        end_date={edu.end_date}
                        handleRemove={removeEducation}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-muted">Não há formação registrada.</p>
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

export default Func;
