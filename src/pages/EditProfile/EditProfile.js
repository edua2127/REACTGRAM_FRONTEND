import "./EditProfile.css";

// HOOKS
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// UTILLS
import { uploads } from "../../utils/config";

// REDUX
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

// COMPONENTS
import Message from "../../components/Message/Message";

const EditProfile = () => {

  const dispatch = useDispatch();

  const { user, loading, error, message } = useSelector(state => state.user);

  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // Fill the form with user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  console.log(user)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name
    }

    if (profileImage) {
      user.profileImage = profileImage;
    }

    if (bio) {
      user.bio = bio;
    }

    if (password) {
      user.password = password;
    }

    // build form data
    const formData = new FormData();

    const userFormData = Object.keys(user).forEach(key => {
      formData.append(key, user[key]);
    });

    formData.append("user", userFormData);

    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);
  }

  const handleFile = (e) => {
    // image preview
    const image = e.target.files[0];
    setPreviewImage(image)
    setProfileImage(image);
  }
  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle"> Adicione uma imagem de perfil e conte mais sobre você</p>
      {(user.profileImage || previewImage) && (
        <img className="profile-image"
          src={previewImage ? URL.createObjectURL(previewImage) : `${uploads}/users/${user.profileImage}`} alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome"
          value={name || ""} onChange={(e) => setName(e.target.value)}
        />
        <input type="text" placeholder="E-mail" disabled
          value={email || ""} onChange={(e) => setEmail(e.target.value)}
        />
        <label>
          <span>Imagem do Perfil</span>
          <input type="file"
            onChange={handleFile}
          />
        </label>
        <label>
          <span>Bio:</span>
          <input type="text" placeholder="Descrição do perfil"
            value={bio || ""} onChange={(e) => setBio(e.target.value)}
          />
        </label>
        <label>
          <span>Quer alterar a senha?</span>
          <input type="password" placeholder="Digite a nova senha"
            value={password || ""} onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {loading && <input type="submit" value="Aguarde" disabled />}
        {!loading && <input type="submit" value="atualizar" />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  )
}

export default EditProfile