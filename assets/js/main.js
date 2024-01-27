const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const todosPokemons = [];

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

// pkemon detalhes -- modal
function convertPokemonModal(pokemon) {
    return `
        <div class="modal-content ${pokemon.type}">
            <div class="topModal">
                <span id="fecharModal">&larr;</span>
                <button class="heart">&hearts;</button>
            </div>

            <div class="pokemonModal">
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <span class="number">${pokemon.number}</span>
                </div>
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
                <div class="menu">
                    <div onclick="mostrarDiv('about')" id="aboutDiv">About</div>
                    <div onclick="mostrarDiv('baseStats')" id="baseStatsDiv">Base Stats</div>
                    <div onclick="mostrarDiv('moves')" id="movesDiv">Moves</div>
                </div>
                <div class="contentModal aboutModal" id="about">
                    <div>
                        <ul class="uull1">
                            <li><span>Abilities:</span></li>
                        </ul>
                        <ul class="uull2">
                            <li>${pokemon.abilities.map((ability) => `${ability}`).join(', ')}</li>
                        </ul>
                    </div>
                    <div>
                        <ul class="uull1">
                            <li><span>Height:</span></li>
                        </ul>
                        <ul class="uull2">
                            <li>${pokemon.height}</li>
                        </ul>
                    </div>
                    <div>
                        <ul class="uull1">
                            <li><span>Weight:</span></li>
                        </ul>
                        <ul class="uull2">
                            <li>${pokemon.weight}</li>
                        </ul>
                    </div>
                </div>
                <div class="contentModal" id="baseStats">
                    ${pokemon.stats.map((stat, index) => `<div><ul class="uull1">
                        <li><span>${stat}:</span>&nbsp;${pokemon.baseStats.filter((base, ind) => {
        if (ind === index) {
            return base;
        }
    })}&nbsp;</li>
                    </ul>
                    <ul class="uull2">
                        <li class="hp">
                            <div style="width: ${pokemon.baseStats.filter((base, ind) => ind === index).map((base, ind) => base/1.54)}%;"></div>
                        </li>
                    </ul></div>`).join('')}
                </div>
                <div class="contentModal aboutModal" id="moves">
                    <div>
                        <p>
                            ${pokemon.moves.map((move) => `<span>${move}</span>`).join(', ')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `
}

// pkemon detalhes -- modal

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml;
        //
        pokemons.forEach((pokemon) => todosPokemons.push(pokemon));
        //
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})