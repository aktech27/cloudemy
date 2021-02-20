import axios from "axios";
import "../assets/customCSS/dashboard.css";
import Empty from "../assets/empty.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Rooms = () => {
  const [rooms, setrooms] = useState([{}]);
  useEffect(() => {
    axios
      .get("/viewrooms", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((res) => {
        setrooms(res.data.rooms);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ReturnRooms = () => {
    if (!rooms.length) {
      return (
        <div className="empty-room">
          <img src={Empty} alt="No items found" width="300px" />
          <h2>No rooms found</h2>
        </div>
      );
    } else {
      return (
        <div className="room-container">
          {rooms.map((room) => {
            return (
              <Link
                key={Math.random().toString()}
                style={{ textDecoration: "none" }}
                to={"./room/" + room.cryptedName}
              >
                <div className="card">
                  <div className="card-container">
                    <h2 style={{ textAlign: "center" }}>{room.roomName}</h2>
                    <hr />
                    <p>{room.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="room-list">
      <h1 style={{ textAlign: "center" }}>List of rooms available</h1>
      {ReturnRooms()}
    </div>
  );
};
export default Rooms;
