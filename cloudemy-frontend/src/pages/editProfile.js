import "../assets/customCSS/editpage.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { nameValidator, phoneValidator } from "../assets/validators";
import Navbar from "../components/navbar";
import ShowToast from "../assets/toast";
import axios from "axios";

const EditProfile = () => {
  const [fname, setFname] = useState(JSON.parse(localStorage.getItem("User")).firstName);
  const [lname, setLname] = useState(JSON.parse(localStorage.getItem("User")).lastName);
  const [phone, setPhone] = useState(JSON.parse(localStorage.getItem("User")).phone);
  const [photoURL, setPhotoURL] = useState(JSON.parse(localStorage.getItem("User")).photo);
  const [photo, setPhoto] = useState(null);
  const [fnameTT, setFnameTT] = useState("nuull");
  const [lnameTT, setLnameTT] = useState("nuull");
  const [phoneTT, setPhoneTT] = useState("nuull");
  const [fnameFocussed, setfnameFocussed] = useState(false);
  const [lnameFocussed, setlnameFocussed] = useState(false);
  const [phoneFocussed, setphoneFocussed] = useState(false);

  const History = useHistory();

  const Update = (e) => {
    e.preventDefault();
    if (
      nameValidator(fname) === "Valid" &&
      nameValidator(lname) === "Valid" &&
      phoneValidator(phone) === "Valid"
    ) {
      if (!photo) {
        //update profile without changing photo
        axios
          .put(
            "/updatedetails",
            { fname, lname, phone, photo: photoURL },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("Token"),
              },
            }
          )
          .then((res) => {
            ShowToast(res.data.message, "green");
            localStorage.setItem("User", JSON.stringify(res.data.user));
            History.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const formdata = new FormData();
        formdata.append("profilepic", photo);
        formdata.append("fname", fname);
        formdata.append("lname", lname);
        formdata.append("phone", phone);
        axios
          .post("/updateprofile", formdata, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Token"),
            },
          })
          .then((res) => {
            ShowToast(res.data.message, "green");
            localStorage.setItem("User", JSON.stringify(res.data.user));
            History.push("/");
          })
          .catch((err) => {
            console.log(err.response);
            ShowToast(err.response.data.error, "red");
          });
      }
    } else if (nameValidator(fname) !== "Valid") {
      document.getElementsByClassName("edit-input")[0].focus();
    } else if (nameValidator(lname) !== "Valid") {
      document.getElementsByClassName("edit-input")[1].focus();
    } else if (nameValidator(phone) !== "Valid") {
      document.getElementsByClassName("edit-input")[2].focus();
    }
  };

  const handleChange = (value, num) => {
    if (num === 1) {
      setFnameTT(nameValidator(value));
      setFname(value);
    } else if (num === 2) {
      setLnameTT(nameValidator(value));
      setLname(value);
    } else if (num === 3) {
      setPhoneTT(phoneValidator(value));
      setPhone(value);
    } else {
      setPhoto(value);
      let reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result);
      };
      reader.readAsDataURL(value);
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
    <React.Fragment>
      <Navbar Active={["active", "inactive", "inactive", "inactive"]} />
      <div
        style={{
          display: "flex",
          height: "90vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form style={{ width: "500px" }} onSubmit={(e) => Update(e)} encType="multipart/form-data">
          <fieldset style={{ border: "5px double black", borderRadius: "40px 20px" }}>
            <legend
              style={{ textAlign: "center", fontFamily: "'Cairo',san-serif", fontSize: "38px" }}
            >
              Edit Profile
            </legend>
            <div className="input-container">
              <label className="chooseFile">
                <i className="fa fa-edit"></i>
                <input
                  type="file"
                  accept="image/*"
                  multiple={false}
                  name="profilepic"
                  onChange={(e) => handleChange(e.target.files[0], 0)}
                />
              </label>
              <div className="image-container" style={{ height: "100px", width: "100px" }}>
                <img
                  src={photoURL}
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
    </React.Fragment>
  );
};

export default EditProfile;
