import { FaAngleRight } from "react-icons/fa";

function ButtonNext({ onClick, disabledStatus }) {
  return (
    <button onClick={onClick} disabled={disabledStatus}>
      <FaAngleRight />
    </button>
  );
}

export default ButtonNext;
