const modal = document.getElementById('modal')

document.getElementById('pokemonList').addEventListener('click', function (event) {
   if (event.target.closest('li')) {
      var firstName = event.target.closest('li').querySelector('.name').textContent;

      // Busca pelo nome do Pokémon"
      const conteudoName = todosPokemons.find((pokemon) => pokemon.name === firstName);

      // Verifica se encontrou o Pokémon e acessa suas informações
      if (conteudoName) {
         modal.innerHTML = convertPokemonModal(conteudoName);
      } else {
         console.log("Pokémon não encontrado.");
      }

      document.getElementById('modal').style.display = 'block';

      document.getElementById('fecharModal').addEventListener('click', function () {
         document.getElementById('modal').style.display = 'none';
      });
   }
});