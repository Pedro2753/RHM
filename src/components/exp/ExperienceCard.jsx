import { BsFillTrashFill } from "react-icons/bs";
import FormatDate from "../form/FormatDate";

function ExperienceCard({ id, name, wage, description, admi_date, demi_date, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  return (
    <div className="card shadow-sm mb-4 border-0">
      <div className="card-body">
        <h5 className="card-title text-primary fw-bold">{name}</h5>

        <p className="mb-1">
          <strong>Salário:</strong> R$ {wage}
        </p>

        <p className="mb-1">
          <strong>Data de Admissão:</strong> {FormatDate(admi_date)}
        </p>

        <p className="mb-1">
          <strong>Data de Demissão:</strong> {FormatDate(demi_date)}
        </p>

        <p className="mt-3 text-muted">{description}</p>

        <div className="text-end mt-4">
          <button
            className="btn btn-outline-danger d-flex align-items-center gap-2"
            onClick={remove}
          >
            <BsFillTrashFill />
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExperienceCard;
