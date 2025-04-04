import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface IconButtonProps {
  icon: string;
  size?: number;
  color?: string;
  onPress?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, size = 24, color = 'black', onPress = () => {} }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.2)', borderless: true }}
      style={({ pressed }) => pressed && styles.buttonContainerPressed}
      accessibilityRole="button"
      accessibilityLabel={`Icon button with icon ${icon}`}
    >
      <View style={[styles.buttonContainer, { borderRadius: size / 2, padding: size / 4 }]}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 8,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainerPressed: {
    opacity: 0.75,
  },
});