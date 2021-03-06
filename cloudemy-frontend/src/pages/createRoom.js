import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../assets/customCSS/createRoom.css";
import ToggleButton from "../components/toggleBtn";
import Navbar from "../components/navbar";
import Spinner from "../components/spinner";
import ShowToast from "../assets/toast";
import axios from "axios";

const CreateRoom = () => {
  const History = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState(
    "https://res.cloudinary.com/aktech27/image/upload/v1614421879/cloudemy/roompics/defaultpic.png"
  );
  const [image, setImage] = useState("");
  const [showOnSearch, setShowOnSearch] = useState(true);
  const [privateRoom, setPrivateRoom] = useState(false);
  const [loading, setLoading] = useState(false);

  const create = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("roomImage", image);
    formdata.append("roomName", name);
    formdata.append("description", description);
    formdata.append("showOnSearch", showOnSearch);
    formdata.append("privateRoom", privateRoom);
    setLoading(true);
    axios
      .post("/createroom", formdata, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        setLoading(false);
        ShowToast(res.data.message, "green");
        History.push("../");
      })
      .catch((err) => {
        setLoading(false);
        ShowToast(err.response.data.error, "red");
        History.push("../");
      });
  };

  return (
    <React.Fragment>
      <Navbar Active={["inactive", "active", "inactive", "inactive"]} />
      <div id="create-container">
        <Spinner Status={loading} />
        <form style={{ width: "500px" }} onSubmit={(e) => create(e)}>
          <fieldset id="createRoom">
            <legend
              style={{ textAlign: "center", fontFamily: "'Cairo',san-serif", fontSize: "38px" }}
            >
              Create Room
            </legend>
            <label style={{ marginTop: "0px" }} className="chooseFile">
              <i className="fa fa-edit"></i>
              <input
                type="file"
                accept="image/*"
                multiple={false}
                name="roomImage"
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
              Room Name
              <input
                placeholder="Room Name"
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
            </label>
            <label className="input-label">
              Room Description
              <textarea
                placeholder="Enter a description"
                required={true}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label className="input-label">
              Show on Search
              <span>
                <ToggleButton Checked={showOnSearch} State={setShowOnSearch} />
              </span>
            </label>
            <label className="input-label">
              Make Private
              <span>
                <ToggleButton Checked={privateRoom} State={setPrivateRoom} />
              </span>
            </label>
            <input type="submit" value="Create Room" />
          </fieldset>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CreateRoom;
