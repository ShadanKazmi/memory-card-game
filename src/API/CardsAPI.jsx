const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
export const getCards = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',{
        method: "GET",
    })
    let data = await response.json();
    return data;
}