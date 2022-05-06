import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

export function Copyright() {
  return (
    <View>
      <Text style={styles.text}>
        Feito com ♥ por{' '}

        <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/lucas-daniel-rambo')}>
          <Text style={styles.link}>
            Lucas
          </Text>
        </TouchableOpacity>
        <Text>{' e '}</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.rocketseat.com.br/')}>
          <Text style={styles.link}>
            RocketSeat
        </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}