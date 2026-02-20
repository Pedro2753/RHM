import loading from "../../assets/img/loading.svg";
import styles from "./Loading.module.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Loading() {
  return (
    <div className={styles.loader_container}>
      <DotLottieReact
        src="https://lottie.host/7977e9ee-c60b-4ec0-b7fd-49b193cc5d21/TSOXfsc4pg.lottie"
        loop
        autoplay
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
}

export default Loading;
