import FormatDate from "../form/FormatDate";
import logo from "../../assets/img/enter_logo.png";

function EnterDesc({
  razao,
  photo,
  email,
  fone,
  mei,
  cep,
  state,
  city,
  district,
  date,
  sector,
  status,
  capital,
}) {
  return (
    <div className="card shadow-sm border-0 rounded-4 p-4 my-4">
      <div className="row g-4 align-items-center">
        {/* Logo da empresa */}
        <div className="col-md-3 text-center">
          <img
            src={photo || logo}
            alt="Foto do Funcionário"
            className="rounded-circle shadow-sm"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
        </div>

        {/* Informações principais */}
        <div className="col-md-9">
          <div className="row g-3">
            <div className="col-sm-6">
              <p className="mb-1">
                <strong>Razão Social:</strong> {razao}
              </p>
              <p className="mb-1">
                <strong>E-mail:</strong> {email}
              </p>
              <p className="mb-1">
                <strong>Telefone:</strong> {fone}
              </p>
              <p className="mb-1">
                <strong>MEI:</strong> {mei}
              </p>
              <p className="mb-1">
                <strong>Data de abertura:</strong> {FormatDate(date)}
              </p>
            </div>

            <div className="col-sm-6">
              <p className="mb-1">
                <strong>CEP:</strong> {cep}
              </p>
              <p className="mb-1">
                <strong>Estado:</strong> {state}
              </p>
              <p className="mb-1">
                <strong>Cidade:</strong> {city}
              </p>
              <p className="mb-1">
                <strong>Bairro:</strong> {district}
              </p>
              <p className="mb-1">
                <strong>Status:</strong> {status}
              </p>
            </div>
          </div>

          <hr />

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="mb-1">
                <strong>Capital:</strong> {capital}
              </p>
            </div>
            <div className="col-sm-6">
              <p className="mb-1">
                <strong>Setor:</strong> {sector}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterDesc;
