import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
  keyboardType,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A4A8B5"
        multiline={multiline}
        keyboardType={keyboardType}
        style={[
          styles.input,
          multiline && styles.multiline,
        ]}
        selectionColor='#004777'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 17,
  },

  label: {
    fontSize: 13,
    fontWeight: '800',
    color: '#34384B',
    marginBottom: 8,
    marginLeft: 2,
  },

  input: {
    minHeight: 54,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E7E8EF',
    paddingHorizontal: 16,
    color: '#161A2D',
    fontSize: 15,
  },

  multiline: {
    minHeight: 125,
    paddingTop: 15,
    paddingBottom: 15,
    textAlignVertical: 'top',
  },
});