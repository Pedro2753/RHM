import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import RadioGroup from "../form/RadioGroup";
import SubmitButton from "../form/SubmitButton";

function EnterpriseForm({ handleSubmit, btnText, enterpriseData, getData }) {
   const [sectors, setSectors] = useState([]);
  const [enterprise, setEnterprise] = useState(enterpriseData || {});
  const [states, setStates] = useState([]);

  const [preview, setPreview] = useState(null);
  const [removeLoading, setRemoveLoading] = useState(true);
  const [isPhotoLoading] = useState(false);

  let random_id = Math.floor(Math.random() * 10000000);

  useEffect(() => {
    fetch("http://localhost:5000/states")
      .then((res) => res.json())
      .then(setStates)
      .catch(console.log);
  }, []);

    useEffect(() => {
    fetch("http://localhost:5000/sectors")
      .then((res) => res.json())
      .then(setSectors)
      .catch(console.log);
  }, []);


  async function submit(e) {
    e.preventDefault();

    if (isPhotoLoading) {
      alert("Aguarde o envio da imagem antes de salvar.");
      return;
    }


    handleSubmit(enterprise);
  }

  function handleChange(e) {
    setEnterprise({ ...enterprise, [e.target.name]: e.target.value });
  }

  async function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;

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
      setEnterprise((prev) => ({ ...prev, photo: fileData.secure_url }));
      setPreview(fileData.secure_url);
    } catch (error) {
      console.error("Erro no upload:", error);
    } finally {
      setRemoveLoading(true);
    }
  }

  function handlePhoneChange(e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10)
      value = value.replace(/(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    else if (value.length > 6)
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    else if (value.length > 2)
      value = value.replace(/(\d{2})(\d{0,4})/, "($1) $2");
    else value = value.replace(/(\d{0,2})/, "($1");
    setEnterprise({ ...enterprise, fone: value });
  }


  const handleWageChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = (Number(value) / 100).toFixed(2) + "";
    value = value.replace(".", ",");
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setEnterprise({ ...enterprise, capital: "R$ " + value });
  };

  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{8}).*/, "$1");
    value = value.replace(/(\d{5})(\d{3})/, "$1-$2");

    setEnterprise((prev) => ({ ...prev, cep: value }));

    if (value.replace(/\D/g, "").length === 8) {
      fetch(`https://viacep.com.br/ws/${value.replace(/\D/g, "")}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            const foundState = states.find((s) => s.abbreviation === data.uf);
            setEnterprise((prevEnterprise) => ({
              ...prevEnterprise,
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

  return (
    <form onSubmit={submit} className="needs-validation" noValidate>
      {/* ID */}
      <div className="mb-3">
        <label htmlFor="enter_id" className="form-label">
          CNPJ da Empresa
        </label>
        <input
          type="text"
          className="form-control"
          name="enter_id"
          value="xx.xxx.xxx"
          disabled
        />
      </div>

      {/* Nome e Email */}
      <div className="row">
        <div className="mb-3">
          <label className="form-label">Nome da empresa:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Nome da empresa"
            onChange={handleChange}
            value={enterprise.name || ""}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Razão Social:</label>
          <input
            type="text"
            className="form-control"
            name="razao"
            placeholder="Razão Social"
            onChange={handleChange}
            value={enterprise.razao || ""}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">E-mail da empresa</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="exemplo@exemplo.com.br"
            onChange={handleChange}
            value={enterprise.email || ""}
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
            value={enterprise.fone || ""}
            onChange={handlePhoneChange}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Data de Abertura</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={enterprise.date || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* MEI */}
      <div className="mb-3">
        <RadioGroup
          name="mei"
          text="Opção pelo MEI"
          options={[
            { label: " Sim", value: "Sim" },
            { label: " Não", value: "Não" },
          ]}
          handleOnChange={handleChange}
          value={enterprise.mei || ""}
        />
      </div>

      {/* Capital e CEP */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Capital Social:</label>
          <input
            type="text"
            className="form-control"
            name="capital"
            placeholder="R$1.000.000,00"
            value={enterprise.capital || ""}
            onChange={handleWageChange}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">CEP</label>
          <input
            type="text"
            className="form-control"
            name="cep da"
            placeholder="xxxxx-xxx"
            value={enterprise.cep || ""}
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
            value={enterprise.state?.id || ""}
            onChange={(e) =>
              setFunc({
                ...enterprise,
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
            value={enterprise.city || ""}
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
            value={enterprise.district || ""}
            onChange={handleChange}
          />
        </div>
      </div>
           <div className="row">
        <div className="col-md-4 mb-3">
          <label className="form-label">Setor</label>
          <select
            className="form-select"
            value={enterprise.sector?.id || ""}
            onChange={(e) =>
              setEnterprise({
                ...enterprise,
                sector: {
                  id: e.target.value,
                  name: e.target.options[e.target.selectedIndex].text,
                },
              })
            }
          >
            <option value="">Selecione o setor:</option>
            {sectors.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
         <div className="mb-3">
        <label className="form-label d-block">Status:</label>
        {["Ativa", "Inativa"].map((status) => (
          <div className="form-check form-check-inline" key={status}>
            <input
              className="form-check-input"
              type="radio"
              name="status"
              value={status}
              checked={enterprise.status === status}
              onChange={handleChange}
            />
            <label className="form-check-label">{status}</label>
          </div>
        ))}
      </div>
          </div>  

      {/* Foto */}
      <div className="mb-3">
        <label className="form-label">Logo da empresa</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handlePhotoChange}
        />
        {!removeLoading ? (
          <Loading />
        ) : (
          preview && (
            <img
              src={preview}
              alt="Prévia"
              className="rounded-circle mt-2"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
          )
        )}
      </div>

      <SubmitButton text={btnText} />
    </form>
  );
}

export default EnterpriseForm;
