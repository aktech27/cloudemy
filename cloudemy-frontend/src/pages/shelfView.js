import Navbar from "../components/navbar";
import Posts from "../components/posts";

const ShelfView = () => {
  return (
    <div>
      <Navbar Active={["inactive", "inactive", "inactive", "inactive"]} />
      <Posts />
    </div>
  );
};

export default ShelfView;
