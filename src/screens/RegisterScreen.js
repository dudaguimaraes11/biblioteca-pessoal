import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';

import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';
import TextField from '../components/TextField';

export default function RegisterScreen({
  book,
  onBack,
  onSave,
}) {
  const isEditing = Boolean(book);

  const [title, setTitle] = useState(
    book ? book.title : ''
  );

  const [author, setAuthor] = useState(
    book ? book.author : ''
  );

  const [genre, setGenre] = useState(
    book ? book.genre : ''
  );

  const [year, setYear] = useState(
    book ? book.year : ''
  );

  const [description, setDescription] = useState(
    book ? book.description : ''
  );

  const [image, setImage] = useState(
    book ? book.image || null : null
  );

  const [imageRatio, setImageRatio] = useState(
    2 / 3
  );

  const [saving, setSaving] = useState(false);

  async function escolherImagem() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permissão necessária',
        'Permita o acesso às fotos para escolher a capa do livro.'
      );
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [2, 3],
        quality: 0.8,
      });

    if (!result.canceled) {
      const selectedImage = result.assets[0];

      setImage(selectedImage.uri);

      if (
        selectedImage.width &&
        selectedImage.height
      ) {
        setImageRatio(
          selectedImage.width /
            selectedImage.height
        );
      }
    }
  }

  async function handleSave() {
    if (!title.trim()) {
      Alert.alert(
        'Título obrigatório',
        'Digite o título do livro.'
      );
      return;
    }

    if (!author.trim()) {
      Alert.alert(
        'Autor obrigatório',
        'Digite o nome do autor.'
      );
      return;
    }

    if (
      year.trim() &&
      !/^\d{4}$/.test(year.trim())
    ) {
      Alert.alert(
        'Ano inválido',
        'Digite o ano usando 4 números. Exemplo: 2024.'
      );
      return;
    }

    setSaving(true);

    try {
      await onSave({
        id: book ? book.id : undefined,

        title,

        author,

        genre,

        year,

        description,

        image,

        read: book ? book.read : false,

        createdAt: book
          ? book.createdAt
          : undefined,
      });
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível salvar o livro.'
      );

      console.log(error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <Header
        title={
          isEditing
            ? 'Editar livro'
            : 'Novo livro'
        }
        subtitle={
          isEditing
            ? 'Atualize as informações'
            : 'Adicione uma nova obra'
        }
        onBack={onBack}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* CABEÇALHO */}
        <View style={styles.formIntro}>
          <View style={styles.formIcon}>
            <Text style={styles.formIconText}>
              {isEditing ? '✎' : '+'}
            </Text>
          </View>

          <View style={styles.formIntroText}>
            <Text style={styles.formTitle}>
              {isEditing
                ? 'Informações do livro'
                : 'Vamos cadastrar um livro'}
            </Text>

            <Text style={styles.formSubtitle}>
              Preencha os campos abaixo.
              Os campos com * são obrigatórios.
            </Text>
          </View>
        </View>

        <View style={styles.formCard}>

          {/* CAPA DO LIVRO */}

          <Text style={styles.imageLabel}>
            Capa do livro
          </Text>

          <View style={styles.coverSection}>

            {/* IMAGEM */}

            <View style={styles.coverWrapper}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={[
                    styles.coverImage,
                    {
                      aspectRatio: imageRatio,
                    },
                  ]}
                />
              ) : (
                <View style={styles.emptyCover}>
                  <Text style={styles.emptyCoverIcon}>
                    +
                  </Text>

                  <Text style={styles.emptyCoverText}>
                    Sem capa
                  </Text>
                </View>
              )}
            </View>

            {/* PARTE AO LADO DA CAPA */}

            <View style={styles.coverSide}>

              <Text style={styles.coverSideTitle}>
                {image
                  ? 'Capa adicionada'
                  : 'Adicione uma capa'}
              </Text>

              <Text style={styles.coverSideText}>
                {image
                  ? 'Sua imagem será usada como capa do livro.'
                  : 'Escolha uma imagem da galeria para representar seu livro.'}
              </Text>

              <TouchableOpacity
                style={styles.imageButton}
                onPress={escolherImagem}
                activeOpacity={0.8}
              >
                <Text style={styles.imageButtonText}>
                  {image
                    ? 'Trocar capa'
                    : 'Escolher imagem'}
                </Text>
              </TouchableOpacity>

            </View>
          </View>

          {/* CAMPOS */}

          <TextField
            label="Título *"
            value={title}
            onChangeText={setTitle}
            placeholder="Ex.: O Hobbit"
          />

          <TextField
            label="Autor *"
            value={author}
            onChangeText={setAuthor}
            placeholder="Ex.: J. R. R. Tolkien"
          />

          <TextField
            label="Gênero"
            value={genre}
            onChangeText={setGenre}
            placeholder="Ex.: Fantasia"
          />

          <TextField
            label="Ano de publicação"
            value={year}
            onChangeText={setYear}
            placeholder="Ex.: 1937"
            keyboardType="numeric"
          />

          <TextField
            label="Descrição"
            value={description}
            onChangeText={setDescription}
            placeholder="Escreva uma breve descrição do livro..."
            multiline
          />
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={
              saving
                ? 'Salvando...'
                : isEditing
                  ? 'Salvar alterações'
                  : 'Cadastrar livro'
            }
            onPress={handleSave}
            disabled={saving}
          />
        </View>

        <Text style={styles.bottomText}>
          Seus livros ficam salvos localmente no dispositivo.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingTop: 5,
    paddingBottom: 35,
  },

  formIntro: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
  },

  formIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#ECEBFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  formIconText: {
    color: '#004777',
    fontSize: 24,
    fontWeight: '500',
  },

  formIntroText: {
    flex: 1,
  },

  formTitle: {
    color: '#171A2C',
    fontSize: 15,
    fontWeight: '900',
  },

  formSubtitle: {
    color: '#9296A5',
    fontSize: 11.5,
    lineHeight: 17,
    marginTop: 3,
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    padding: 16,
    paddingTop: 18,

    shadowColor: '#1B2140',
    shadowOpacity: 0.045,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 2,
  },

  /* CAPA */

  imageLabel: {
    color: '#171A2C',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 14,
  },

  coverSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },

  coverWrapper: {
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },

  coverImage: {
    width: 120,
    maxHeight: 180,
    borderRadius: 8,
    resizeMode: 'contain',
  },

  emptyCover: {
    width: 120,
    height: 170,
    borderRadius: 8,
    backgroundColor: '#F1F2F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyCoverIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#ECEBFF',
    color: '#4F46E5',
    fontSize: 27,
    textAlign: 'center',
    lineHeight: 40,
    marginBottom: 8,
  },

  emptyCoverText: {
    color: '#9296A5',
    fontSize: 11,
    fontWeight: '700',
  },

  /* CONTEÚDO AO LADO */

  coverSide: {
    flex: 1,
    marginLeft: 18,
    paddingRight: 4,
  },

  coverSideTitle: {
    color: '#171A2C',
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 7,
  },

  coverSideText: {
    color: '#9296A5',
    fontSize: 11.5,
    lineHeight: 17,
    marginBottom: 13,
  },

  imageButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECEBFF',
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 10,
  },

  imageButtonText: {
    color: '#4F46E5',
    fontSize: 10.5,
    fontWeight: '900',
  },

  buttonContainer: {
    marginTop: 18,
  },

  bottomText: {
    textAlign: 'center',
    color: '#B0B3BE',
    fontSize: 10.5,
    marginTop: 15,
  },
});