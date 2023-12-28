//dados para aceder à api

const chaveAPI = 'a9a83ee2bf5765e9c4fcb9594ed08ae0';
const nomeUtilizador = 'micaelnisa';
const urlAPI = `https://ws.audioscrobbler.com/2.0/?method=user.getTopAlbums&user=${nomeUtilizador}&api_key=${chaveAPI}&format=json`;
const semImagem = 'https://via.placeholder.com/300';

//array de todos os dados dos albuns
let todosAlbuns = [];
//array dos albuns a ser exibidos na filtragem 
let albunsExibidos = [];

fetch(urlAPI)
    .then(response => response.json())
    .then(data => {
        todosAlbuns = data.topalbums.album;
        albunsExibidos = todosAlbuns.slice(); // Clonar o array
        exibirAlbuns(albunsExibidos);
        filtroTodosArtista(todosAlbuns);
    })
    .catch(error => console.error('Erro', error));

function exibirAlbuns(albuns) {
    const containerTopAlbuns = document.getElementById('topAlbuns');
    containerTopAlbuns.innerHTML = '';

    albuns.forEach(album => {
        //dados para cada album
        const imagemAlbum = album.image[3]['#text'];
        const nomeAlbum = album.name;
        const nomeArtista = album.artist.name;
        const reproducoes = album.playcount;
        const url = album.url;

        const elementoAlbum = document.createElement('div');
        elementoAlbum.classList.add('album');

        //o que vai ser inserido no hmtl
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
//ordem dos albuns
function ordenarAlbuns() {
    const ordemSelecionada = document.getElementById('ordem').value;
    const albunsParaOrdenar = albunsExibidos.length > 0 ? albunsExibidos : todosAlbuns;

    if (ordemSelecionada === 'asc') {
        albunsParaOrdenar.sort((a, b) => a.playcount - b.playcount);
    } else if (ordemSelecionada === 'desc') {
        albunsParaOrdenar.sort((a, b) => b.playcount - a.playcount);
    }

    albunsExibidos = albunsParaOrdenar.slice(); 
    exibirAlbuns(albunsExibidos);
}
//filtro por artista
function filtroTodosArtista(albuns) {
    const filtroArtista = document.getElementById('filtroArtista');
    const artistas = [...new Set(albuns.map(album => album.artist.name))];

    artistas.forEach(artista => {
        const opcao = document.createElement('option');
        opcao.value = artista;
        opcao.textContent = artista;
        filtroArtista.appendChild(opcao);
    });
}
//filtro por artista asc e desc
function filtrarPorArtista() {
    const artistaSelecionado = document.getElementById('filtroArtista').value;

    if (artistaSelecionado === '') {
        albunsExibidos = todosAlbuns.slice(); // Clonar o array
    } else {
        albunsExibidos = todosAlbuns.filter(album => album.artist.name === artistaSelecionado);
    }

    exibirAlbuns(albunsExibidos);
}