import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AnimatePresence } from "framer-motion";

import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import NewFunc from "./components/pages/NewFunc";
import NewEnter from "./components/pages/NewEnter";
import Navbar from "./components/layout/Navbar";
import Container from "./components/layout/Container";
import Funcionarios from "./components/pages/Funcionarios";
import Enterprises from "./components/pages/Enterprises";
import Func from "./components/pages/Func";
import Footer from "./components/layout/Footer";
import Login from "./components/login/Login";
import NewUser from "./components/pages/NewUser";
import Users from "./components/pages/Users";
import User from "./components/pages/User";
import Enter from "./components/pages/Enter";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#f50057" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />

        <Container customClass="min-height">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/funcionarios" element={<Funcionarios />} />
              <Route path="/users" element={<Users />} />
              <Route path="/enterprises" element={<Enterprises />} />
              <Route path="/newfunc" element={<NewFunc />} />
              <Route path="/newuser" element={<NewUser />} />
              <Route path="/newenter" element={<NewEnter />} />
              <Route path="/login" element={<Login />} />
              <Route path="/func/:id" element={<Func />} />
              <Route path="/user/:id" element={<User />} />
              <Route path="/enter/:id" element={<Enter />} />
            </Routes>
          </AnimatePresence>
        </Container>

        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;

