import "./Auth.css";


// COMPONENTS
import { Link } from "react-router-dom";

// HOOKS
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// REDUX
import { register, reset } from "../../slices/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.auth);

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
      confirmPassword
    }
    console.log(user);
    dispatch(register(user));
  }


  // Reset the auth state
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome"
          value={name || ""} onChange={e => setName(e.target.value)}
        />
        <input type="text" placeholder="E-mail"
          value={email || ""} onChange={e => setEmail(e.target.value)}
        />
        <input type="password" placeholder="Senha"
          value={password || ""} onChange={e => setPassword(e.target.value)}
        />
        <input type="text" placeholder="Confirmar senha"
          value={confirmPassword || ""} onChange={e => setConfirmPassword(e.target.value)}
        />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>Já tem conta? <Link to={"/login"}>Click aqui.</Link></p>
    </div>
  )
}

export default Register