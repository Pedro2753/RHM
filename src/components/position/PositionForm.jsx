import { useState } from "react";

function PositionForm({ handleSubmit, btnText, enterpriseData }) {
  const [position, setPosition] = useState({});

  function submit(e) {
    e.preventDefault();
    enterpriseData.positions.push(position);
    handleSubmit(enterpriseData);
  }

  function handleChange(e) {
    setPosition({ ...position, [e.target.name]: e.target.value });
  }

  return (
    <form
      onSubmit={submit}
      className="p-4 bg-light rounded shadow-sm border mx-auto"
      style={{ maxWidth: "600px" }}
    >
      <h4 className="text-center mb-4 text-primary fw-bold">
        Adicionar Cargo
      </h4>

      {/* Nome da função */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label fw-semibold">
          Nome do cargo
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

      

  

      {/* Botão */}
      <div className="text-center mt-4">
        <button type="submit" className="btn btn-primary px-4">
          {btnText}
        </button>
      </div>
    </form>
  );
}

export default PositionForm;
