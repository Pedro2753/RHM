import { useState } from "react";

function EducationForm({ handleSubmit, btnText, funcData }) {
  const [exp, setEducation] = useState({});

  function submit(e) {
    e.preventDefault();
    funcData.educations.push(exp);
    handleSubmit(funcData);
  }

  function handleChange(e) {
    setEducation({ ...exp, [e.target.name]: e.target.value });
  }

  return (
    <form
      onSubmit={submit}
      className="p-4 bg-light rounded shadow-sm border mx-auto"
      style={{ maxWidth: "600px" }}
    >
      <h4 className="text-center mb-4 text-primary fw-bold">
        Adicionar Formação
      </h4>

      {/* Nome da formação */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label fw-semibold">
          Nome da formação
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          placeholder="Insira o nome da formação"
          onChange={handleChange}
        />
      </div>

      {/* Descrição */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label fw-semibold">
          Descrição da formação
        </label>
        <input
          type="text"
          id="description"
          name="description"
          className="form-control"
          placeholder="Insira a descrição"
          onChange={handleChange}
        />
      </div>

      {/* Datas */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="start_date" className="form-label fw-semibold">
            Data de início
          </label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="end_date" className="form-label fw-semibold">
            Data de conclusão
          </label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            className="form-control"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Botão de envio */}
      <div className="text-center mt-4">
        <button type="submit" className="btn btn-primary px-4">
          {btnText}
        </button>
      </div>
    </form>
  );
}

export default EducationForm;
