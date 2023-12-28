const chaveAPI = 'a9a83ee2bf5765e9c4fcb9594ed08ae0';
const nomeUtilizador = 'micaelnisa';
const urlAPI = `https://ws.audioscrobbler.com/2.0/?method=user.getTopAlbums&user=${nomeUtilizador}&api_key=${chaveAPI}&format=json`;
const semImagem = 'https://via.placeholder.com/300';

let todosAlbuns = [];
let albunsExibidos = [];

fetch(urlAPI)
    .then(response => response.json())
    .then(data => {
        todosAlbuns = data.topalbums.album;
        albunsExibidos = todosAlbuns.slice(); // Clonar o array
        exibirAlbuns(albunsExibidos);
        popularFiltroArtista(todosAlbuns);
    })
    .catch(error => console.error('Erro ao obter dados da API do Last.fm:', error));

function exibirAlbuns(albuns) {
    const containerTopAlbuns = document.getElementById('topAlbuns');
    containerTopAlbuns.innerHTML = '';

    albuns.forEach(album => {
        const imagemAlbum = album.image[3]['#text'];
        const nomeAlbum = album.name;
        const nomeArtista = album.artist.name;
        const reproducoes = album.playcount;
        const url = album.url;

        const elementoAlbum = document.createElement('div');
        elementoAlbum.classList.add('album');

        const urlImagem = imagemAlbum ? imagemAlbum : semImagem;
        elementoAlbum.innerHTML = `
        <div> 
        <p class="plays"> ${reproducoes}x</p>
        
            <a href="${url}" target="_blank">
                <img src="${urlImagem}" alt="Capa do Álbum">
                
            </a>
            </div>
            <p>
    <span class="nomeAlbum">${nomeAlbum}</span>
    <br>
    <span class="nomeArtista">${nomeArtista}</span>
</p>

            
        `;

        containerTopAlbuns.appendChild(elementoAlbum);
    });
}

function ordenarAlbuns() {
    const ordemSelecionada = document.getElementById('ordem').value;
    const albunsParaOrdenar = albunsExibidos.length > 0 ? albunsExibidos : todosAlbuns;

    if (ordemSelecionada === 'asc') {
        albunsParaOrdenar.sort((a, b) => a.playcount - b.playcount);
    } else if (ordemSelecionada === 'desc') {
        albunsParaOrdenar.sort((a, b) => b.playcount - a.playcount);
    }

    albunsExibidos = albunsParaOrdenar.slice(); // Clonar o array ordenado
    exibirAlbuns(albunsExibidos);
}

function popularFiltroArtista(albuns) {
    const filtroArtista = document.getElementById('filtroArtista');
    const artistasUnicos = [...new Set(albuns.map(album => album.artist.name))];

    artistasUnicos.forEach(artista => {
        const opcao = document.createElement('option');
        opcao.value = artista;
        opcao.textContent = artista;
        filtroArtista.appendChild(opcao);
    });
}

function filtrarPorArtista() {
    const artistaSelecionado = document.getElementById('filtroArtista').value;

    if (artistaSelecionado === '') {
        albunsExibidos = todosAlbuns.slice(); // Clonar o array
    } else {
        albunsExibidos = todosAlbuns.filter(album => album.artist.name === artistaSelecionado);
    }

    exibirAlbuns(albunsExibidos);
}






let reproducoes = 0;
