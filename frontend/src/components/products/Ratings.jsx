import { FaStar } from "react-icons/fa";

const Ratings = ({ value = 4 }) => {
  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} color={i < value ? "gold" : "#ccc"} />
      ))}
    </div>
  );
};

export default Ratings;
