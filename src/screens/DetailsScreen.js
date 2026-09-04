import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';

export default function DetailsScreen({
  book,
  onBack,
  onEdit,
  onDelete,
  onToggleRead,
}) {
function confirmDelete() {
  Alert.alert(
    'Excluir livro',
    'Tem certeza que deseja excluir este livro?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: function () {
          onDelete(book.id);
        },
      },
    ]
  );
}
  const firstLetter = book.title
    ? book.title.charAt(0).toUpperCase()
    : '?';

  return (
    <View style={styles.container}>
      <Header
        title="Detalhes"
        subtitle="Informações do livro"
        onBack={onBack}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* CAPA */}
        <View style={styles.hero}>
          <View style={styles.coverShadow}>
            {book.image ? (
              <Image
                source={{
                  uri: book.image,
                }}
                style={styles.coverImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.cover}>
                <View style={styles.coverTopLine} />

                <Text style={styles.coverLetter}>
                  {firstLetter}
                </Text>

                <View style={styles.coverBottomLine} />
              </View>
            )}
          </View>

          <Text style={styles.title}>
            {book.title}
          </Text>

          <Text style={styles.author}>
            {book.author}
          </Text>

          <View
            style={[
              styles.status,
              book.read
                ? styles.statusRead
                : styles.statusUnread,
            ]}
          >
            <View
              style={[
                styles.statusDot,
                book.read
                  ? styles.statusDotRead
                  : styles.statusDotUnread,
              ]}
            />

            <Text style={styles.statusText}>
              {book.read
                ? 'Você já leu este livro'
                : 'Você ainda não leu este livro'}
            </Text>
          </View>
        </View>

        {/* INFORMAÇÕES */}
        <View style={styles.infoCard}>
          <InfoRow
            label="Gênero"
            value={
              book.genre || 'Não informado'
            }
          />

          <InfoRow
            label="Ano de publicação"
            value={
              book.year || 'Não informado'
            }
          />

          <InfoRow
            label="Status"
            value={
              book.read
                ? 'Lido'
                : 'Quero ler'
            }
            last
          />
        </View>

        {/* DESCRIÇÃO */}
        <View style={styles.descriptionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Sobre o livro
            </Text>
          </View>

          <Text style={styles.description}>
            {book.description
              ? book.description
              : 'Nenhuma descrição foi adicionada para este livro.'}
          </Text>
        </View>

        {/* MARCAR COMO LIDO */}
        <PrimaryButton
          title={
            book.read
              ? 'Marcar como quero ler'
              : 'Marcar como lido'
          }
          onPress={function () {
            onToggleRead(book);
          }}
        />

        {/* EDITAR */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={onEdit}
          activeOpacity={0.8}
        >
          <View style={styles.editIcon}>
            <Text style={styles.editIconText}>
              ✎
            </Text>
          </View>

          <Text style={styles.editText}>
            Editar informações
          </Text>

          <Text style={styles.editArrow}>
            ›
          </Text>
        </TouchableOpacity>

        {/* EXCLUIR */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={confirmDelete}
        >
          <Text style={styles.deleteText}>
            Excluir livro
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function InfoRow({
  label,
  value,
  last,
}) {
  return (
    <View
      style={[
        styles.infoRow,
        !last && styles.infoRowBorder,
      ]}
    >
      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text
        style={styles.infoValue}
        numberOfLines={1}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  content: {
    paddingTop: 3,
    paddingBottom: 35,
  },

  hero: {
    alignItems: 'center',
    paddingVertical: 10,
  },

  coverShadow: {
    shadowColor: '#004777',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 6,
    marginBottom: 20,
  },

  coverImage: {
    width: 125,
    height: 180,
    borderRadius: 15,
  },

  cover: {
    width: 125,
    height: 170,
    borderRadius: 15,
    backgroundColor: '#004777',
    alignItems: 'center',
    justifyContent: 'center',
  },

  coverTopLine: {
    position: 'absolute',
    top: 18,
    width: 65,
    height: 3,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },

  coverLetter: {
    color: '#FFFFFF',
    fontSize: 64,
    fontWeight: '900',
  },

  coverBottomLine: {
    position: 'absolute',
    bottom: 18,
    width: 40,
    height: 3,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  title: {
    color: '#171A2C',
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '900',
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  author: {
    color: '#858A9A',
    fontSize: 14,
    marginTop: 6,
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 13,
  },

  statusRead: {
    backgroundColor: '#EAF9F0',
  },

  statusUnread: {
    backgroundColor: '#F1F2F6',
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 7,
  },

  statusDotRead: {
    backgroundColor: '#25A65A',
  },

  statusDotUnread: {
    backgroundColor: '#999EAC',
  },

  statusText: {
    color: '#555B6D',
    fontSize: 11,
    fontWeight: '800',
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    paddingHorizontal: 17,
    marginTop: 18,
    marginBottom: 13,
    shadowColor: '#1B2140',
    shadowOpacity: 0.045,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 2,
  },

  infoRow: {
    minHeight: 53,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F1F5',
  },

  infoLabel: {
    color: '#9296A5',
    fontSize: 12,
    fontWeight: '700',
  },

  infoValue: {
    color: '#24283A',
    fontSize: 13,
    fontWeight: '800',
    maxWidth: '55%',
  },

  descriptionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 17,
    marginBottom: 18,
    shadowColor: '#1B2140',
    shadowOpacity: 0.045,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 2,
  },

  sectionHeader: {
    marginBottom: 8,
  },

  sectionTitle: {
    color: '#171A2C',
    fontSize: 16,
    fontWeight: '900',
  },

  description: {
    color: '#777C8C',
    fontSize: 13.5,
    lineHeight: 21,
  },

  editButton: {
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E7E8EF',
    marginTop: 11,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  editIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: '#ECEBFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  editIconText: {
    color: '#004777',
    fontSize: 17,
  },

  editText: {
    flex: 1,
    color: '#33374A',
    fontSize: 13.5,
    fontWeight: '800',
  },

  editArrow: {
    color: '#B0B3BE',
    fontSize: 25,
  },

  deleteButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },

  deleteText: {
    color: '#D04A5A',
    fontSize: 13,
    fontWeight: '800',
  },
});