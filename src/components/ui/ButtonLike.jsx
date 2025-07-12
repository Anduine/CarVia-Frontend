import { useState } from "react";
import { RiPokerHeartsLine, RiPokerHeartsFill } from "react-icons/ri";
import { addLotToLikes, removeLotFromLikes } from "../../services/Like.service";

const ButtonLike = ({ lotId, initialIsLiked }) => {
  const [liked, setLiked] = useState(initialIsLiked);

  async function handleClick() {
    try {
      if (liked) {
        await removeLotFromLikes(lotId);
      } else {
        await addLotToLikes(lotId);
      }
      setLiked(!liked);
    } catch (err) {
      console.error("Помилка при зміні статусу лайку:", err);
    }
  }

  return (
    <div onClick={handleClick} className="like-button" title="Додати до обраного">
      {liked ? <RiPokerHeartsFill size="2rem" color="crimson" /> : <RiPokerHeartsLine size="2rem" />}
    </div>
  );
};

export default ButtonLike;
