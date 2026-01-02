import UserForm from "../user/UserForm";
import { motion } from "framer-motion";



function NewUser( {onUserCreated} ) {

  async function createPost(user) {
    user.type = "Padrão";
    try {
      const resp = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await resp.json();
      console.log("Usuário criado:", data);
      if (onUserCreated) onUserCreated(user);
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
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
    <div>
      <h2 className="text-center mb-3 text-primary fw-bold">Cadastre-se</h2>
      <UserForm handleSubmit={createPost}  btnText="Cadastrar Usuário" />
    </div>
    </motion.div>
  );
}

export default NewUser;
