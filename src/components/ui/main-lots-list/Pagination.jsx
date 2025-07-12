import ButtonNext from "../ButtonNext";
import ButtonPrev from "../ButtonPrev";

function Pagination({ currentPage, handleSetPage, maxPage }) {
  const generatePages = () => {
    const pages = [];
    const maxVisiblePages = 5; // Максимальное количество видимых страниц вокруг текущей

    if (maxPage <= maxVisiblePages + 2) {
      for (let i = 1; i <= maxPage; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= maxVisiblePages - 2) {
        // Если текущая страница близка к началу
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(maxPage);
      } else if (currentPage >= maxPage - 2) {
        // Если текущая страница близка к концу
        pages.push(1);
        pages.push("...");
        for (let i = maxPage - maxVisiblePages + 1; i <= maxPage; i++) {
          pages.push(i);
        }
      } else {
        // Если текущая страница в середине
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(maxPage);
      }
    }

    return pages;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= maxPage) {
      handleSetPage(newPage);
    }
  };

  return (
    <nav className="pagination">
      <ButtonPrev onClick={() => handlePageChange(currentPage - 1)} disabledStatus={currentPage === 1} />

      {generatePages().map((pageNumber, index) => (
        <button
          key={index}
          onClick={() => typeof pageNumber === "number" && handlePageChange(pageNumber)}
          disabled={pageNumber === currentPage || pageNumber === "..."}
          className={pageNumber === currentPage ? "active" : ""}
        >
          {pageNumber}
        </button>
      ))}

      <ButtonNext onClick={() => handlePageChange(currentPage + 1)} disabledStatus={currentPage === maxPage} />
    </nav>
  );
}

export default Pagination;
