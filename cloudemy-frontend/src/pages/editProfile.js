import "../assets/customCSS/editpage.css";
import { useState } from "react";
import { nameValidator } from "../assets/validators";
import Tooltip from "../components/tooltip";
const EditProfile = () => {
  const [tooltipText, setTooltipText] = useState("");
  const handleChange = (value) => {
    setTooltipText(nameValidator(value));
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
                src="https://res.cloudinary.com/aktech27/image/upload/v1613753834/cloudemy/profilepics/defaultpic.png"
                alt="Logo"
                style={{ borderRadius: "50%", border: "2px solid black" }}
              />
            </div>
            <div>
              <fieldset className="edit-fieldset">
                <legend>First Name</legend>
                <input className="edit-input" onChange={(e) => handleChange(e.target.value)} />
              </fieldset>
              <Tooltip classNames="ph-fname" Visibility="visible" />
            </div>
            <div>
              <fieldset className="edit-fieldset">
                <legend>Last Name</legend>
                <input className="edit-input" />
              </fieldset>
            </div>
            <div>
              <fieldset className="edit-fieldset">
                <legend>Phone</legend>
                <input className="edit-input" />
              </fieldset>
            </div>
            <input type="submit" value="Update" />
          </div>
        </fieldset>
      </form>
      <h1>{tooltipText}</h1>
    </div>
  );
};

export default EditProfile;
