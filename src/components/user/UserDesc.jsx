function UserDesc({ type, photo, email, fone, gender }) {
  return (
    <div className="card shadow-sm border-0 rounded-4 p-4 my-4">
      <div className="row g-4 align-items-center">
        {/* Foto */}
        <div className="col-md-3 text-center">
          <img
            src={
              photo ||
              "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
            alt="Foto"
            className="rounded-circle shadow-sm"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <h5 className="mt-3 text-primary fw-bold">{type}</h5>
        </div>

        {/* Informações */}
        <div className="col-md-9">
          <div className="row g-3">
            <div className="col-sm-6">
              <p className="mb-1">
                <strong>E-mail:</strong> {email}
              </p>
              <p className="mb-1">
                <strong>Telefone:</strong> {fone}
              </p>

              <p className="mb-1">
                <strong>Gênero:</strong> {gender}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDesc;
