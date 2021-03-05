import { useState } from "react";
const ToggleButton = (props) => {
  const [checked, setChecked] = useState(props.Checked);
  const CSS = {
    toggle: {
      display: "flex",
      alignItems: "center",
      width: "55px",
      height: "34px",
      borderRadius: "50px",
      backgroundColor: checked === true ? "blue" : "grey",
      padding: "0px 4px",
    },
    slider: {
      backgroundColor: "white",
      width: "25px",
      height: "25px",
      borderRadius: "50%",
      transition: "all 0.3s ease",
      transform: checked === true ? "translateX(30px)" : "translateX(0px)",
    },
  };
  return (
    <label style={CSS.toggle} className="toggle">
      <input
        hidden={true}
        type="checkbox"
        onChange={() => {
          props.State(!checked);
          setChecked(!checked);
        }}
        checked={checked}
      />
      <span style={CSS.slider} className="slider"></span>
    </label>
  );
};
export default ToggleButton;
