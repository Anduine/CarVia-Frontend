import { useState } from "react";

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  const handleError = (err) => {
    setHasError(true);
    setError(err);
    console.error("ErrorBoundary caught:", err);
  };

  if (hasError) {
    return (
      <div>
        <h2>Что-то пошло не так.</h2>
        <p>{error?.message || "Невідома помилка"}</p>
      </div>
    );
  }

  return children;
}

export default ErrorBoundary;
