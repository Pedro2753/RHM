import { BsFillTrashFill } from "react-icons/bs";
import FormatDate from "../form/FormatDate";

function EducationCard({ id, name, description, start_date, end_date, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  return (
    <div className="card shadow-sm mb-3 border-0">
      <div className="card-body">
        {/* Título */}
        <h5 className="card-title fw-bold text-primary mb-3">{name}</h5>

        {/* Datas */}
        <p className="card-text mb-1">
          <strong>Data de Início:</strong> {FormatDate(start_date)}
        </p>
        <p className="card-text mb-3">
          <strong>Data de Conclusão:</strong> {FormatDate(end_date)}
        </p>

        {/* Descrição */}
        <p className="card-text text-muted">{description}</p>

        {/* Ações */}
        <div className="d-flex justify-content-end mt-3">
          <button
            onClick={remove}
            className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
          >
            <BsFillTrashFill />
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default EducationCard;
