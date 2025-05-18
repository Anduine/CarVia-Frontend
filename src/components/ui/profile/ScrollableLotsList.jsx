import { useRef } from "react";
import { CiImageOff } from "react-icons/ci";
import MiniLotCard from "./MiniLotCard";

function ScrollableLotsList({ lots, sectionId, emptyText }) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -220, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 220, behavior: "smooth" });
  };

  return (
    <>
      {lots && lots.length > 0 ? (
        <div className="lots-scroll-container">
          <button className="lots-scroll-button lots-scroll-left" onClick={scrollLeft}>
            ‹
          </button>
          <div className="lots-list-scrollable" ref={scrollRef} id={`${sectionId}-scroll`}>
            {lots.map((lot) => (
              <MiniLotCard key={lot.lot_id} lot={lot} />
            ))}
          </div>
          <button className="lots-scroll-button lots-scroll-right" onClick={scrollRight}>
            ›
          </button>
        </div>
      ) : (
        <div className="empty-lots">
          <CiImageOff size={48} />
          <p>{emptyText}</p>
        </div>
      )}
    </>
  );
}

export default ScrollableLotsList;
