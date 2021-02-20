import { blurLeftSet, blurRightSet, inputFocused } from "../assets/customCSS/signAnim";
import Tooltip from "./tooltip";

const InputTag = (props) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <input
        type={props.types[0]}
        onChange={(e) => {
          inputFocused(props.classNames[0], e.target.value);
          props.setStates[0](e.target.value);
        }}
        onBlur={() => blurLeftSet(props.classNames[0], props.states[0])}
      />
      <span
        className={"placeHolder " + props.classNames[0]}
        style={{
          marginLeft: window.innerWidth > 705 ? "-350px" : "0px",
          marginTop: "25px",
        }}
      >
        {props.placeholders[0]}
      </span>
      <Tooltip classNames={props.classNames[0]} Visibility="hidden" />
      <input
        type={props.types[1]}
        onChange={(e) => {
          inputFocused(props.classNames[1], e.target.value);
          props.setStates[1](e.target.value);
        }}
        onBlur={() => blurRightSet(props.classNames[1], props.states[1])}
      />
      <span
        className={"placeHolder " + props.classNames[1]}
        style={{
          marginRight: window.innerWidth > 705 ? "-350px" : "0px",
          marginTop: window.innerWidth > 705 ? "25px" : "112px",
        }}
      >
        {props.placeholders[1]}
      </span>
      <Tooltip classNames={props.classNames[1]} Visibility="hidden" />
    </div>
  );
};

export default InputTag;
