import { useState } from "react";
import Loading from "../layout/Loading";
import RadioGroup from "../form/RadioGroup";
import SubmitButton from "../form/SubmitButton";

function UserForm({ handleSubmit, btnText, userData, getData}) {
  const [user, setUser] = useState(userData || {});
  const [preview, setPreview] = useState(null);
  const [removeLoading, setRemoveLoading] = useState(true);
  const [isPhotoLoading] = useState(false);

  let random_id = Math.floor(Math.random() * 10000000);

  async function submit(e) {
    e.preventDefault();
    if (!isValidEmail(user.email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }
    if (isPhotoLoading) {
      alert("Aguarde o envio da imagem antes de salvar.");
      return;
    }
    const exists = await checkEmailExists(user.email);
    if (exists) {
      alert("E-mail já cadastrado!");
      return;
    }
    if (user.password.length < 8) {
      alert("A senha deve ter 8 digitos ou mais");
      return;
    }
    handleSubmit(user);
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
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
      setUser((prev) => ({ ...prev, photo: fileData.secure_url }));
      setPreview(fileData.secure_url);
    } catch (error) {
      console.error("Erro no upload:", error);
    } finally {
      setRemoveLoading(true);
    }
  }

  function handlePhoneChange(e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) value = value.replace(/(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    else if (value.length > 6) value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    else if (value.length > 2) value = value.replace(/(\d{2})(\d{0,4})/, "($1) $2");
    else value = value.replace(/(\d{0,2})/, "($1");
    setUser({ ...user, fone: value });
  }

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  async function checkEmailExists(email) {
    const res = await fetch(`http://localhost:5000/users?email=${email}`);
    const data = await res.json();
    return data.length > 0;
  }

  return (
    <form onSubmit={submit} className="needs-validation" noValidate>
      {/* ID */}
      <div className="mb-3">
        <label htmlFor="func_id" className="form-label">ID do colaborador</label>
        <input type="text" className="form-control" name="func_id" value={random_id} disabled />
      </div>

      <div className="mb-3">
        <label className="form-label">Privilégios do Colaborador: Padrão</label>
      </div>

      {/* Nome */}
      <div className="mb-3">
        <label className="form-label">Nome do funcionário</label>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Insira o nome do usuário"
          onChange={handleChange}
          value={user.name || ""}
        />
      </div>

      {/* E-mail */}
      <div className="mb-3">
        <label className="form-label">E-mail</label>
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="exemplo@exemplo.com.br"
          onChange={handleChange}
          value={user.email || ""}
        />
      </div>

      {/* Senha */}
      <div className="mb-3">
        <label className="form-label">Senha</label>
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="(Mínimo 8 dígitos)"
          onChange={handleChange}
          value={user.password || ""}
        />
      </div>

      {/* Telefone */}
      <div className="mb-3">
        <label className="form-label">Telefone</label>
        <input
          type="text"
          className="form-control"
          name="fone"
          placeholder="(xx) xxxxx-xxxx"
          onChange={handlePhoneChange}
          value={user.fone || ""}
        />
      </div>

      {/* Gênero */}
      <div className="mb-3">
        <RadioGroup
          name="gender"
          text="Gênero"
          options={[
            { label: " Masculino", value: "Masculino" },
            { label: " Feminino", value: "Feminino" },
            { label: " Prefiro não dizer", value: "Indefinido" },
          ]}
          handleOnChange={handleChange}
          value={user.gender || ""}
        />
      </div>

      {/* Foto */}
      <div className="mb-3">
        <label className="form-label">Foto de Usuário</label>
        <input type="file" accept="image/*" className="form-control" onChange={handlePhotoChange} />
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

export default UserForm;
