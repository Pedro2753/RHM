import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Contact() {
  return (
    <motion.div
      className="container py-4"
      initial={{ opacity: 0, y: 30 }} // começa invisível e mais abaixo
      animate={{ opacity: 1, y: 0 }} // aparece suavemente
      exit={{ opacity: 0, y: -30 }} // sai suavemente para cima
      transition={{ duration: 0.5 }} // meio segundo de transição
    >
      <section className="container py-5 ">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="display-5">
              <span className="text-primary">Sobre</span>
            </h1>
            <p className="lead">
              RH Manger é um software web feito como um projeto pessoal que
              utiliza como base as tecnologias React, Boostrap e JSON server
              como metodo de armazenamento, o que faz todos os dados cadastrados
              serem armazenados localmente no navegador e não em um servidor na
              nuvem.
            </p>
            <p className="fs-5">Acesse o codigo fonte para mais detalhes:</p>
            <div className="mb-5">
              <Link
                to="/newfunc"
                className="btn btn-outline-primary btn-lg shadow-sm"
              >
                Codigo fonte
              </Link>
            </div>
             <p className="fs-4">Minhas redes:</p>
        <div className="d-flex gap-2">
          <a href="https://www.linkedin.com/in/pedrohmf-21a166164/">
            <button className="btn btn-outline-primary btn-lg">
              <i className="bi bi-linkedin me-2 "></i>Linkedin
            </button>
          </a>
          <a href="https://github.com/Pedro2753">
            <button className="btn btn-outline-primary btn-lg">
              <i className="bi bi-github me-2"></i> GitHub
            </button>
          </a>
          <a href="https://wa.me/5521981744994">
            <button className="btn btn-outline-primary btn-lg">
              <i className="bi bi-whatsapp me-2"></i> Whastapp
            </button>
          </a>
          <a href="https://www.instagram.com/pedro13th_/">
            <button className="btn btn-outline-primary btn-lg">
              <i className="bi bi-instagram me-2"></i> Instagram
            </button>
          </a>
        </div>
          </div>
          <div>
            <img
              style={{
                width: "400px",
                height: "400px",
                objectFit: "cover",
              }}
              src="src\assets\img\github-logo.png"
            ></img>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default Contact;
