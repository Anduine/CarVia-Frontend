import { CiImageOff } from "react-icons/ci";

function Avatar({ avatar }) {
  return (
    <>
      {avatar ? (
        <img className="user-avatar" src={`${process.env.REACT_APP_API_URL}/sso/images/${avatar}`} alt="User Avatar" />
      ) : (
        <div className="user-avatar placeholder-avatar">
          <CiImageOff size={48} />
        </div>
      )}
    </>
  );
}

export default Avatar;
