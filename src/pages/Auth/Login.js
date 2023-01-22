import "./Auth.css"

// COMPONENTS
import { Link } from "react-router-dom"
import Message from "../../components/Message/Message"

// HOOKS
import { useState, useEffect } from "react";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../slices/authSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);


  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password
    }
    dispatch(login(user));
  }

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

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
        {loading && <input type="submit" value="Aguarde" disabled />}
        {!loading && <input type="submit" value="Login" />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>Não tem uma conta? <Link to={"/register"}>Clique aqui</Link></p>
    </div>
  )
}

export default Login