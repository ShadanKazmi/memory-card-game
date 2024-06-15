import { createContext, useState } from "react";

export const Difficulty = createContext();

export const DifficultyProvider = (props) => {
    const [difficulty,setDifficulty] = useState(null);

    return(
        <Difficulty.Provider value = {{difficulty, setDifficulty}}>
            {props.children}
        </Difficulty.Provider>
    )
}