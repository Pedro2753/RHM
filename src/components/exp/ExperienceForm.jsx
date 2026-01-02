import { useState } from "react";

function ExperienceForm({ handleSubmit, btnText, funcData }) {
  const [exp, setExperience] = useState({});

  function submit(e) {
    e.preventDefault();
    funcData.experiences.push(exp);
    handleSubmit(funcData);
  }

  function handleChange(e) {
    setExperience({ ...exp, [e.target.name]: e.target.value });
  }

  return (
    <form
      onSubmit={submit}
      className="p-4 bg-light rounded shadow-sm border mx-auto"
      style={{ maxWidth: "600px" }}
    >
      <h4 className="text-center mb-4 text-primary fw-bold">
        Adicionar Experiência
      </h4>

      {/* Nome da função */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label fw-semibold">
          Nome da função
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          placeholder="Insira o nome do cargo"
          onChange={handleChange}
        />
      </div>

      {/* Salário */}
      <div className="mb-3">
        <label htmlFor="wage" className="form-label fw-semibold">
          Salário
        </label>
        <input
          type="number"
          id="wage"
          name="wage"
          className="form-control"
          placeholder="Insira o valor total"
          onChange={handleChange}
        />
      </div>

      {/* Descrição */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label fw-semibold">
          Descrição da função
        </label>
        <input
          type="text"
          id="description"
          name="description"
          className="form-control"
          placeholder="Insira a função"
          onChange={handleChange}
        />
      </div>

      {/* Datas */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="admi_date" className="form-label fw-semibold">
            Data de admissão
          </label>
          <input
            type="date"
            id="admi_date"
            name="admi_date"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="demi_date" className="form-label fw-semibold">
            Data de demissão
          </label>
          <input
            type="date"
            id="demi_date"
            name="demi_date"
            className="form-control"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Botão */}
      <div className="text-center mt-4">
        <button type="submit" className="btn btn-primary px-4">
          {btnText}
        </button>
      </div>
    </form>
  );
}

export default ExperienceForm;
