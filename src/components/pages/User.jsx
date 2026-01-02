
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Loading from "../layout/Loading";
import UserForm from "../user/UserForm";
import UserDesc from "../user/UserDesc";
import { motion } from "framer-motion";

function User() {
  const { id } = useParams();

  const [user, setUser] = useState({});
  const [showUserForm, setShowUserForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/users/${id}`)
        .then((resp) => resp.json())
        .then((data) => setUser(data))
        .catch(console.log);
    }, 1000);
  }, [id]);

  function editPost(user) {
    fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setShowUserForm(false);
        setMessage("Usuário atualizado");
        setType("success");
      })
      .catch(console.log);
  }

  function toggleUserForm() {
    setShowUserForm(!showUserForm);
  }

  return (
  <motion.div
              className="container py-4"
              initial={{ opacity: 0, y: 30 }}   // começa invisível e mais abaixo
              animate={{ opacity: 1, y: 0 }}    // aparece suavemente
              exit={{ opacity: 0, y: -30 }}     // sai suavemente para cima
              transition={{ duration: 0.5 }}    // meio segundo de transição
            >
    <div className="container my-4">
      {user.name ? (
        <div className="card shadow-sm p-4">
          {message && (
            <div
              className={`alert ${
                type === "success" ? "alert-success" : "alert-danger"
              }`}
              role="alert"
            >
              {message}
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="text-primary section-title">{user.name}</h2>
            <button
              className={`btn ${showUserForm ?"btn-secondary" : "btn-outline-primary" }`}
              onClick={toggleUserForm}
            >
              {showUserForm ? "Fechar" : "Editar Usuário"}
            </button>
          </div>

          <div>
            {!showUserForm ? (
              <UserDesc
                name={user.name}
                password={user.password}
                photo={user.photo}
                email={user.email}
                fone={user.fone}
                gender={user.gender}
                type={user.type}
              />
            ) : (
              <UserForm handleSubmit={editPost} btnText="Concluir edição" userData={user} />
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
    </motion.div>
  );
}

export default User;
