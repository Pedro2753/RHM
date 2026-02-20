import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import LinkButton from "../layout/LinkButton";
import UserCard from "../user/UserCard";
import { motion } from "framer-motion";
import { supabase } from "../services/supabase";

function Users() {
  const [users, setUsers] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const message = location.state?.message || "";

  // 🔹 Buscar usuários
  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase
        .from("users")
        .select("*");

      if (error) {
        console.error("Erro ao buscar usuários:", error);
      } else {
        setUsers(data);
      }

      setRemoveLoading(true);
    }

    fetchUsers();
  }, []);

  // 🔹 Remover usuário
  async function removeFunc(id) {
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Erro ao remover:", error);
      return;
    }

    setUsers(users.filter((user) => user.id !== id));
    setUserMessage("Usuário removido com sucesso!");
    setTimeout(() => setUserMessage(""), 2000);
  }

  // 🔹 Remover todos
  async function removeAllUsers() {
    if (!window.confirm("Tem certeza que deseja remover TODOS os usuários?")) {
      return;
    }

    setRemoveLoading(false);

    const { error } = await supabase
      .from("users")
      .delete()
      .neq("id", 0); // remove todos

    if (error) {
      console.error("Erro ao remover todos:", error);
      setRemoveLoading(true);
      return;
    }

    setUsers([]);
    setUserMessage("Todos os usuários foram removidos!");
    setTimeout(() => setUserMessage(""), 3000);
    setRemoveLoading(true);
  }

  // 🔍 Filtro
  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="container py-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container my-4">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          <h1 className="text-primary section-title mb-0">Usuários</h1>

          <div className="d-flex align-items-center gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar usuário..."
              style={{ maxWidth: "250px" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <LinkButton to="/newuser" text="Cadastrar Usuário" />

            <button
              className="btn btn-danger"
              onClick={removeAllUsers}
              disabled={users.length === 0}
            >
              Limpar Usuários
            </button>
          </div>
        </div>

        {message && (
          <div className="alert alert-success text-center">
            {message}
          </div>
        )}

        {userMessage && (
          <div className="alert alert-success text-center">
            {userMessage}
          </div>
        )}

        <div className="row g-3">
          {filteredUsers.length > 0 &&
            filteredUsers.map((user) => (
              <div key={user.id} className="col-md-4">
                <UserCard
                  id={user.id}
                  type={user.type}
                  name={user.name}
                  photo={user.photo}
                  gender={user.gender}
                  email={user.email}
                  fone={user.fone}
                  handleRemove={removeFunc}
                />
              </div>
            ))}

          {!removeLoading && (
            <div className="text-center py-5">
              <Loading />
            </div>
          )}

          {removeLoading && filteredUsers.length === 0 && (
            <p className="text-center text-muted">
              Nenhum usuário encontrado!
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Users;