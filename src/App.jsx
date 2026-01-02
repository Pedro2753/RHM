import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AnimatePresence } from "framer-motion";

import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import NewFunc from "./components/pages/NewFunc";
import NewEnter from "./components/pages/NewEnter"
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
import Enter from "./components/pages/Enter"

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#f50057" },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Container customClass="min-height">
            <AnimatePresence mode="wait">
              <Routes>
                <Route element={<Home />} exact path="/" />
                <Route element={<Contact />} exact path="/contact" />
                <Route element={<Funcionarios />} exact path="/funcionarios" />
                <Route element={<Users />} exact path="/users" />
                <Route element={<Enterprises />} exact path="/enterprises" />
                <Route element={<NewFunc />} exact path="/newfunc" />
                <Route element={<NewUser />} exact path="/newuser" />
                <Route element={<NewEnter />} exact path="/newenter" />
                <Route element={<Login />} path="/login" />
                <Route element={<Func />} path="/func/:id" />
                <Route element={<User />} path="/user/:id" />
                <Route element={<Enter />} path="/enter/:id" />
              </Routes>
            </AnimatePresence>
          </Container>
          <Footer />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
