// style
import "./Button.scss";

const Button = ({ type, title = "button", click, disabled }) => {
  const getType = () => {
    if (type === "add") return "add";
    else if (type === "remove") return "remove";
    else if (type === "checkout") return "checkout";
  };

  return (
    <button className={`btn ${getType()}`} disabled={disabled} onClick={click}>
      {title}
    </button>
  );
};

export default Button;
