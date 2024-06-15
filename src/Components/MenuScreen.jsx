import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { Difficulty } from '../API/Difficulty';


const MenuScreen = () => {

  const diffState = useContext(Difficulty);
  // console.log(diffState)
  const navigate = useNavigate();
  const beginGame = () => {
    navigate("/gamescreen")
  }
  

  return (
    <Card className='menu-container'>
      <Card.Body>
        <Card.Title className='menu-title'>SELECT DIFFICULTY</Card.Title>
        <div className='btn-div'>
            <Button className='btn-class' onClick= {() => {diffState.setDifficulty(1);beginGame();}}>EASY</Button> 
            <Button className='btn-class' onClick= {() => {diffState.setDifficulty(2);beginGame();}}>MEDIUM</Button>
            <Button className='btn-class' onClick= {() => {diffState.setDifficulty(3);beginGame();}}>HARD</Button>
        </div>
        <Card.Text className='made-txt'>Made by Shadan 🎮</Card.Text>

      </Card.Body>
    </Card>
  )
}

export default MenuScreen