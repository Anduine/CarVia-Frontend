import { FaAngleLeft } from "react-icons/fa";

function ButtonPrev({ onClick, disabledStatus }) {
  return (
    <button onClick={onClick} disabled={disabledStatus}>
      <FaAngleLeft />
    </button>
  );
}

export default ButtonPrev;
