import { supabase } from "../services/supabase";
import UserForm from "../user/UserForm";
import { motion } from "framer-motion";

function NewUser({ onUserCreated }) {

  async function createPost(user) {
    user.type = "Padrão";

    try {
      const { data, error } = await supabase
        .from("users")
        .insert([user])
        .select();

      if (error) throw error;

      console.log("Usuário criado:", data);

      if (onUserCreated) onUserCreated(data[0]);

    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err.message);
      alert("Erro ao cadastrar usuário");
    }
  }

  return (
    <motion.div
      className="container py-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="text-center mb-3 text-primary fw-bold">Cadastre-se</h2>
        <UserForm handleSubmit={createPost} btnText="Cadastrar Usuário" />
      </div>
    </motion.div>
  );
}

export default NewUser;
