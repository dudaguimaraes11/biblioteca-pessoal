import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKS_KEY = '@minha_biblioteca:livros';

const livrosIniciais = [
  {
    id: '1',
    title: 'Orgulho e Preconceito',
    author: 'Jane Austen',
    genre: 'Romance',
    year: '1813',
    description:
      'História de romance entre Elizabeth Bennet e Mr. Darcy.',
    image: null,
    status: 'read',
    favorite: false,
    createdAt: new Date().toISOString(),
    read: true,
  },

  {
    id: '2',
    title: 'O Pequeno Príncipe',
    author: 'Antoine de Saint-Exupéry',
    genre: 'Fantasia',
    year: '1943',
    description:
      'Uma história sobre amizade, amor e as relações humanas.',
    image: null,
    status: 'read',
    favorite: true,
    createdAt: new Date().toISOString(),
    read: true,
  },

  {
    id: '3',
    title: 'Harry Potter e a Pedra Filosofal',
    author: 'J. K. Rowling',
    genre: 'Fantasia',
    year: '1997',
    description:
      'Harry Potter descobre que é um bruxo e começa seus estudos em Hogwarts.',
    image: null,
    status: 'reading',
    favorite: true,
    createdAt: new Date().toISOString(),
    read: false,
  },

  {
    id: '4',
    title: 'O Hobbit',
    author: 'J. R. R. Tolkien',
    genre: 'Fantasia',
    year: '1937',
    description:
      'Bilbo Bolseiro embarca em uma grande aventura pela Terra-média.',
    image: null,
    status: 'want',
    favorite: false,
    createdAt: new Date().toISOString(),
    read: false,
  },

  {
    id: '5',
    title: 'Dom Casmurro',
    author: 'Machado de Assis',
    genre: 'Romance',
    year: '1899',
    description:
      'Clássico da literatura brasileira narrado por Bentinho.',
    image: null,
    status: 'want',
    favorite: false,
    createdAt: new Date().toISOString(),
    read: false,
  },
];

function normalizeBook(book) {
  return {
    ...book,

    status:
      book.status ||
      (book.read ? 'read' : 'want'),

    favorite: Boolean(book.favorite),

    image: book.image || null,

    createdAt:
      book.createdAt ||
      new Date().toISOString(),
  };
}

export async function getBooks() {
  try {
    const data = await AsyncStorage.getItem(BOOKS_KEY);

    // PRIMEIRA VEZ QUE O APP É ABERTO
    if (!data) {
      await AsyncStorage.setItem(
        BOOKS_KEY,
        JSON.stringify(livrosIniciais)
      );

      return livrosIniciais;
    }

    const books = JSON.parse(data);

    return books.map(function (book) {
      return normalizeBook(book);
    });

  } catch (error) {
    console.log(
      'Erro ao buscar livros:',
      error
    );

    return [];
  }
}

async function saveBooks(books) {
  await AsyncStorage.setItem(
    BOOKS_KEY,
    JSON.stringify(books)
  );
}

export async function createBook(bookData) {
  const books = await getBooks();

  const newBook = {
    id: Date.now().toString(),

    title: bookData.title.trim(),

    author: bookData.author.trim(),

    genre: bookData.genre
      ? bookData.genre.trim()
      : '',

    year: bookData.year
      ? bookData.year.trim()
      : '',

    description: bookData.description
      ? bookData.description.trim()
      : '',

    image: bookData.image || null,

    status:
      bookData.status || 'want',

    favorite:
      Boolean(bookData.favorite),

    createdAt:
      new Date().toISOString(),

    read:
      bookData.status === 'read',
  };

  const updatedBooks = [
    newBook,
    ...books,
  ];

  await saveBooks(updatedBooks);

  return newBook;
}

export async function updateBook(updatedBook) {
  const books = await getBooks();

  const newBooks = books.map(function (book) {
    if (book.id !== updatedBook.id) {
      return book;
    }

    return {
      ...book,
      ...updatedBook,

      title: updatedBook.title.trim(),

      author: updatedBook.author.trim(),

      genre: updatedBook.genre
        ? updatedBook.genre.trim()
        : '',

      year: updatedBook.year
        ? updatedBook.year.trim()
        : '',

      description: updatedBook.description
        ? updatedBook.description.trim()
        : '',

      image:
        updatedBook.image ||
        null,

      status:
        updatedBook.status ||
        'want',

      favorite:
        Boolean(updatedBook.favorite),

      read:
        updatedBook.status === 'read',
    };
  });

  await saveBooks(newBooks);

  return newBooks.find(function (book) {
    return book.id === updatedBook.id;
  });
}

export async function deleteBook(bookId) {
  const books = await getBooks();

  const newBooks = books.filter(function (book) {
    return String(book.id) !== String(bookId);
  });

  await saveBooks(newBooks);

  return newBooks.length !== books.length;
}