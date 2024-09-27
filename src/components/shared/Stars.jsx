import "./Stars.css"

export const Stars = ({ ratings = [], stars = 0, onClick }) => {
  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0;
    const totalStars = ratings.reduce((total, rating) => total + rating.stars, 0);
    return Math.ceil(totalStars / ratings.length);
  };

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

  const averageRating = ratings.length > 0 ? calculateAverageRating(ratings) : stars;

  return <div>{renderStars(averageRating)}</div>;
};
