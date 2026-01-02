import { useState, useEffect } from "react";
import Loading from "../layout/Loading";

function FuncForm({ handleSubmit, btnText, funcData }) {
  const [enterprises, setEnterprises] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [positions, setPositions] = useState([]);
  const [states, setStates] = useState([]);
  const [turns, setTurns] = useState([]);
  const [func, setFunc] = useState(funcData || {});
  const [preview, setPreview] = useState(null);
  const [removeLoading, setRemoveLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  const [empresaSelecionada, setEmpresaSelecionada] = useState("");
  const [cargoSelecionado, setCargoSelecionada] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/sectors")
      .then((res) => res.json())
      .then(setSectors)
      .catch(console.log);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/enterprises")
      .then((res) => res.json())
      .then(setEnterprises)
      .catch(console.log);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/positions")
      .then((res) => res.json())
      .then(setPositions)
      .catch(console.log);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/turns")
      .then((res) => res.json())
      .then(setTurns)
      .catch(console.log);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/states")
      .then((res) => res.json())
      .then(setStates)
      .catch(console.log);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (isUploading) {
      alert("Aguarde o envio da imagem antes de salvar.");
      return;
    }
    handleSubmit(func);
  };

  const handleChange = (e) =>
    setFunc({ ...func, [e.target.name]: e.target.value });

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setRemoveLoading(false);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "meu_preset");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dymuksbru/image/upload",
        { method: "POST", body: data }
      );
      const fileData = await res.json();
      setFunc((prev) => ({ ...prev, photo: fileData.secure_url }));
      setPreview(fileData.secure_url);
    } catch (error) {
      console.error("Erro no upload:", error);
    } finally {
      setIsUploading(false);
      setRemoveLoading(true);
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10)
      value = value.replace(/(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    else if (value.length > 6)
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    else if (value.length > 2)
      value = value.replace(/(\d{2})(\d{0,4})/, "($1) $2");
    else value = value.replace(/(\d{0,2})/, "($1");

    setFunc({ ...func, fone: value });
  };

  const handleWageChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = (Number(value) / 100).toFixed(2) + "";
    value = value.replace(".", ",");
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setFunc({ ...func, wage: "R$ " + value });
  };

  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{8}).*/, "$1");
    value = value.replace(/(\d{5})(\d{3})/, "$1-$2");

    setFunc((prev) => ({ ...prev, cep: value }));

    if (value.replace(/\D/g, "").length === 8) {
      fetch(`https://viacep.com.br/ws/${value.replace(/\D/g, "")}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            const foundState = states.find((s) => s.abbreviation === data.uf);
            setFunc((prevFunc) => ({
              ...prevFunc,
              city: data.localidade || "",
              district: data.bairro || "",
              state: foundState
                ? { id: foundState.id, name: foundState.name }
                : { id: "", name: data.uf },
            }));
          }
        });
    }
  };

  // 🆕 NOVA FUNÇÃO – Preenche automaticamente os campos com API RandomUser
  const preencherAutomaticamente = async () => {
    try {
      const res = await fetch("https://randomuser.me/api/");
      const data = await res.json();
      const user = data.results[0];

      // Converter data de nascimento
      const birthDate = new Date(user.dob.date);
      const formattedDate = birthDate.toISOString().split("T")[0];

      // Montar novo objeto func
      const cep = String(user.location.postcode).replace(
        /(\d{5})(\d{3})/,
        "$1-$2"
      );

      const stateName = user.location.state || "";
      const foundState =
        states.find((s) =>
          s.name.toLowerCase().includes(stateName.toLowerCase())
        ) || {};

      setFunc((prev) => ({
        ...prev,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        fone: user.cell,
        date: formattedDate,
        gender:
          user.gender === "male"
            ? "Masculino"
            : user.gender === "female"
            ? "Feminino"
            : "Indefinido",
        cep: cep,
        city: user.location.city,
        district: user.location.street.name,
        state: { id: foundState.id || "", name: foundState.name || stateName },
        photo: user.picture.large,
      }));

      setPreview(user.picture.large);
    } catch (err) {
      console.error("Erro ao preencher automaticamente:", err);
      alert("Erro ao preencher os dados automáticos.");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="container  bg-light rounded shadow-sm"
      style={{ maxWidth: "700px" }}
    >
      <div className="text-center pb-5 d-flex justify-content-center gap-3">
        <button
          type="button"
          className="btn btn-outline-secondary px-4"
          onClick={preencherAutomaticamente}
        >
          Preencher com dados automáticos
        </button>
      </div>
      {/* Nome e Email */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Nome do Funcionário</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Insira o nome do funcionário"
            value={func.name || ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="exemplo@exemplo.com.br"
            value={func.email || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Telefone e Data de Nascimento */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Telefone</label>
          <input
            type="text"
            className="form-control"
            name="fone"
            placeholder="(xx) xxxxx-xxxx"
            value={func.fone || ""}
            onChange={handlePhoneChange}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Data de Nascimento</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={func.date || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Salário e CEP */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Salário</label>
          <input
            type="text"
            className="form-control"
            name="wage"
            placeholder="R$"
            value={func.wage || ""}
            onChange={handleWageChange}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">CEP</label>
          <input
            type="text"
            className="form-control"
            name="cep"
            placeholder="xxxxx-xxx"
            value={func.cep || ""}
            onChange={handleCepChange}
          />
        </div>
      </div>

      {/* Estado, Cidade, Bairro */}
      <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Estado</label>
          <select
            className="form-select"
            name="state_id"
            value={func.state?.id || ""}
            onChange={(e) =>
              setFunc({
                ...func,
                state: {
                  id: e.target.value,
                  name: e.target.options[e.target.selectedIndex].text,
                },
              })
            }
          >
            <option value="">Selecione o estado</option>
            {states.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Cidade</label>
          <input
            type="text"
            className="form-control"
            name="city"
            placeholder="Cidade"
            value={func.city || ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Bairro</label>
          <input
            type="text"
            className="form-control"
            name="district"
            placeholder="Bairro"
            value={func.district || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Gênero */}
      <div className="mb-3">
        <label className="form-label d-block">Gênero</label>
        {["Masculino", "Feminino", "Indefinido"].map((gender) => (
          <div className="form-check form-check-inline" key={gender}>
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value={gender}
              checked={func.gender === gender}
              onChange={handleChange}
            />
            <label className="form-check-label">{gender}</label>
          </div>
        ))}
      </div>

      {/* Empresa e Cargo */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Empresa</label>
          <select
            className="form-select"
            value={func.enterprise?.id || ""}
            onChange={(e) => {
              const empresaId = e.target.value;
              const empresaSelecionada = enterprises.find(
                (emp) => emp.id === empresaId
              );

              setFunc({
                ...func,
                enterprise: empresaSelecionada
                  ? { id: empresaSelecionada.id, name: empresaSelecionada.name }
                  : { id: "", name: "" },
                position: {},
              });

              setPositions(
                empresaSelecionada ? empresaSelecionada.positions : []
              );
            }}
          >
            <option value="">Selecione a empresa</option>
            {enterprises.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Cargo</label>
          <select
            className="form-select"
            value={func.position?.id || ""}
            onChange={(e) => {
              const posId = e.target.value;
              const posSelecionado = positions.find((p) => p.id === posId);

              setFunc({
                ...func,
                position: posSelecionado
                  ? { id: posSelecionado.id, name: posSelecionado.name }
                  : { id: "", name: "" },
              });
            }}
            disabled={!func.enterprise?.id}
          >
            <option value="">
              {func.enterprise?.id
                ? "Selecione o cargo"
                : "Selecione uma empresa primeiro"}
            </option>
            {positions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Foto e Botões */}
      <div className="mb-3 text-center">
        <label className="form-label d-block">Foto do Funcionário</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handlePhotoChange}
        />

        {!removeLoading ? (
          <Loading />
        ) : (
          preview && (
            <img
              src={preview}
              alt="Prévia"
              className="mt-3 rounded-circle border"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
          )
        )}
      </div>

      {/* Botões */}
      <div className="text-center mt-4 d-flex justify-content-center gap-3">
        <button type="submit" className="btn btn-outline-primary px-4">
          {btnText}
        </button>
      </div>
    </form>
  );
}

export default FuncForm;
