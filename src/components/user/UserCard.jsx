import { Link } from "react-router-dom";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

function UserCard({ id, name, fone, gender, email, handleRemove, photo, type }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id);
  };

  return (
    <div className="card text-center shadow-sm h-100">
      <div className="card-body d-flex flex-column align-items-center">
        <img
          src={photo || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
          alt={name}
          className="rounded-circle mb-3"
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
        <h5 className="card-title">{name}</h5>
        <p className="card-text mb-1"><strong>E-mail:</strong> {email}</p>
        <p className="card-text mb-1"><strong>Telefone:</strong> {fone}</p>
        <p className="card-text mb-1"><strong>Gênero:</strong> {gender}</p>
        <p className="card-text mb-3"><strong>Tipo:</strong> {type}</p>

        <div className="d-flex gap-2">
          <Link to={`/user/${id}`} className="btn btn-outline-primary btn-sm">
            <BsPencil className="me-1" /> Editar
          </Link>
          <button onClick={remove} className="btn btn-outline-danger btn-sm">
            <BsFillTrashFill className="me-1" /> Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
