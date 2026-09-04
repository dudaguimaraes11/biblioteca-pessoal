import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import EmptyScreen from './src/screens/EmptyScreen';
import CatalogScreen from './src/screens/CatalogScreen';

import {
  createBook,
  deleteBook,
  getBooks,
  updateBook,
} from './src/services/storage';

export default function App() {
  const [books, setBooks] = useState([]);
  const [screen, setScreen] = useState('home');
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      const savedBooks = await getBooks();

      setBooks(savedBooks);
    } catch (error) {
      console.log(
        'Erro ao carregar livros:',
        error
      );
    } finally {
      setLoading(false);
    }
  }

  /* CADASTRO MANUAL */

  async function handleCreateBook(bookData) {
    try {
      const newBook = await createBook(bookData);

      setBooks(function (currentBooks) {
        return [
          newBook,
          ...currentBooks,
        ];
      });

      setScreen('home');

    } catch (error) {
      console.log(
        'Erro ao criar livro:',
        error
      );

      throw error;
    }
  }

  /* ADICIONAR LIVRO DO CATÁLOGO */

  async function handleAddCatalogBook(bookData) {
    try {
      const newBook =
        await createBook(bookData);

      setBooks(function (currentBooks) {
        return [
          newBook,
          ...currentBooks,
        ];
      });

      setScreen('home');

    } catch (error) {
      console.log(
        'Erro ao adicionar livro:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível adicionar o livro.'
      );
    }
  }

  /* ATUALIZAR */

  async function handleUpdateBook(bookData) {
    try {
      const updatedBook =
        await updateBook(bookData);

      if (!updatedBook) {
        Alert.alert(
          'Erro',
          'Livro não encontrado.'
        );

        return;
      }

      setBooks(function (currentBooks) {
        return currentBooks.map(
          function (book) {
            if (
              String(book.id) ===
              String(updatedBook.id)
            ) {
              return updatedBook;
            }

            return book;
          }
        );
      });

      setSelectedBook(updatedBook);
      setScreen('details');

    } catch (error) {
      console.log(
        'Erro ao atualizar livro:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível atualizar o livro.'
      );
    }
  }

  /* EXCLUIR */

  async function handleDeleteBook(bookId) {
    try {
      console.log(
        'Tentando excluir:',
        bookId
      );

      const deleted =
        await deleteBook(bookId);

      if (!deleted) {
        Alert.alert(
          'Erro',
          'Não foi possível encontrar esse livro.'
        );

        return;
      }

      setBooks(function (currentBooks) {
        return currentBooks.filter(
          function (book) {
            return (
              String(book.id) !==
              String(bookId)
            );
          }
        );
      });

      setSelectedBook(null);
      setScreen('home');

      console.log(
        'Livro removido da biblioteca.'
      );

    } catch (error) {
      console.log(
        'Erro ao excluir livro:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível excluir o livro.'
      );
    }
  }

  /* MARCAR LIDO / NÃO LIDO */

  async function handleToggleRead(book) {
    const updatedBook = {
      ...book,

      read: !book.read,

      status: !book.read
        ? 'read'
        : 'want',
    };

    await handleUpdateBook(
      updatedBook
    );
  }

  /* ABRIR DETALHES */

  function openDetails(book) {
    setSelectedBook(book);
    setScreen('details');
  }

  /* ABRIR CATÁLOGO */

  function openCatalog() {
    setScreen('catalog');
  }

  /* ABRIR CADASTRO MANUAL */

  function openRegister() {
    setSelectedBook(null);
    setScreen('register');
  }

  /* EDITAR */

  function openEdit() {
    setScreen('register');
  }

  /* VOLTAR */

  function goHome() {
    setSelectedBook(null);
    setScreen('home');
  }

  /* LOADING */

  if (loading) {
    return (
      <SafeAreaView
        style={styles.loadingContainer}
      >
        <StatusBar style="dark" />

        <View
          style={styles.loadingContent}
        >
          <View
            style={styles.loadingLogo}
          >
            <View
              style={styles.loadingBook}
            />
          </View>

          <ActivityIndicator
            size="small"
            color="#4F46E5"
            style={
              styles.loadingIndicator
            }
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar style="dark" />

      <View style={styles.content}>

        {/* HOME */}

        {screen === 'home' &&
          books.length > 0 && (
            <HomeScreen
              books={books}
              onAdd={openCatalog}
              onOpenDetails={
                openDetails
              }
            />
          )}

        {/* HOME VAZIA */}

        {screen === 'home' &&
          books.length === 0 && (
            <EmptyScreen
              onAdd={openCatalog}
            />
          )}

        {/* CATÁLOGO */}

        {screen === 'catalog' && (
          <CatalogScreen
            onBack={goHome}
            onAddBook={
              handleAddCatalogBook
            }
            onManualRegister={
              openRegister
            }
          />
        )}

        {/* CADASTRO MANUAL */}

        {screen === 'register' && (
          <RegisterScreen
            book={selectedBook}

            onBack={
              selectedBook
                ? function () {
                    setScreen(
                      'details'
                    );
                  }
                : goHome
            }

            onSave={
              selectedBook
                ? handleUpdateBook
                : handleCreateBook
            }
          />
        )}

        {/* DETALHES */}

        {screen === 'details' &&
          selectedBook && (
            <DetailsScreen
              book={selectedBook}

              onBack={goHome}

              onEdit={openEdit}

              onDelete={
                handleDeleteBook
              }

              onToggleRead={
                handleToggleRead
              }
            />
          )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },

  content: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#F7F8FC',
  },

  loadingContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingLogo: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingBook: {
    width: 27,
    height: 34,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',

    transform: [
      {
        rotate: '-8deg',
      },
    ],
  },

  loadingIndicator: {
    marginTop: 24,
  },
});