import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  
  link:{
    color: theme.colors.brand,
    marginBottom: -4,
  },
  text:{
    fontSize: 12,
    color: theme.colors.text_secondary,
    fontFamily: theme.fonts.medium,
  },
});