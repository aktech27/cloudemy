import spinner from "../assets/spinner.gif";

const Spinner = (props) => {
  const MyCSS = {
    container: {
      height: "100vh",
      width: "100vw",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: "99",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      visibility: props.Status ? "visible" : "hidden",
    },
    image: { width: "250px", height: "auto" },
  };
  return (
    <div style={MyCSS.container}>
      <img style={MyCSS.image} src={spinner} alt="loaderanim" />
    </div>
  );
};

export default Spinner;
