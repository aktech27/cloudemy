import React, { useState } from "react";
import "../assets/customCSS/createRoom.css";
import ToggleButton from "../components/toggleBtn";
import Navbar from "../components/navbar";

const CreateShelf = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState(
    "https://res.cloudinary.com/aktech27/image/upload/v1614421879/cloudemy/shelfpics/defaultpic.png"
  );
  const [image, setImage] = useState("");
  const [Protected, setProtected] = useState(false);
  return (
    <React.Fragment>
      <Navbar Active={["inactive", "inactive", "inactive", "inactive"]} />
      <div id="create-container">
        <form
          style={{ width: "500px" }}
          onSubmit={(e) => {
            e.preventDefault();
            console.log({
              Name: name,
              Description: description,
              Image: image,
              Protected,
            });
          }}
        >
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
              <input placeholder="Shelf Name" onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="input-label">
              Shelf Description
              <textarea
                placeholder="Enter a description"
                onChange={(e) => setDescription(e.target.value)}
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
