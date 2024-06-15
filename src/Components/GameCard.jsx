import React, { useEffect, useState } from 'react'
import { getCards } from '../API/CardsAPI';
import { Card } from 'react-bootstrap';


const GameCard = ({name, onClick}) => {
    
    return (  
        <Card className='game-card-container'>
            <Card.Body>
                <Card.Title onClick={onClick}>{name}</Card.Title>
            </Card.Body>
        </Card>
  )
}

export default GameCard