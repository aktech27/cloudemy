import axios from "axios";
import "../assets/customCSS/shelf.css";
import Empty from "../assets/empty.png";
import Spinner from "../components/spinner";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const Shelfs = () => {
  let { roomCode } = useParams();
  const [shelfs, setshelf] = useState([{}]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        "/viewshelfs",
        { roomCode },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setshelf(res.data.shelfs);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ReturnShelfs = () => {
    if (!shelfs.length) {
      return (
        <div className="empty-room">
          <img src={Empty} alt="No items found" width="300px" />
          <h2>No rooms found</h2>
        </div>
      );
    } else {
      return (
        <div className="shelf-container">
          {shelfs.map((shelf) => {
            return (
              <Link
                key={Math.random().toString()}
                style={{ textDecoration: "none" }}
                to={"/shelf/" + shelf.cryptedName}
              >
                <div className="card">
                  <div className="card-container">
                    <h2 style={{ textAlign: "center" }}>{shelf.shelfName}</h2>
                    <hr />
                    <p>{shelf.description}</p>
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
    <div className="shelf-list">
      <Spinner Status={loading} />
      <Link to={"../" + roomCode + "/createshelf"}>Create Shelf</Link>
      <h1 style={{ textAlign: "center" }}>List of Shelfs available</h1>
      {ReturnShelfs()}
    </div>
  );
};
export default Shelfs;
