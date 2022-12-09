import { Button } from "@mui/material"
import { useContext, useState } from "react"
import "./login.scss"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Constant from "../../enum/Constant";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {

  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext)

  const onClickLoginForm = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("user", user);
        dispatch({ type: Constant.Login, payload: user });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  }

  return (
    <div className="login-container-box">
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <div className="user-box">
              <input type="text" name="name" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <label>Password</label>
            </div>
            <Button onClick={onClickLoginForm}>
              Đăng nhập
            </Button>
          </form>
          {
            error ? <span>Tài khoản hoặc mật khẩu không đúng</span> : null
          }
        </div>
      </div>
    </div>
  )
}

export default Login