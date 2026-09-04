import { ScrollView, StyleSheet } from 'react-native';
import { Header } from '../components/Header';
import { BookCard } from '../components/BookCard';
import { EmptyScreen } from './EmptyScreen';

export function FavoritesScreen({ books, onNavigate, onToggleRead, onToggleFavorite, onDelete }) {
  const favoriteBooks = books.filter((b) => b.favorite);

  return (
    <ScrollView style={styles.screenContainer} contentContainerStyle={styles.screenContent}>
      <Header
        title="Favoritos"
        subtitle="Suas obras preferidas da biblioteca"
      />

      {favoriteBooks.length === 0 ? (
        <EmptyScreen
          title="Nenhum favorito ainda"
          message="Toque na estrela de qualquer livro para adicioná-lo à sua lista de destaques."
        />
      ) : (
        favoriteBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onPress={() => onNavigate('Details', { bookId: book.id })}
            onDelete={() => onDelete(book.id)}
            onToggleRead={() => onToggleRead(book.id)}
            onToggleFavorite={() => onToggleFavorite(book.id)}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  screenContent: {
    padding: 20,
    paddingBottom: 40,
  },
});