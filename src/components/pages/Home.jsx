import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Home() {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);

  // Hora atual
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Clima (Open-Meteo – sem API key)
  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&current_weather=true"
    )
      .then((resp) => resp.json())
      .then((data) => setWeather(data.current_weather))
      .catch((err) => console.log(err));
  }, []);

  return (
    <motion.div
      className="container d-flex flex-column justify-content-center align-items-center min-vh-100"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      {/* TOPO: Hora e Clima */}
      <div className="w-100 d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        {/* Hora */}
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-clock-history fs-4 text-primary"></i>
          <div>
            <small className="text-muted d-block">Hora atual</small>
            <strong>{time.toLocaleTimeString("pt-BR")}</strong>
          </div>
        </div>

        {/* Clima */}
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-cloud-sun fs-4 text-warning"></i>
          <div className="text-end">
            <small className="text-muted d-block">Clima</small>
            {weather ? (
              <strong>
                São Paulo • {Math.round(weather.temperature)}°C
              </strong>
            ) : (
              <span className="text-muted">Carregando...</span>
            )}
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <section className="container py-5 text-center d-flex justify-content-between align-items-center">
        <div className="mb-4">
          <h1 className="display-4">
            Bem-vindo à <span className="text-primary">plataforma</span>
          </h1>
          <p className="lead">
            Comece a gerenciar agora mesmo!
          </p>

          <div className="mb-5">
            <Link
              to="/newfunc"
              className="btn btn-outline-primary btn-lg shadow-sm"
            >
              Cadastrar funcionário
            </Link>
          </div>
        </div>

        <div className="d-flex justify-content-center">
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
