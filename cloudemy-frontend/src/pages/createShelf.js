import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../assets/customCSS/createRoom.css";
import ToggleButton from "../components/toggleBtn";
import Navbar from "../components/navbar";
import ShowToast from "../assets/toast";
import axios from "axios";

const CreateShelf = () => {
  const History = useHistory();
  const { roomCode } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState(
    "https://res.cloudinary.com/aktech27/image/upload/v1614421879/cloudemy/shelfpics/defaultpic.png"
  );
  const [image, setImage] = useState("");
  const [Protected, setProtected] = useState(false);
  const create = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("shelfImage", image);
    formdata.append("shelfName", name);
    formdata.append("description", description);
    formdata.append("belongsTo", roomCode);
    axios
      .post("/createshelf", formdata, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        ShowToast(res.data.message, "green");
        History.push("../");
      })
      .catch((err) => {
        ShowToast(err.response.data.error, "red");
        History.push("../");
      });
  };

  return (
    <React.Fragment>
      <Navbar Active={["inactive", "inactive", "inactive", "inactive"]} />
      <div id="create-container">
        <form style={{ width: "500px" }} onSubmit={(e) => create(e)}>
          <fieldset id="createShelf">
            <legend
              style={{ textAlign: "center", fontFamily: "'Cairo',san-serif", fontSize: "38px" }}
            >
              Create Shelf
            </legend>
            <label style={{ marginTop: "0px" }} className="chooseFile">
              <i className="fa fa-edit"></i>
              <input
                type="file"
                accept="image/*"
                multiple={false}
                name="shelfpic"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  let reader = new FileReader();
                  reader.readAsDataURL(e.target.files[0]);
                  reader.onloadend = () => {
                    setImageURL(reader.result);
                  };
                }}
              />
            </label>
            <div
              className="image-container"
              style={{ height: "100px", width: "100px", marginBottom: "20px" }}
            >
              <img
                src={imageURL}
                alt="Logo"
                style={{
                  borderRadius: "50%",
                  border: "2px solid black",
                  height: "100%",
                  width: "100px",
                  objectFit: "contain",
                }}
              />
            </div>
            <label className="input-label">
              Shelf Name
              <input
                placeholder="Shelf Name"
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
            </label>
            <label className="input-label">
              Shelf Description
              <textarea
                placeholder="Enter a description"
                onChange={(e) => setDescription(e.target.value)}
                required={true}
              />
            </label>
            <label className="input-label">
              Make Protected
              <span>
                <ToggleButton Checked={Protected} State={setProtected} />
              </span>
            </label>
            <input type="submit" value="Create Shelf" />
          </fieldset>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CreateShelf;
