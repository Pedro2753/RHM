import { useNavigate } from "react-router-dom";
import FuncForm from "../func/FuncForm";
import { motion } from "framer-motion";


function NewFunc() {
  const navigate = useNavigate();

  async function createPost(func) {
    func.experiences = [];
    func.educations = [];

    try {
      const resp = await fetch("http://localhost:5000/funcionarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(func),
      });

      const data = await resp.json();
      console.log("Funcionário criado:", data);

      // Redireciona com mensagem
      navigate("/funcionarios", { state: { message: "Funcionário cadastrado com sucesso!" } });
    } catch (err) {
      console.error("Erro ao cadastrar funcionário:", err);
    }
  }

  return (
            <motion.div
              className="container py-4"
              initial={{ opacity: 0, y: 30 }}   // começa invisível e mais abaixo
              animate={{ opacity: 1, y: 0 }}    // aparece suavemente
              exit={{ opacity: 0, y: -30 }}     // sai suavemente para cima
              transition={{ duration: 0.5 }}    // meio segundo de transição
            >
    <div className="container py-5">
      <div className="card shadow-lg border-0 p-4 mx-auto" style={{ maxWidth: "800px" }}>
        <div className="text-center mb-4">
          <h1 className="text-primary">Cadastrar Funcionário</h1>
          <p className="text-muted">
            Preencha os campos abaixo para adicionar um novo funcionário à base.
          </p>
        </div>
        <FuncForm handleSubmit={createPost} btnText="Cadastrar Funcionário" />
      </div>
    </div>
    </motion.div>
  );
}

export default NewFunc;
