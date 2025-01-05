import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const GlowingButton: React.FC<{
  children: React.ReactNode;
  onPress?: () => void;
}> = ({ children, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{children}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'hsl(221 70% 55%)',
    padding: 16,
    borderRadius: 8,
    shadowColor: 'hsl(221 70% 55%)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});