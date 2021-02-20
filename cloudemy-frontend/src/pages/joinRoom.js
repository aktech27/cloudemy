import { useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import "../assets/customCSS/joinRoom.css";
import Empty from "../assets/empty.png";
import Searcher from "../assets/search.png";

const JoinRoom = () => {
  const [Search, setSearch] = useState("");
  const [rooms, setRooms] = useState([{}]);
  const JoinRoom = (e, roomID) => {
    e.preventDefault();
    axios
      .put(
        "/joinroom",
        { roomID },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response.data.error));
  };
  const SearchRoom = (e) => {
    e.preventDefault();
    axios
      .post(
        "/searchroom",
        { roomName: Search },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setRooms(res.data.rooms);
      })
      .catch((err) => console.log(err.response.data.error));
  };

  const ReturnRooms = () => {
    if (JSON.stringify(rooms) === `[{}]`) {
      return (
        <div className="empty-room">
          <img src={Searcher} alt="No items found" width="300px" />
          <h2>Type a Room name to start searching</h2>
        </div>
      );
    } else if (!rooms.length) {
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
              <div className="card" key={room._id}>
                <div className="card-container">
                  <h2 style={{ textAlign: "center" }}>{room.roomName}</h2>
                  <hr />
                  <p>{room.description}</p>
                </div>
                <button onClick={(e) => JoinRoom(e, room._id)} />
              </div>
            );
          })}
        </div>
      );
    }
  };
  return (
    <div>
      <Navbar Active={["inactive", "inactive", "active", "inactive"]} />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <h2>Room name or code to search</h2>
        <div className="search-container">
          <form onSubmit={(e) => SearchRoom(e)}>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search.."
              required
            />
            <button className="search" type="submit">
              <i className="fa fa-search fa-2x" />
            </button>
          </form>
        </div>
      </div>
      {ReturnRooms()}
    </div>
  );
};

export default JoinRoom;
