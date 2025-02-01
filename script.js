const searchInput = document.getElementById('search-input'); // Obtém a referência ao campo de entrada de pesquisa
const resultArtist = document.getElementById("result-artist"); // Referência ao contêiner que exibirá os resultados dos artistas
const resultPlaylist = document.getElementById('result-playlists'); // Referência ao contêiner das playlists que será ocultado

// Função para fazer requisição à API local e processar os dados
function requestApi(searchTerm) {
    fetch('http://localhost:3000/artists') // Faz uma requisição GET à API local
        .then((response) => response.json()) // Converte a resposta para JSON
        .then((result) => displayResults(result, searchTerm)); // Chama a função para exibir os resultados filtrados
}

// Função para exibir os resultados filtrados
function displayResults(result, searchTerm) {
    resultPlaylist.classList.add("hidden"); // Oculta o contêiner das playlists
    const gridContainer = document.querySelector('.grid-container'); // Referência ao contêiner onde os cartões de artistas serão exibidos
    gridContainer.innerHTML = ''; // Limpa os resultados anteriores para evitar duplicações

    // Filtra os artistas com base no termo de busca, ignorando maiúsculas e minúsculas
    const filteredArtists = result.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm)
    );

    // Itera sobre os artistas filtrados e cria cartões para exibição
    filteredArtists.forEach(artist => {
        const artistCard = document.createElement('div'); // Cria um elemento <div> para o cartão do artista
        artistCard.classList.add('artist-card'); // Adiciona a classe CSS para estilização

        // Define o conteúdo HTML do cartão com imagem e nome do artista
        artistCard.innerHTML = `
            <div class="card-img">
                <img class="artist-img" src="${artist.urlImg}" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span> <!-- Ícone de play sobre a imagem -->
                </div>
            </div>
            <div class="card-text">
                <span class="artist-name">${artist.name}</span> <!-- Nome do artista -->
                <span class="artist-categorie">Artista</span> <!-- Texto fixo "Artista" -->
            </div>
        `;
        gridContainer.appendChild(artistCard); // Adiciona o cartão ao contêiner
    });

    resultArtist.classList.remove('hidden'); // Exibe o contêiner de resultados de artistas
}

// Evento que monitora a entrada de texto no campo de pesquisa
document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase().trim(); // Normaliza o termo de busca (minúsculas e sem espaços extras)

    if (searchTerm === '') { // Caso o campo esteja vazio
        resultPlaylist.classList.remove('hidden'); // Exibe novamente o contêiner de playlists
        resultArtist.classList.add('hidden'); // Oculta os resultados de artistas
        return; // Interrompe a execução da função
    }

    requestApi(searchTerm); // Faz a requisição à API com o termo de busca
});

//Código do terminal (GIT BASH) para lançar a API local: json-server --watch api-artists/artists.json