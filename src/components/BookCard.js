import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function BookCard({
  book,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* CAPA */}
      {book.image ? (
        <Image
          source={{ uri: book.image }}
          style={styles.cover}
        />
      ) : (
        <View style={styles.coverPlaceholder}>
          <Text style={styles.placeholderIcon}>
            📖
          </Text>
        </View>
      )}

      {/* INFORMAÇÕES */}
      <View style={styles.info}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {book.title}
        </Text>

        <Text
          style={styles.author}
          numberOfLines={1}
        >
          {book.author}
        </Text>

        <View style={styles.bottom}>
          <View
            style={[
              styles.status,
              book.read
                ? styles.statusRead
                : styles.statusWant,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                book.read
                  ? styles.statusTextRead
                  : styles.statusTextWant,
              ]}
            >
              {book.read
                ? 'Lido'
                : 'Quero ler'}
            </Text>
          </View>
        </View>
      </View>

      {/* SETA */}
      <Text style={styles.arrow}>
        ›
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 10,
    marginBottom: 10,

    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#E7E8EF',

    shadowColor: '#1B2140',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 2,
  },

  /* CAPA EM FORMATO DE LIVRO */

  cover: {
    width: 62,
    height: 88,
    borderRadius: 7,
    resizeMode: 'cover',
  },

  coverPlaceholder: {
    width: 62,
    height: 88,
    borderRadius: 7,
    backgroundColor: '#ECEBFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  placeholderIcon: {
    fontSize: 24,
  },

  /* INFORMAÇÕES */

  info: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
    minHeight: 75,
    justifyContent: 'center',
  },

  title: {
    color: '#171A2C',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 19,
  },

  author: {
    color: '#777B8A',
    fontSize: 11.5,
    marginTop: 4,
  },

  bottom: {
    flexDirection: 'row',
    marginTop: 9,
  },

  status: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
  },

  statusRead: {
    backgroundColor: '#E2F7ED',
  },

  statusWant: {
    backgroundColor: '#ECEBFF',
  },

  statusText: {
    fontSize: 9.5,
    fontWeight: '800',
  },

  statusTextRead: {
    color: '#15945B',
  },

  statusTextWant: {
    color: '#4F46E5',
  },

  arrow: {
    color: '#9296A5',
    fontSize: 30,
    fontWeight: '300',
    marginRight: 3,
  },
});