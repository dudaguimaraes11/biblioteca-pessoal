# Biblioteca Pessoal

Aplicativo mobile para organizar uma biblioteca pessoal, acompanhar o progresso de leitura e
consultar livros disponíveis na Open Library.

## Descrição técnica

O projeto foi desenvolvido com React Native utilizando Expo SDK 54. A aplicação usa componentes
funcionais e hooks do React para controlar o estado, a navegação entre telas e o carregamento dos
livros.

As informações da biblioteca são persistidas localmente com
`@react-native-async-storage/async-storage`, permitindo cadastrar, editar, excluir, favoritar e
alterar o status de leitura dos livros. Na primeira execução, o aplicativo cria uma coleção inicial
de livros.

O catálogo integrado consulta a API pública da Open Library e permite adicionar os resultados à
biblioteca com os status "Quero ler" ou "Lido". A interface também oferece pesquisa por título,
autor ou gênero, visualização de detalhes e acompanhamento percentual dos livros lidos.

### Principais tecnologias

- React 19.1.0
- React Native 0.81.5
- Expo SDK 54
- Expo Image Picker para seleção de imagens
- AsyncStorage para persistência local
- React Native Web para execução no navegador

### Organização do projeto

- `App.js`: controla o estado global da aplicação e o fluxo entre as telas.
- `src/screens/`: telas de início, catálogo, cadastro, detalhes, favoritos e estados vazios.
- `src/components/`: componentes reutilizáveis da interface.
- `src/services/storage.js`: leitura, criação, atualização e exclusão dos livros no armazenamento
  local.

## Integrantes

- Manuela Freitas
- Maria Eduarda Guimarães
- Ana Júlia Baggio

## Instruções de execução

### Requisitos

- Node.js instalado.
- npm instalado.
- Expo Go no celular para testar o aplicativo, ou um emulador Android/iOS configurado.

### Instalação

Na pasta do projeto, execute:

```bash
npm install
```

### Inicialização

Inicie o servidor do Expo com:

```bash
npm start
```

Depois, escaneie o QR Code com o Expo Go ou use um dos comandos abaixo:

```bash
npm run android
npm run ios
npm run web
```

O catálogo de livros precisa de conexão com a internet para consultar a API da Open Library. Os
livros cadastrados e as alterações realizadas ficam salvos localmente no dispositivo.
