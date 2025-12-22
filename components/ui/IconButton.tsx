import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

type IconName = keyof typeof Ionicons.glyphMap;

interface IconButtonProps {
  icon: IconName;
  size?: number;
  color?: string;
  onPress?: () => void;
}

export default function IconButton({
  icon,
  size = 24,
  color = 'white',
  onPress
}: IconButtonProps) {
  return (
    <Pressable 
      onPress={onPress} 
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.7,
  },
});