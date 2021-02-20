const Tooltip = (props) => {
  return (
    <span
      className={"tooltip tp-" + props.classNames.slice(3)}
      style={{ visibility: props.Visibility }}
    ></span>
  );
};

export default Tooltip;
