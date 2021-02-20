import "../assets/customCSS/navbar.css";
import { useHistory } from "react-router-dom";

const Navbar = (props) => {
  const History = useHistory();
  const Logout = () => {
    localStorage.clear();
    History.push("/");
    window.location.reload();
  };
  return (
    <div className="navbar">
      <div className="logo-tag">
        <h2>Cloudemy</h2>
      </div>
      <ul>
        <li>
          <a className={props.Active[0]} href="../../">
            Home
          </a>
        </li>
        <li>
          <a className={props.Active[1]} href="#news">
            Link2
          </a>
        </li>
        <li>
          <a className={props.Active[2]} href="./join">
            Join Room
          </a>
        </li>
        <li>
          <a className={props.Active[3]} href="#logout" onClick={() => Logout()}>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
