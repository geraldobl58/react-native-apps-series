import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

import * as theme from '../theme';

export default class Typography extends Component {
  render() {

    const { 
      h1,
      h2,
      h3,
      body,
      title,
      caption,
      small,
      size,
      bold,
      semibold,
      light,
      center,
      right,
      color,
      accent,
      primary,
      secondary,
      tertiary,
      black,
      white,
      gray,
      gray2,
      style,
      children, 
      ...props 
    } = this.props;

    const textStyles = [
      styles.text,
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      body && styles.body,
      title && styles.title,
      caption && styles.caption,
      small && styles.small,
      size && { fontSize: size },
      bold && styles.bold,
      semibold && styles.semibold,
      light && styles.light,
      center && styles.center,
      right && styles.right,
      color && styles[color],
      color && !styles[color] && { color },
      // colors
      accent && styles.accent,
      primary && styles.primary,
      secondary && styles.secondary,
      tertiary && styles.tertiary,
      black && styles.black,
      white && styles.white,
      gray && styles.gray,
      gray2 && styles.gray2,
      style && styles.style,
    ];

    return (
      <Text style={textStyles} {...props}>
        { children }
      </Text>
    )
  }
}

const styles = StyleSheet.create({

  text: {
    fontSize: theme.sizes.font,
    color: theme.colors.black,
  },

  // variations
  bold: {
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold'
  },
  semibold: {
    fontWeight: '500',
    fontFamily: 'Montserrat-SemiBold'
  },
  light: {
    fontWeight: '200',
    fontFamily: 'Montserrat-Light'
  },

  // position
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  
  // colors
  accent: { color:  theme.colors.accent },
  primary: { color:  theme.colors.primary },
  secondary: { color:  theme.colors.secondary },
  tertiary: { color:  theme.colors.tertiary },
  black: { color:  theme.colors.black },
  white: { color:  theme.colors.white },
  gray: { color:  theme.colors.gray },
  gray2: { color:  theme.colors.gray2 },

  // fonts
  h1: theme.fonts.h1,
  h2: theme.fonts.h2,
  h3: theme.fonts.h3,
  body: theme.fonts.body,
  title: theme.fonts.title,
  caption: theme.fonts.caption,
  small: theme.fonts.small,

});
