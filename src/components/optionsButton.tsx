import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import colors from '../theme/colors';

interface OptionsButtonProps {
  title: string;
  onPress: any;
  key: string;
  submittedAnswer: string
  isAnswer?: boolean
  isCorrect?: boolean
}

const OptionsButton = (props: OptionsButtonProps) => {
  const { title, onPress, submittedAnswer, isAnswer, isCorrect } = props;
  return (
    <TouchableOpacity style={[styles.button, isAnswer? isCorrect ? styles.correct : styles.wrong : {}]} onPress={onPress} key={title}>
      <Text style={styles.title}>
        {(!isAnswer && title == submittedAnswer) ? "" : title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  correct: {
    backgroundColor: colors.colorCorrect
  },
  wrong: {
    backgroundColor: colors.colorWrong
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.secondary,
  },
});

export default OptionsButton