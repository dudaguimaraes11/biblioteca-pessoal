import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Header({
  title,
  subtitle,
  onBack,
  rightLabel,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.leftArea}>
        {onBack && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        )}

        <View style={styles.titleArea}>
          <Text style={styles.title}>{title}</Text>

          {subtitle && (
            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {rightLabel && (
        <Text style={styles.rightLabel}>
          {rightLabel}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 78,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  leftArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ECEEF4',
  },

  backIcon: {
    fontSize: 32,
    lineHeight: 35,
    color: '#161A2D',
    marginTop: -3,
  },

  titleArea: {
    flex: 1,
  },

  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#161A2D',
    letterSpacing: -0.7,
  },

  subtitle: {
    fontSize: 13,
    color: '#858A9A',
    marginTop: 3,
  },

  rightLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#004777',
  },
});