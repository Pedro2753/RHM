import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";



function Home() {
  return (
        <motion.div
      className="container d-flex flex-column justify-content-center align-items-center min-vh-100"
      initial={{ opacity: 0, y: 30 }}   // começa invisível e mais abaixo
      animate={{ opacity: 1, y: 0 }}    // aparece suavemente
      exit={{ opacity: 0, y: -30 }}     // sai suavemente para cima
      transition={{ duration: 0.5 }}    // meio segundo de transição
    >
    <section className="container py-5 text-center d-flex justify-content-between align-items-center">
      <div className="mb-4">
        <h1 className="display-4">
          Bem-vindo à <span className="text-primary">plataforma</span>
        </h1>
        <p className="lead">Comece a gerenciar os seus projetos agora mesmo!</p>
              <div className="mb-5">
        <Link to="/newfunc" className="btn btn-outline-primary btn-lg shadow-sm">
          Cadastrar funcionário
        </Link>
      </div>
      </div>



      <div className="d-flex justify-content-center ">
        <DotLottieReact
          src="https://lottie.host/5ba08188-0cda-42eb-ace6-51d29715f13f/rsZ8kNSLA3.lottie"
          loop
          autoplay
          style={{ width: "425px", height: "425px" }}
        />
      </div>
    </section>
    </motion.div>
  );
}

export default Home;
