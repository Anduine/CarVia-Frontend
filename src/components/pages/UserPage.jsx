import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../services/User.service";
import { getUserPostedLots, getUserLikedLots } from "../../services/Lots.service";
import Avatar from "../ui/profile/Avatar";
import ScrollableLotsList from "../ui/profile/ScrollableLotsList";
import RoundedTimer from "../ui/RoundedTimer";

function UserPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const [postedLots, setPostedLots] = useState([]);
  const [likedLots, setLikedLots] = useState([]);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");

    getUser(token)
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
        } else {
          setError(response?.data?.message || "Помилка авторизації");
        }
      })
      .catch((error) => {
        console.error("Помилка отримання профілю користувача:", error);
        const message =
          error.response?.data?.message || //  сообщение от бэка
          error.response?.data || // если `message` нет, data (если это строка)
          error.message || // сообщение от axios
          "Помилка авторизації";

        setError(message);
      })
      .finally(() => {
        getUserPostedLots(user.user_id)
          .then((response) => {
            if (response.status === 200) {
              setPostedLots(response.data);
            }
          })
          .catch((error) => console.log("Помилка отримання виставлених лотів користувача:", error));

        getUserLikedLots(user.user_id)
          .then((response) => {
            if (response.status === 200) {
              setLikedLots(response.data);
            }
          })
          .catch((error) => console.log("Помилка отримання лайкнутих лотів користувача:", error));

        setLoading(false);
      });
  }, [user.user_id, navigate]);

  if (loading) return <div className="information-block">Завантаження...</div>;
  if (error)
    return (
      <>
        <div className="information-block">{error}</div>
        <RoundedTimer />
      </>
    );

  return (
    <>
      <div className="user-profile">
        <div className="profile-header">
          <Avatar avatar={user?.avatar} />
          <div className="user-info">
            <h1>
              {user?.first_name} {user?.last_name}
            </h1>
            <p>Email: </p>
            <p>{user?.email}</p>
            <p>Телефон: </p>
            <p>{user?.phonenumber}</p>
            <p>Адреса: </p>
            <p>{user?.address}</p>
          </div>
        </div>

        <div className="lots-section">
          <h2>Виставлені лоти</h2>
          <ScrollableLotsList lots={postedLots} sectionId={0} emptyText={"У вас ще немає активних лотів"} />
        </div>

        <div className="lots-section">
          <h2>Лайкнуті лоти</h2>
          <ScrollableLotsList lots={likedLots} sectionId={1} emptyText={"Ви ще не лайкнули жодного лота"} />
        </div>
      </div>
    </>
  );
}

export default UserPage;
