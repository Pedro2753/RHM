import EnterForm from "../enter/EnterForm";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function NewEnter({ onUserCreated }) {
    const navigate = useNavigate();



  async function createPost(enterprise) {
    enterprise.positions = [];
    try {
      const resp = await fetch("http://localhost:5000/enterprises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enterprise),
      });
      const data = await resp.json();
      console.log("Empresa Registrada:", data);
      navigate("/enterprises", {
        state: { message: "Empresa registrada com sucesso!" },
      });
    } catch (err) {
      console.error("Erro ao registrar empresa.", err);
    }
  }

  return (
    <motion.div
      className="container py-4"
      initial={{ opacity: 0, y: 30 }} // começa invisível e mais abaixo
      animate={{ opacity: 1, y: 0 }} // aparece suavemente
      exit={{ opacity: 0, y: -30 }} // sai suavemente para cima
      transition={{ duration: 0.5 }} // meio segundo de transição
    >
      <div>
        <h2 className="text-center mb-3 text-primary fw-bold">
          Cadastrar Empresa
        </h2>
        <EnterForm handleSubmit={createPost} btnText="Registrar Empresa" />
      </div>
    </motion.div>
  );
}

export default NewEnter;
