import "./Stars.css";
import { calculateAverageRating } from "../../utils/calculateAverageRating.js";

export const Stars = ({ ratings = [], stars = 0, onClick }) => {
  const averageRating = ratings.length > 0 ? calculateAverageRating(ratings) : stars;

  const renderStars = (rating) => {
    const starElements = [];
    for (let i = 0; i < 5; i++) {
      starElements.push(
        <span
          key={i}
          className={i < rating ? "star filled" : "star empty"}
          style={onClick ? { cursor: "pointer" } : {}}
          onClick={() => onClick && onClick(i + 1)}
        >
          ★
        </span>
      );
    }
    return starElements;
  };

  return <span>{renderStars(averageRating)}</span>;
};
