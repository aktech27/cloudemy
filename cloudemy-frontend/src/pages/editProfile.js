import "../assets/customCSS/editpage.css";
import { useState } from "react";
import { nameValidator, phoneValidator } from "../assets/validators";

const EditProfile = () => {
  const [fname, setFname] = useState(JSON.parse(localStorage.getItem("User")).firstName);
  const [lname, setLname] = useState(JSON.parse(localStorage.getItem("User")).lastName);
  const [phone, setPhone] = useState(JSON.parse(localStorage.getItem("User")).phone);
  const [fnameTT, setFnameTT] = useState("nuull");
  const [lnameTT, setLnameTT] = useState("nuull");
  const [phoneTT, setPhoneTT] = useState("nuull");
  const [fnameFocussed, setfnameFocussed] = useState(false);
  const [lnameFocussed, setlnameFocussed] = useState(false);
  const [phoneFocussed, setphoneFocussed] = useState(false);

  const handleChange = (value, num) => {
    if (num === 1) {
      setFnameTT(nameValidator(value));
      setFname(value);
    } else if (num === 2) {
      setLnameTT(nameValidator(value));
      setLname(value);
    } else {
      setPhoneTT(phoneValidator(value));
      setPhone(value);
    }
  };

  const showTooltip = (num) => {
    if (num === 1) {
      if (fnameTT !== "Valid" && fnameTT !== "nuull" && fnameFocussed) {
        return (
          <span className="tooltip">
            <span style={{ color: "red", fontSize: "20px" }}>✘ </span>
            {fnameTT}
          </span>
        );
      }
    } else if (num === 2) {
      if (lnameTT !== "Valid" && lnameTT !== "nuull" && lnameFocussed) {
        return (
          <span className="tooltip">
            <span style={{ color: "red", fontSize: "20px" }}>✘ </span>
            {lnameTT}
          </span>
        );
      }
    } else if (num === 3) {
      if (phoneTT !== "Valid" && phoneTT !== "nuull" && phoneFocussed) {
        if (phoneTT.slice(0, 5) === "Code:") {
          return (
            <span className="tooltip">
              <span style={{ color: "lime", fontSize: "20px" }}>✔ </span>
              {phoneTT.slice(5)}
            </span>
          );
        } else {
          return (
            <span className="tooltip">
              <span style={{ color: "red", fontSize: "20px" }}>✘ </span>
              {phoneTT}
            </span>
          );
        }
      }
    }
  };

  return (
    <div>
      <form style={{ width: "500px" }}>
        <fieldset style={{ border: "5px double black", borderRadius: "40px 20px" }}>
          <legend
            style={{ textAlign: "center", fontFamily: "'Cairo',san-serif", fontSize: "38px" }}
          >
            Edit Profile
          </legend>
          <div className="input-container">
            <div className="image-container" style={{ height: "100px", width: "100px" }}>
              <img
                src={JSON.parse(localStorage.getItem("User")).photo}
                alt="Logo"
                style={{ borderRadius: "50%", border: "2px solid black" }}
              />
            </div>
            <div>
              <fieldset className="edit-fieldset">
                <legend>First Name</legend>
                <input
                  className="edit-input"
                  value={fname}
                  onChange={(e) => handleChange(e.target.value, 1)}
                  onFocus={() => setfnameFocussed(true)}
                  onBlur={() => setfnameFocussed(false)}
                />
              </fieldset>
              {showTooltip(1)}
            </div>
            <div>
              <fieldset className="edit-fieldset">
                <legend>Last Name</legend>
                <input
                  className="edit-input"
                  value={lname}
                  onChange={(e) => handleChange(e.target.value, 2)}
                  onFocus={() => setlnameFocussed(true)}
                  onBlur={() => setlnameFocussed(false)}
                />
              </fieldset>
              {showTooltip(2)}
            </div>
            <div>
              <fieldset className="edit-fieldset">
                <legend>Phone</legend>
                <input
                  className="edit-input"
                  value={phone}
                  onChange={(e) => handleChange(e.target.value, 3)}
                  onFocus={() => setphoneFocussed(true)}
                  onBlur={() => setphoneFocussed(false)}
                />
              </fieldset>
              {showTooltip(3)}
            </div>
            <input type="submit" value="Update" />
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default EditProfile;
