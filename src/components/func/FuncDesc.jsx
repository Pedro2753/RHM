import FormatDate from "../form/FormatDate";

function FuncDesc({
  photo,
  sector,
  position,
  email,
  fone,
  gender,
  cep,
  state,
  city,
  district,
  date,
  agency,
  turn,
  wage,
}) {
  return (
    <div className="card shadow-sm border-0 rounded-4 p-4 my-4">
      <div className="row g-4 align-items-center">
        {/* Foto do funcionário */}
        <div className="col-md-3 text-center">
          <img
            src={
              photo ??
              "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
            alt="Foto do Funcionário"
            className="rounded-circle shadow-sm"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <h5 className="mt-3 text-primary fw-bold">
            {position ?? "N/A"}
          </h5>
          <p className="text-muted mb-0">
            {sector ?? "N/A"}
          </p>
        </div>

        {/* Informações principais */}
        <div className="col-md-9">
          <div className="row g-3">
            <div className="col-sm-6">
              <p className="mb-1"><strong>E-mail:</strong> {email ?? "N/A"}</p>
              <p className="mb-1"><strong>Telefone:</strong> {fone ?? "N/A"}</p>
              <p className="mb-1"><strong>Gênero:</strong> {gender ?? "N/A"}</p>
              <p className="mb-1">
                <strong>Data de Nascimento:</strong>{" "}
                {date ? FormatDate(date) : "N/A"}
              </p>
            </div>

            <div className="col-sm-6">
              <p className="mb-1"><strong>CEP:</strong> {cep ?? "N/A"}</p>
              <p className="mb-1"><strong>Estado:</strong> {state ?? "N/A"}</p>
              <p className="mb-1"><strong>Cidade:</strong> {city ?? "N/A"}</p>
              <p className="mb-1"><strong>Bairro:</strong> {district ?? "N/A"}</p>
            </div>
          </div>

          <hr />

          <div className="row g-3">
            <div className="col-sm-6">
              <p className="mb-1"><strong>Agência:</strong> {agency ?? "N/A"}</p>
              <p className="mb-1"><strong>Turno:</strong> {turn ?? "N/A"}</p>
            </div>
            <div className="col-sm-6">
              <p className="mb-1">
                <strong>Salário:</strong> {wage ?? "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FuncDesc;
