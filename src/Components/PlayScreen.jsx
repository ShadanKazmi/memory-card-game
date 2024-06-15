import React, { useContext, useEffect, useState } from 'react'
import { getCards } from '../API/CardsAPI'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import GameCard from './GameCard';
import { Difficulty } from '../API/Difficulty';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const getRandomUniqueCards = (cards, num) => {
    const uniqueCards = new Set();
    while (uniqueCards.size < num) {
        const randomIndex = Math.floor(Math.random() * cards.length);
        uniqueCards.add(cards[randomIndex]);
    }
    return Array.from(uniqueCards);
};

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const PlayScreen = () => {

    const navigate = useNavigate();
    const navigateTo = () => {
        navigate("/")
  }


    const[gameCards, setgameCards] = useState([]);
    const diffState = useContext(Difficulty);
    const [displayCards, setDisplayCards] = useState([]);
    const[clickedCard, setClickedCard] = useState(new Set());
    const [gameState, setGameState] = useState('active');
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true); 
    const maxUniqueCards = diffState.difficulty === 1 ? 5 : diffState.difficulty === 2 ? 7 : 10;
    // console.log(maxUniqueCards);
    let finalScore = maxUniqueCards*2;
    console.log("fnalscore", finalScore)
    console.log("score",score);
    let won = false;


    if(score === finalScore){
        console.log("hello score",score);
        won = true;
    }

    useEffect(() => {
        getCards().then((cards) => {
            setgameCards(cards.results);
            // setDisplayCards(getRandomUniqueCards(cards.results, 5));
            if (diffState.difficulty === 1) {
                setDisplayCards(getRandomUniqueCards(cards.results, 5));
            } else if (diffState.difficulty === 2) {
                setDisplayCards(getRandomUniqueCards(cards.results, 7));
            } else if (diffState.difficulty === 3) {
                setDisplayCards(getRandomUniqueCards(cards.results, 10));
            }
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        });
    }, [diffState]);

    const handleCardClick = (card) => {

        if (clickedCard.has(card.name)) { 
            // navigateTo(); //GAME OVER
            setClickedCard(new Set());
            setDisplayCards(getRandomUniqueCards(gameCards, displayCards.length)); 
            setGameState('gameover')
        } 
        // else {
        //     setScore(score+1);  
        //     const newClickedCard = new Set(clickedCard);
        //     newClickedCard.add(card.name);
        //     setClickedCard(newClickedCard);
        //     setDisplayCards(shuffleArray([...displayCards])); 
        // }

        else {
            const newClickedCard = new Set(clickedCard);
            newClickedCard.add(card.name);
            setClickedCard(newClickedCard);
            setScore(score + 2);
            console.log("score inside",score);
            if (won === true) {
                console.log("HELLOOOO")
                // setGameState('won');
                navigateTo();
            } else {
                setDisplayCards(shuffleArray([...displayCards]));
            }
        }

    };



    if (loading) {
        return (
            <div className='loading-spinner'>
                <Spinner animation="grow" variant="dark">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> 
            </div>
        );
    }

    if (gameState === 'gameover') {
        return (
            <div>
                <Card className='game-over'>
                    <Card.Body>
                        <Card.Title>Game Over 🐼</Card.Title>
                        <Card.Text className='final-sc'>Your Score: {score}</Card.Text>
                        <Button className = 'reset-btn' onClick={() => navigateTo()}>Go to Menu</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    if (won) {
        return (
            <div>
                <Card className='game-won'>
                    <Card.Body>
                        <Card.Title>You Won!</Card.Title>
                        <Card.Text className='final-sc'>Your Score: {score}</Card.Text>
                        <Button className='reset-btn' onClick={() => navigateTo()}>Go to Menu</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }


    return (
        <div>
            <Card className='play-screen'>
                <Card.Body>
                    <Card.Title className='play-head'>
                        Begin
                    </Card.Title>
                    <div className='final-sc'>
                        <Card.Text>
                            Score: {score}
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>
            <div className='game'>
                 {displayCards.map((card, index) => (
                    <GameCard key={index} name={card.name} onClick = {() => handleCardClick(card)}/>
                ))}
                
            </div>
        </div>
 
    )
}

export default PlayScreen