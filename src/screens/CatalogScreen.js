import { useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '../components/Header';

export default function CatalogScreen({
  onBack,
  onAddBook,
  onManualRegister,
}) {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  async function pesquisarLivros() {
    if (!search.trim()) {
      Alert.alert(
        'Pesquisar livro',
        'Digite o nome de um livro ou autor.'
      );
      return;
    }

    setLoading(true);

    try {
      const url =
        'https://openlibrary.org/search.json?q=' +
        encodeURIComponent(search.trim()) +
        '&limit=20';

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Erro na pesquisa');
      }

      const data = await response.json();

      const resultados = data.docs.map(function (item) {
        let image = null;

        if (item.cover_i) {
          image =
            'https://covers.openlibrary.org/b/id/' +
            item.cover_i +
            '-L.jpg';
        }

        return {
          id: item.key,

          title:
            item.title || 'Título não informado',

          author:
            item.author_name &&
            item.author_name.length > 0
              ? item.author_name[0]
              : 'Autor não informado',

          genre:
            item.subject &&
            item.subject.length > 0
              ? item.subject[0]
              : '',

          year:
            item.first_publish_year
              ? String(item.first_publish_year)
              : '',

          image: image,

          description: '',

          read: false,
        };
      });

      setBooks(resultados);

    } catch (error) {
      console.log(
        'Erro ao pesquisar livros:',
        error
      );

      Alert.alert(
        'Erro',
        'Não foi possível pesquisar os livros. Verifique sua conexão com a internet.'
      );
    } finally {
      setLoading(false);
    }
  }

  function adicionarLivro(book, status) {
    const livro = {
      title: book.title,

      author: book.author,

      genre: book.genre,

      year: book.year,

      description: book.description,

      image: book.image,

      status: status,

      read: status === 'read',

      favorite: false,
    };

    onAddBook(livro);
  }

  function renderBook({ item }) {
    return (
      <View style={styles.bookCard}>

        {/* CAPA */}

        <View style={styles.coverContainer}>
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={styles.cover}
            />
          ) : (
            <View style={styles.coverEmpty}>
              <Text style={styles.coverLetter}>
                {item.title
                  ? item.title.charAt(0)
                  : '?'}
              </Text>
            </View>
          )}
        </View>

        {/* INFORMAÇÕES */}

        <View style={styles.bookInfo}>

          <Text
            style={styles.bookTitle}
            numberOfLines={2}
          >
            {item.title}
          </Text>

          <Text
            style={styles.bookAuthor}
            numberOfLines={1}
          >
            {item.author}
          </Text>

          {item.year ? (
            <Text style={styles.bookYear}>
              {item.year}
            </Text>
          ) : null}

          {/* BOTÕES */}

          <View style={styles.buttons}>

            <TouchableOpacity
              style={styles.wantButton}
              onPress={function () {
                adicionarLivro(
                  item,
                  'want'
                );
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.wantButtonText}>
                Quero ler
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.readButton}
              onPress={function () {
                adicionarLivro(
                  item,
                  'read'
                );
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.readButtonText}>
                Lido
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Header
        title="Adicionar livro"
        subtitle="Pesquise no catálogo"
        onBack={onBack}
      />

      {/* PESQUISA */}

      <View style={styles.searchArea}>

        <View style={styles.searchBox}>

          <Text style={styles.searchIcon}>
            🔍
          </Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Digite título ou autor..."
            placeholderTextColor="#A5A8B5"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={pesquisarLivros}
            returnKeyType="search"
            underlineColorAndroid="transparent"
          />

        </View>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={pesquisarLivros}
          activeOpacity={0.8}
        >
          <Text style={styles.searchButtonText}>
            Pesquisar
          </Text>
        </TouchableOpacity>

      </View>

      {/* CADASTRO MANUAL */}

      <TouchableOpacity
        style={styles.manualButton}
        onPress={onManualRegister}
        activeOpacity={0.8}
      >
        <View style={styles.manualIcon}>
          <Text style={styles.manualIconText}>
            +
          </Text>
        </View>

        <View style={styles.manualInfo}>
          <Text style={styles.manualTitle}>
            Cadastrar do zero
          </Text>

          <Text style={styles.manualText}>
            Adicione um livro manualmente
          </Text>
        </View>

        <Text style={styles.manualArrow}>
          ›
        </Text>
      </TouchableOpacity>

      {/* RESULTADOS */}

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            size="small"
            color="#4F46E5"
          />

          <Text style={styles.loadingText}>
            Pesquisando livros...
          </Text>
        </View>
      ) : (
        <FlatList
          data={books}
          keyExtractor={function (item, index) {
            return item.id + '-' + index;
          }}
          renderItem={renderBook}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            search.length > 0 ? (
              <View style={styles.empty}>
                <Text style={styles.emptyIcon}>
                  🔎
                </Text>

                <Text style={styles.emptyTitle}>
                  Nenhum livro encontrado
                </Text>

                <Text style={styles.emptyText}>
                  Tente pesquisar por outro título ou autor.
                </Text>
              </View>
            ) : (
              <View style={styles.initial}>
                <Text style={styles.initialIcon}>
                  📚
                </Text>

                <Text style={styles.initialTitle}>
                  Encontre seu próximo livro
                </Text>

                <Text style={styles.initialText}>
                  Pesquise um livro para adicioná-lo
                  à sua biblioteca.
                </Text>
              </View>
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F7F8FC',
  },

  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 12,
  },

  searchBox: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E7E8EF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
  },

  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    color: '#171A2C',
    fontSize: 13,
    paddingVertical: 0,
    borderWidth: 0,
    outlineWidth: 0,
    outlineColor: 'transparent',
    backgroundColor: 'transparent',
  },

  searchButton: {
    height: 48,
    paddingHorizontal: 15,
    marginLeft: 8,
    borderRadius: 15,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },

  manualButton: {
    height: 65,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E7E8EF',
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  manualIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: '#ECEBFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  manualIconText: {
    color: '#4F46E5',
    fontSize: 24,
  },

  manualInfo: {
    flex: 1,
    marginLeft: 11,
  },

  manualTitle: {
    color: '#24283A',
    fontSize: 13,
    fontWeight: '900',
  },

  manualText: {
    color: '#9296A5',
    fontSize: 10.5,
    marginTop: 3,
  },

  manualArrow: {
    color: '#B0B3BE',
    fontSize: 25,
  },

  list: {
    paddingBottom: 30,
  },

  bookCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 13,
    marginBottom: 12,
    flexDirection: 'row',

    shadowColor: '#1B2140',
    shadowOpacity: 0.045,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 2,
  },

  coverContainer: {
    width: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cover: {
    width: 78,
    height: 116,
    borderRadius: 7,
    resizeMode: 'cover',
  },

  coverEmpty: {
    width: 78,
    height: 116,
    borderRadius: 7,
    backgroundColor: '#004777',
    alignItems: 'center',
    justifyContent: 'center',
  },

  coverLetter: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
  },

  bookInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },

  bookTitle: {
    color: '#171A2C',
    fontSize: 15,
    lineHeight: 19,
    fontWeight: '900',
  },

  bookAuthor: {
    color: '#777C8C',
    fontSize: 12,
    marginTop: 5,
  },

  bookYear: {
    color: '#A0A4B1',
    fontSize: 10.5,
    marginTop: 3,
  },

  buttons: {
    flexDirection: 'row',
    marginTop: 12,
  },

  wantButton: {
    height: 32,
    paddingHorizontal: 11,
    borderRadius: 9,
    backgroundColor: '#ECEBFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7,
  },

  wantButtonText: {
    color: '#4F46E5',
    fontSize: 10,
    fontWeight: '900',
  },

  readButton: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 9,
    backgroundColor: '#EAF9F0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  readButtonText: {
    color: '#25A65A',
    fontSize: 10,
    fontWeight: '900',
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    color: '#9296A5',
    fontSize: 12,
    marginTop: 10,
  },

  empty: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    paddingVertical: 35,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

  emptyIcon: {
    fontSize: 30,
    marginBottom: 10,
  },

  emptyTitle: {
    color: '#171A2C',
    fontSize: 15,
    fontWeight: '900',
  },

  emptyText: {
    color: '#9296A5',
    fontSize: 11.5,
    textAlign: 'center',
    marginTop: 6,
  },

  initial: {
    alignItems: 'center',
    paddingTop: 55,
    paddingHorizontal: 30,
  },

  initialIcon: {
    fontSize: 45,
    marginBottom: 12,
  },

  initialTitle: {
    color: '#171A2C',
    fontSize: 17,
    fontWeight: '900',
    textAlign: 'center',
  },

  initialText: {
    color: '#9296A5',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 6,
  },
});