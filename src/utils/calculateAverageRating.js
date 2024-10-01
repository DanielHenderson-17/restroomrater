export const calculateAverageRating = (ratings, roundToDecimal = 1, callback) => {
    if (!Array.isArray(ratings) || ratings.length === 0) return 0;
    
    const totalStars = ratings.reduce((total, rating) => total + rating.stars, 0);
    const average = totalStars / ratings.length;
    const result = callback ? callback(average) : average;
    return result.toFixed(roundToDecimal);
  };
  