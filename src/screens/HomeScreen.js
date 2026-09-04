import { useState } from 'react';

import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import BookCard from '../components/BookCard';

export default function HomeScreen({
  books,
  onAdd,
  onOpenDetails,
}) {
  const [search, setSearch] = useState('');

  const readCount = books.filter(function (book) {
    return book.read;
  }).length;

  const progress = books.length > 0
    ? Math.round((readCount / books.length) * 100)
    : 0;

  // FILTRO DA PESQUISA
  const filteredBooks = books.filter(function (book) {
    const searchText = search.toLowerCase();

    const title = (book.title || '').toLowerCase();
    const author = (book.author || '').toLowerCase();
    const genre = (book.genre || '').toLowerCase();

    return (
      title.includes(searchText) ||
      author.includes(searchText) ||
      genre.includes(searchText)
    );
  });

  return (
    <View style={styles.container}>
      <Header
        title="Minha Biblioteca"
        subtitle="Sua coleção pessoal"
        rightLabel={`${books.length} ${books.length === 1 ? 'livro' : 'livros'}`}
      />

      <FlatList
        data={filteredBooks}
        keyExtractor={function (item) {
          return item.id;
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}

        ListHeaderComponent={
          <View>
            {/* BARRA DE PESQUISA */}
            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>
                🔍
              </Text>

              <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar livro, autor ou gênero..."
                placeholderTextColor="#A5A8B5"
                value={search}
                onChangeText={setSearch}
              />

              {search.length > 0 && (
                <TouchableOpacity
                  onPress={function () {
                    setSearch('');
                  }}
                  style={styles.clearButton}
                >
                  <Text style={styles.clearText}>
                    ×
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* CARD DE PROGRESSO */}
            <View style={styles.progressCard}>
              <View style={styles.progressTop}>
                <View>
                  <Text style={styles.progressSmall}>
                    SEU PROGRESSO
                  </Text>

                  <Text style={styles.progressTitle}>
                    Continue lendo
                  </Text>
                </View>

                <View style={styles.percentCircle}>
                  <Text style={styles.percentText}>
                    {progress}%
                  </Text>
                </View>
              </View>

              <View style={styles.progressInfo}>
                <Text style={styles.progressCount}>
                  {readCount} de {books.length} livros lidos
                </Text>

                <Text style={styles.progressPercent}>
                  {progress}%
                </Text>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${progress}%`,
                    },
                  ]}
                />
              </View>
            </View>

            {/* TÍTULO DA LISTA */}
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>
                  Sua coleção
                </Text>

                <Text style={styles.sectionSubtitle}>
                  {search.length > 0
                    ? `${filteredBooks.length} resultado(s) encontrado(s)`
                    : 'Toque em um livro para ver detalhes'}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.addButton}
                onPress={onAdd}
                activeOpacity={0.8}
              >
                <Text style={styles.addIcon}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }

        renderItem={function ({ item }) {
          return (
            <BookCard
              book={item}
              onPress={function () {
                onOpenDetails(item);
              }}
            />
          );
        }}

        ListEmptyComponent={
          <View style={styles.emptySearch}>
            <Text style={styles.emptyIcon}>
              🔎
            </Text>

            <Text style={styles.emptyTitle}>
              Nenhum livro encontrado
            </Text>

            <Text style={styles.emptyText}>
              Tente pesquisar por outro título, autor ou gênero.
            </Text>
          </View>
        }

        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {books.length === 1
                ? '1 livro na sua biblioteca'
                : `${books.length} livros na sua biblioteca`}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  list: {
    paddingBottom: 30,
  },

  // BARRA DE PESQUISA
  searchContainer: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E7E8EF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginTop: 8,
    marginBottom: 18,
  },

  searchIcon: {
    fontSize: 17,
    marginRight: 9,
  },

  searchInput: {
  flex: 1,
  color: '#171A2C',
  fontSize: 13,
  paddingVertical: 0,

  borderWidth: 0,
  borderColor: 'transparent',

  outlineWidth: 0,
  outlineColor: 'transparent',
  outlineStyle: 'none',

  backgroundColor: 'transparent',

  ...(Platform.OS === 'web'
    ? {
        outline: 'none',
        border: 'none',
        boxShadow: 'none',
      }
    : {}),
},

  clearButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F1F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  clearText: {
    color: '#777B8A',
    fontSize: 20,
    lineHeight: 22,
  },

  progressCard: {
    backgroundColor: '#004777',
    borderRadius: 24,
    padding: 20,
    marginBottom: 25,

    shadowColor: '#06041b',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 5,
  },

  progressTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  progressSmall: {
    color: '#C9C7FF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
  },

  progressTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 5,
  },

  percentCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  percentText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
  },

  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 22,
    marginBottom: 8,
  },

  progressCount: {
    color: '#DDDDFE',
    fontSize: 12,
    fontWeight: '600',
  },

  progressPercent: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },

  progressTrack: {
    height: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
    overflow: 'hidden',
  },

  progressBar: {
    height: 8,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  sectionTitle: {
    color: '#0f0f0f',
    fontSize: 20,
    fontWeight: '900',
  },

  sectionSubtitle: {
    color: '#9296A5',
    fontSize: 11.5,
    marginTop: 4,
  },

  addButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E8EF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addIcon: {
    color: '#004777',
    fontSize: 27,
    fontWeight: '400',
    marginTop: -2,
  },

  // NENHUM RESULTADO
  emptySearch: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7E8EF',
  },

  emptyIcon: {
    fontSize: 30,
    marginBottom: 10,
  },

  emptyTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },

  emptyText: {
    color: '#9296A5',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 10,
  },

  footerText: {
    color: '#B0B3BE',
    fontSize: 11,
    fontWeight: '600',
  },
});