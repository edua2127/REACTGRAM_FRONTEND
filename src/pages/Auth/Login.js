import "./Auth.css"

// COMPONENTS
import { Link } from "react-router-dom"
import Message from "../../components/Message/Message"

// HOOKS
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">Faça login para ver o que há de novo</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="E-mail"
          value={email || ""} onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password" placeholder="Senha"
          value={password || ""} onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      <p>Não tem uma conta? <Link to={"/register"}>Clique aqui</Link></p>
    </div>
  )
}

export default Login