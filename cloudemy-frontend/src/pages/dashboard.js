import Navbar from "../components/navbar";
import Rooms from "../components/rooms";
import Profile from "../components/profile";

const Dashboard = () => {
  return (
    <div>
      <Navbar Active={["active", "inactive", "inactive", "inactive"]} />
      <Profile />
      <Rooms />
    </div>
  );
};

export default Dashboard;
