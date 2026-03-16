import React, { useState } from "react";
import styled from "styled-components";
import { FiStar, FiUser } from "react-icons/fi";

const ReviewsSection = ({ product, reviews = [] }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", user: "" });

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        filled={i < rating}
        interactive={interactive}
        onClick={() => interactive && onRatingChange && onRatingChange(i + 1)}
      >
        <FiStar fill={i < rating ? "#fbbf24" : "none"} />
      </Star>
    ));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log("New review:", newReview);
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: "", user: "" });
  };

  return (
    <ReviewsContainer>
      <ReviewsHeader>
        <h3>Customer Reviews</h3>
        {product?.avgRating > 0 && (
          <RatingOverview>
            <div className="stars">
              {renderStars(product.avgRating)}
            </div>
            <span>{product.avgRating} out of 5</span>
            <span>({product.totalReviews} reviews)</span>
          </RatingOverview>
        )}
      </ReviewsHeader>

      <ReviewsList>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <ReviewItem key={index}>
              <ReviewHeader>
                <UserIcon>
                  <FiUser />
                </UserIcon>
                <div>
                  <UserName>{review.user}</UserName>
                  <ReviewRating>
                    {renderStars(review.rating)}
                  </ReviewRating>
                </div>
              </ReviewHeader>
              <ReviewComment>{review.comment}</ReviewComment>
            </ReviewItem>
          ))
        ) : (
          <NoReviews>
            <p>No reviews yet. Be the first to review this saree!</p>
          </NoReviews>
        )}
      </ReviewsList>

      <ReviewActions>
        <AddReviewButton onClick={() => setShowReviewForm(!showReviewForm)}>
          {showReviewForm ? "Cancel" : "Write a Review"}
        </AddReviewButton>
      </ReviewActions>

      {showReviewForm && (
        <ReviewForm onSubmit={handleSubmitReview}>
          <FormGroup>
            <label>Your Rating</label>
            <RatingInput>
              {renderStars(newReview.rating, true, (rating) => 
                setNewReview(prev => ({ ...prev, rating }))
              )}
            </RatingInput>
          </FormGroup>

          <FormGroup>
            <label>Your Name</label>
            <input
              type="text"
              value={newReview.user}
              onChange={(e) => setNewReview(prev => ({ ...prev, user: e.target.value }))}
              placeholder="Enter your name"
              required
            />
          </FormGroup>

          <FormGroup>
            <label>Your Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Share your experience with this saree..."
              rows="4"
              required
            />
          </FormGroup>

          <FormActions>
            <SubmitButton type="submit">Submit Review</SubmitButton>
          </FormActions>
        </ReviewForm>
      )}
    </ReviewsContainer>
  );
};

export default ReviewsSection;

const ReviewsContainer = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
`;

const ReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  h3 {
    margin: 0;
    color: #2b2b2b;
    font-size: 1.3rem;
  }
`;

const RatingOverview = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;

  .stars {
    display: flex;
    color: #fbbf24;
  }
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ReviewItem = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const UserIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #a47148;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const UserName = styled.div`
  font-weight: 600;
  color: #2b2b2b;
  margin-bottom: 0.2rem;
`;

const ReviewRating = styled.div`
  display: flex;
  color: #fbbf24;
`;

const ReviewComment = styled.p`
  margin: 0;
  color: #666;
  line-height: 1.6;
`;

const NoReviews = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const ReviewActions = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const AddReviewButton = styled.button`
  padding: 0.8rem 2rem;
  background: #a47148;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background: #8b5a3c;
  }
`;

const ReviewForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #2b2b2b;
  }

  input, textarea {
    width: 100%;
    padding: 0.8rem;
    border: 2px solid #e5e5e5;
    border-radius: 8px;
    font-size: 0.9rem;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #a47148;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const RatingInput = styled.div`
  display: flex;
  gap: 0.2rem;
`;

const Star = styled.button`
  background: none;
  border: none;
  cursor: ${props => props.interactive ? 'pointer' : 'default'};
  color: ${props => props.filled ? '#fbbf24' : '#e5e5e5'};
  font-size: 1.5rem;
  padding: 0.2rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.interactive ? '#fbbf24' : 'inherit'};
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  padding: 0.8rem 2rem;
  background: #a47148;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background: #8b5a3c;
  }
`;