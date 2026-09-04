import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';

export default function EmptyScreen({ onAdd }) {
  return (
    <View style={styles.container}>
      <Header
        title="Minha Biblioteca"
        subtitle="Sua coleção pessoal"
      />

      <View style={styles.content}>
        <View style={styles.illustration}>
          <View style={styles.bookBack} />
          <View style={styles.bookMiddle} />

          <View style={styles.bookFront}>
            <View style={styles.bookLine} />
            <View style={styles.bookLineSmall} />

            <Text style={styles.bookLetter}>
              B
            </Text>
          </View>
        </View>

        <Text style={styles.title}>
          Sua biblioteca está vazia
        </Text>

        <Text style={styles.description}>
          Comece adicionando seu primeiro livro
          e organize sua coleção pessoal de forma
          simples e bonita.
        </Text>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Adicionar primeiro livro"
            onPress={onAdd}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 70,
  },

  illustration: {
    width: 170,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },

  bookBack: {
    position: 'absolute',
    width: 75,
    height: 102,
    borderRadius: 8,
    backgroundColor: '#DCDFFF',
    transform: [
      {
        rotate: '10deg',
      },
      {
        translateX: 27,
      },
    ],
  },

  bookMiddle: {
    position: 'absolute',
    width: 78,
    height: 108,
    borderRadius: 9,
    backgroundColor: '#A9A7F9',
    transform: [
      {
        rotate: '-6deg',
      },
      {
        translateX: 10,
      },
    ],
  },

  bookFront: {
    width: 80,
    height: 112,
    borderRadius: 9,
    backgroundColor: '#004777',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#004777',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 7,
    },

    elevation: 4,
  },

  bookLine: {
    position: 'absolute',
    top: 14,
    width: 43,
    height: 2,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },

  bookLineSmall: {
    position: 'absolute',
    top: 20,
    width: 28,
    height: 2,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },

  bookLetter: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
  },

  title: {
    color: '#171A2C',
    fontSize: 23,
    fontWeight: '900',
    textAlign: 'center',
  },

  description: {
    color: '#8C91A1',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    maxWidth: 310,
    marginTop: 9,
    marginBottom: 27,
  },

  buttonContainer: {
    width: '100%',
    maxWidth: 320,
  },
});