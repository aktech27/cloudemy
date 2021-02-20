import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { userTypeContext } from "../context/userType";
import { blurSignin } from "../assets/customCSS/signAnim";
import { emailValidator } from "../assets/validators";
import axios from "axios";
import "../assets/customCSS/signin.css";
import Logo from "../assets/appLogo.png";
import ShowToast from "../assets/toast";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setType] = useContext(userTypeContext);
  const History = useHistory();

  const Login = (e) => {
    e.preventDefault();
    emailValidator(email);
    let request = { email: email, password: password };
    axios
      .post("/login", request)
      .then((res) => {
        console.log(res.data.message);
        setType("Admin");
        localStorage.setItem("Token", res.data.token);
        localStorage.setItem("User", JSON.stringify(res.data.user));
        History.push("/");
        window.location.reload();
        ShowToast(res.data.message, "green");
      })
      .catch((err) => {
        console.log(err.response.data.error);
        ShowToast(err.response.data.error, "red");
      });
  };

  return (
    <div className="container">
      <form style={{ width: "500px" }} onSubmit={(e) => Login(e)}>
        <fieldset style={{ border: "5px double black", borderRadius: "40px 20px" }}>
          <legend
            style={{ textAlign: "center", fontFamily: "'Cairo',san-serif", fontSize: "38px" }}
          >
            Sign-In
          </legend>
          <div className="input-container">
            <div className="image-container" style={{ height: "250px", width: "250px" }}>
              <img src={Logo} alt="Logo" />
            </div>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => blurSignin("ph-mail", email)}
            />
            <span className="placeholder ph-mail">Email Id</span>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => blurSignin("ph-psd", password)}
            />
            <span className="placeholder ph-psd">Password</span>
            <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
              <h3>
                <Link to="/signup">Not a user ?</Link>
              </h3>
              <h3>
                <Link to="/sd">Forgot Password ?</Link>
              </h3>
            </div>
            <input type="submit" />
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Signin;
