import React, { useState } from "react";
import "../assets/customCSS/createRoom.css";
import ToggleButton from "../components/toggleBtn";
import Navbar from "../components/navbar";
const CreateRoom = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState(
    "https://res.cloudinary.com/aktech27/image/upload/v1614421879/cloudemy/roompics/defaultpic.png"
  );
  const [image, setImage] = useState("");
  const [showOnSearch, setShowOnSearch] = useState(true);
  const [privateRoom, setPrivateRoom] = useState(false);
  return (
    <React.Fragment>
      <Navbar Active={["inactive", "active", "inactive", "inactive"]} />
      <div id="create-container">
        <form
          style={{ width: "500px" }}
          onSubmit={(e) => {
            e.preventDefault();
            console.log({
              Name: name,
              Description: description,
              Image: image,
              Search: showOnSearch,
              Private: privateRoom,
            });
          }}
        >
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
                name="roompic"
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
              <input placeholder="Room Name" onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="input-label">
              Room Description
              <textarea
                placeholder="Enter a description"
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
