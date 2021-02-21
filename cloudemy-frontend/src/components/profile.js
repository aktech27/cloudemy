import "../assets/customCSS/profile.css";
const Profile = () => {
  const showEditProfile = (e) => {
    let hint = document.createElement("div");
    hint.className = "edit-hint";
    hint.innerHTML = "Edit Profile";
    hint.style.top = parseInt(e.clientY) + parseInt(20) + "px";
    document.getElementsByTagName("body")[0].appendChild(hint);
  };
  const hideEditProfile = () => {
    document.getElementsByClassName("edit-hint")[0].remove();
  };
  const changeEditProfile = (e) => {
    let hint = document.getElementsByClassName("edit-hint")[0];
    hint.style.top = parseInt(e.clientY) + parseInt(20) + "px";
  };
  return (
    <div className="profile-area">
      <h3>
        Welcome{" "}
        {JSON.parse(localStorage.getItem("User")).firstName +
          " " +
          JSON.parse(localStorage.getItem("User")).lastName}
      </h3>
      <img
        id="propic"
        src={JSON.parse(localStorage.getItem("User")).photo}
        alt="profilepic"
        onMouseEnter={(e) => showEditProfile(e)}
        onMouseMove={(e) => changeEditProfile(e)}
        onMouseLeave={() => hideEditProfile()}
        onClick={() => window.alert("Works")}
      />
    </div>
  );
};

export default Profile;
