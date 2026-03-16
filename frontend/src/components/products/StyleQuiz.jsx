import React, { useState } from 'react';
import styled from 'styled-components';
import { SlideUpContainer, HoverButton } from '../common/MicroAnimations';

const QuizContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;

const QuizHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h2 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

const Question = styled.div`
  margin-bottom: 2rem;
`;

const QuestionTitle = styled.h3`
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.1rem;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.8rem;
`;

const Option = styled(HoverButton)`
  padding: 1rem;
  border: 2px solid ${({ $selected }) => ($selected ? '#a47148' : '#e0e0e0')};
  background: ${({ $selected }) => ($selected ? '#a47148' : 'white')};
  color: ${({ $selected }) => ($selected ? 'white' : '#333')};
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
  font-size: 0.9rem;
  transition: all 0.3s ease;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #a47148, #d4a574);
  width: ${({ progress }) => progress}%;
  transition: width 0.3s ease;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const NavButton = styled(HoverButton)`
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  
  &.primary {
    background: #a47148;
    color: white;
  }
  
  &.secondary {
    background: #f0f0f0;
    color: #333;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ResultsContainer = styled.div`
  text-align: center;
  
  h3 {
    color: #a47148;
    margin-bottom: 1rem;
  }
  
  .style-match {
    background: linear-gradient(135deg, #a47148, #d4a574);
    color: white;
    padding: 1.5rem;
    border-radius: 12px;
    margin: 1rem 0;
  }
`;

const StyleQuiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'occasion',
      title: 'What occasions do you usually dress for?',
      options: [
        { value: 'daily', label: 'Daily Wear' },
        { value: 'office', label: 'Office/Work' },
        { value: 'wedding', label: 'Weddings' },
        { value: 'festival', label: 'Festivals' },
        { value: 'party', label: 'Parties' }
      ]
    },
    {
      id: 'fabric',
      title: 'Which fabric do you prefer?',
      options: [
        { value: 'silk', label: 'Silk' },
        { value: 'cotton', label: 'Cotton' },
        { value: 'georgette', label: 'Georgette' },
        { value: 'chiffon', label: 'Chiffon' },
        { value: 'handloom', label: 'Handloom' }
      ]
    },
    {
      id: 'style',
      title: 'What\'s your style preference?',
      options: [
        { value: 'traditional', label: 'Traditional' },
        { value: 'modern', label: 'Modern' },
        { value: 'fusion', label: 'Fusion' },
        { value: 'minimalist', label: 'Minimalist' },
        { value: 'bold', label: 'Bold & Vibrant' }
      ]
    },
    {
      id: 'region',
      title: 'Which regional style appeals to you?',
      options: [
        { value: 'north', label: 'North Indian' },
        { value: 'south', label: 'South Indian' },
        { value: 'bengali', label: 'Bengali' },
        { value: 'gujarati', label: 'Gujarati' },
        { value: 'modern', label: 'Contemporary' }
      ]
    },
    {
      id: 'colors',
      title: 'What colors do you gravitate towards?',
      options: [
        { value: 'bright', label: 'Bright Colors' },
        { value: 'pastels', label: 'Pastels' },
        { value: 'earth', label: 'Earth Tones' },
        { value: 'jewel', label: 'Jewel Tones' },
        { value: 'neutral', label: 'Neutrals' }
      ]
    }
  ];

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      generateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const generateResults = () => {
    const styleProfile = {
      occasion: answers.occasion,
      fabric: answers.fabric,
      style: answers.style,
      region: answers.region,
      colors: answers.colors
    };

    setShowResults(true);
    onComplete?.(styleProfile);
  };

  const getStyleRecommendation = () => {
    const { fabric, style, occasion } = answers;
    
    if (fabric === 'silk' && style === 'traditional') {
      return 'Classic Silk Connoisseur - You appreciate timeless elegance and premium quality.';
    }
    if (fabric === 'cotton' && occasion === 'daily') {
      return 'Comfort-First Fashionista - You value comfort without compromising on style.';
    }
    if (style === 'modern' || style === 'fusion') {
      return 'Contemporary Trendsetter - You love mixing traditional with modern elements.';
    }
    return 'Versatile Style Enthusiast - You appreciate variety and adaptability in fashion.';
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <SlideUpContainer>
        <QuizContainer>
          <ResultsContainer>
            <h3>Your Perfect Saree Style</h3>
            <div className="style-match">
              <h4>{getStyleRecommendation()}</h4>
              <p>Based on your preferences, we'll show you sarees that match your unique style!</p>
            </div>
            <NavButton className="primary" onClick={() => window.location.reload()}>
              Retake Quiz
            </NavButton>
          </ResultsContainer>
        </QuizContainer>
      </SlideUpContainer>
    );
  }

  return (
    <SlideUpContainer>
      <QuizContainer>
        <QuizHeader>
          <h2>Find Your Perfect Saree Style</h2>
          <p>Answer a few questions to get personalized recommendations</p>
        </QuizHeader>

        <ProgressBar>
          <Progress progress={progress} />
        </ProgressBar>

        <Question>
          <QuestionTitle>
            {currentQuestion + 1}. {questions[currentQuestion].title}
          </QuestionTitle>
          
          <OptionsGrid>
            {questions[currentQuestion].options.map((option) => (
              <Option
                key={option.value}
                $selected={answers[questions[currentQuestion].id] === option.value}
                onClick={() => handleAnswer(option.value)}
              >
                {option.label}
              </Option>
            ))}
          </OptionsGrid>
        </Question>

        <NavigationButtons>
          <NavButton 
            className="secondary" 
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </NavButton>
          
          <NavButton 
            className="primary" 
            onClick={nextQuestion}
            disabled={!answers[questions[currentQuestion].id]}
          >
            {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
          </NavButton>
        </NavigationButtons>
      </QuizContainer>
    </SlideUpContainer>
  );
};

export default StyleQuiz;