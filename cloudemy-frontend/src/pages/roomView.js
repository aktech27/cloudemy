import Navbar from "../components/navbar";
import Shelfs from "../components/shelfs";

const Roomview = () => {
  return (
    <div>
      <Navbar Active={["inactive", "inactive", "inactive", "inactive"]} />
      <Shelfs />
    </div>
  );
};

export default Roomview;
