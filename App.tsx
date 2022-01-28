/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import colors from './src/theme/colors';
import OptionsButton from './src/components/optionsButton';
import { getAllQuestions } from './src/services/questionService';

const App = (props: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState(null)

  useEffect(() => {
    getAllQuestions().then(data => {
      setExercises(data)
      if (data.length) {
        setCurrentExercise(data[0])
      }
    })

  }, [])



  const handleAnswer = (option) => {
    const cr = { ...currentExercise }
    cr.submittedAnswer = option
    setCurrentExercise(cr)
  }

  const getWordsFromPhrase = (phrase) => {
    return phrase.split(" ");
  }


  const renderPhrase = (phrase, wordIndex, isAnswer = false) => {
    console.log(currentExercise.submittedAnswer, currentExercise.answer)
    return (
      <Text style={styles.phrase}>
        {
          getWordsFromPhrase(phrase).map((element, index) => {
            if (index === wordIndex) {
              return <Text key={element}>
                <Text style={[styles.underline, styles.bold]} >
                  {isAnswer ? currentExercise.submittedAnswer ?
                    <OptionsButton
                      isAnswer
                      title={currentExercise.submittedAnswer}
                      submittedAnswer={currentExercise.submittedAnswer}
                      onPress={() => { }}
                      key={`submitted-${currentExercise.submittedAnswer}`}
                      isCorrect={isAnswer && currentExercise.submittedAnswer == currentExercise.answer}
                    /> :
                    `______` : `${element}`}
                </Text>
                {` `}
              </Text>
            } else {
              return <Text key={element} style={isAnswer && styles.dotted}>{`${element} `}</Text>
            }
          })
        }
      </Text>
    )
  }

  return (
    <View>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title} >{`Fill in the missing word`}</Text>
          {
            (exercises.length && currentExercise) ? (
              <>
                {renderPhrase(currentExercise.englishPhrase, currentExercise.englishWordIndex)}
                {renderPhrase(currentExercise.germanPhrase, currentExercise.germanWordIndex, true)}
                <View style={styles.buttonContainer}>
                  {
                    currentExercise.options.map(option =>
                      <OptionsButton title={option} submittedAnswer={currentExercise.submittedAnswer} onPress={() => handleAnswer(option)} key={option} />
                    )
                  }
                </View>
              </>

            ) : null
          }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: '100%',
    height: '100%'
  },
  subContainer: {
    borderRadius: 30,
    backgroundColor: colors.secondary,
    width: '100%',
    height: '80%',
    position: 'absolute',
    bottom: 0,
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.white,
    marginTop: 30,
  },
  phrase: {
    fontSize: 20,
    fontWeight: '400',
    color: colors.white,
    marginLeft: 5,
    marginVertical: 30,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  bold: {
    fontWeight: 'bold',
  },
  dotted: {
    textDecorationStyle: 'dotted',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: 50,
    justifyContent: 'center'
  }
});

export default App;
