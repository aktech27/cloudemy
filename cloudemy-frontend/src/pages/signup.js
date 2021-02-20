import { useState } from "react";
import axios from "axios";
import "../assets/customCSS/signup.css";
import Logo from "../assets/appLogo.png";
import InputTag from "../components/inputTag";
import { inputFocused } from "../assets/customCSS/signAnim";
import {
  nameValidator,
  emailValidator,
  phoneValidator,
  cPasswordValidator,
  passwordValidator,
} from "../assets/validators";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const Register = (e) => {
    e.preventDefault();
    if (nameValidator(firstName) !== "Valid") {
      document.getElementsByTagName("input")[0].focus();
      inputFocused("ph-fname", firstName);
    } else if (nameValidator(lastName) !== "Valid") {
      document.getElementsByTagName("input")[1].focus();
      inputFocused("ph-lname", lastName);
    } else if (emailValidator(email) !== "Valid") {
      document.getElementsByTagName("input")[2].focus();
      inputFocused("ph-email", email);
    } else if (phoneValidator(phone) !== "Valid") {
      document.getElementsByTagName("input")[3].focus();
      inputFocused("ph-phone", phone);
    } else if (
      !passwordValidator(password).every(
        (value) => value === `<span style="color:lime;font-size:20px">✔ </span>`
      )
    ) {
      document.getElementsByTagName("input")[4].focus();
      inputFocused("ph-pswd", password);
    } else if (cPasswordValidator(confirmPassword) !== "Valid") {
      document.getElementsByTagName("input")[5].focus();
      inputFocused("ph-cpswd", confirmPassword);
    } else {
      let request = { firstName, lastName, email, password, phone };
      axios
        .post("/register", request)
        .then((res) => console.log(res.data))
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="container">
      <form style={{ width: "800px" }} onSubmit={(e) => Register(e)}>
        <fieldset style={{ border: "5px double black", borderRadius: "40px 20px" }}>
          <legend
            style={{ textAlign: "center", fontFamily: "'Cairo',san-serif", fontSize: "38px" }}
          >
            Sign-Up
          </legend>
          <div className="input-container">
            <div className="image-container" style={{ height: "150px", width: "150px" }}>
              <img src={Logo} alt="Logo" />
            </div>
            <InputTag
              types={["text", "text"]}
              setStates={[setFirstName, setLastName]}
              states={[firstName, lastName]}
              placeholders={["First Name", "Last Name"]}
              classNames={["ph-fname", "ph-lname"]}
            />
            <InputTag
              types={["text", "text"]}
              setStates={[setEmail, setPhone]}
              states={[email, phone]}
              placeholders={["Email", "Phone"]}
              classNames={["ph-email", "ph-phone"]}
            />
            <InputTag
              types={["password", "password"]}
              setStates={[setPassword, setConfirmPassword]}
              states={[password, confirmPassword]}
              placeholders={["Password", "Confirm Password"]}
              classNames={["ph-pswd", "ph-cpswd"]}
            />
            <input type="submit" />
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Signup;
