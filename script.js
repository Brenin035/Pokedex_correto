const pokemon_name = document.querySelector('.pokemon_name');
const pokemon_number = document.querySelector('.pokemon_number');
const pokemon_image = document.querySelector('.pokemon_image');

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const button_prev = document.querySelector('.btn-prev')
const button_next = document.querySelector('.btn-next')

let searchpokemon = 1;

// Função para buscar pokemon na API
const fetchpokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIresponse.status === 200) {
        const data = await APIresponse.json();
        return data;
    }
}

// Função para renderizar o pokemon
const renderpokemon = async (pokemon) => {
    pokemon_name.innerHTML = 'Carregando...';
    pokemon_number.innerHTML = '';
    
    // Aguarda a busca do pokemon
    const data = await fetchpokemon(pokemon);
   
    if (data) {
        pokemon_image.style.display = 'block';
        pokemon_name.innerHTML = data.name;
        pokemon_number.innerHTML = data.id;
        pokemon_image.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchpokemon = data.id;
    } else {
        pokemon_image.style.display = 'none';
        pokemon_name.innerHTML = 'Não encontrado :c';
        pokemon_number.innerHTML = '';
        input.value = "";
    }
};

// Event Listeners
form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderpokemon(input.value.toLowerCase()); 
});

button_prev.addEventListener("click", () => {
    if (searchpokemon > 1) {
        searchpokemon -= 1;
        renderpokemon(searchpokemon);
    }
});

button_next.addEventListener("click", () => {
    searchpokemon += 1;
    renderpokemon(searchpokemon);
});

// Inicializa com o primeiro pokemon
renderpokemon(searchpokemon);