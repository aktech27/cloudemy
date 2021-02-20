import Navbar from "../components/navbar";
import Rooms from "../components/rooms";

const Dashboard = () => {
  return (
    <div>
      <Navbar Active={["active", "inactive", "inactive", "inactive"]} />
      <Rooms />
    </div>
  );
};

export default Dashboard;
