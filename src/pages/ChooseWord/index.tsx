import React, { useCallback, useEffect, useState } from 'react';
import { setTimeout } from 'timers';
import Word from '../../components/Word';
import { WORDS_API } from '../../config/urls';
import api from '../../services/api';
import { TChoosenWord } from './types';
import { selectRandomWords } from '../../mocks/words';

import { Container, GameContainer, ButtonContainer } from './styles';
import TimeControl from '../../components/TimeControl';
import Button from '../../components/Button';
import { delayBetweenAction } from '../../services/utils';

const ChooseWord: React.FC = () => {
  const [startGame, setStartGame] = useState(false);
  const [round, setRound] = useState(0);
  const [generatedWords, setGeneratedWords] = useState<TChoosenWord[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLimit, setTimeLimit] = useState(0);

  const MAX_ROUNDS = 3;
  const MINUTES = 0.1;

  // const getRandomWords = async (): Promise<void> => {
  //   const words1 = api.get<string[]>(WORDS_API);
  //   const words2 = api.get<string[]>(WORDS_API);

  //   Promise.all([words1, words2]).then((res) => {
  //     res.forEach((words, index) => {
  //       const wordWithWeight = words.data.map((word) => {
  //         return {
  //           word,
  //           misspelled: word,
  //           weight: Math.ceil(Math.random() * 10 + 1),
  //           key: word + index,
  //         };
  //       });
  //       setGeneratedWords((state) => [...state, ...wordWithWeight]);
  //     });
  //   });
  // };

  const getWords = () => {
    console.log('Palavrinhas');
    setGeneratedWords(selectRandomWords(10));
  };

  // const timeToBreath = async (
  //   time: number,
  //   whoCalled: string,
  //   callback?: () => void
  // ) => {
  //   console.log(`>> Breath TIME [ ${whoCalled} ] <<`);
  //   await delayBetweenAction(time);
  //   console.log('>> Breath TIME ENDED <<');
  //   if (callback) callback();
  // };

  const handleShowAnswer = useCallback(() => {
    console.log('Mostrar Resposta');

    setShowAnswer(true);
    // timeToBreath(3000, 'reset contador', () => {
    //   setGeneratedWords([]);
    //   setRound((state) => state + 1);
    //   setShowAnswer(false);
    // });
  }, []);

  const startTheGame = useCallback(() => {
    console.log('Iniciando Jogo');
    setStartGame(true);
    setTimeLimit(MINUTES * 60);
    // timeToBreath(1000, 'startTheGame', () => setStartGame(true));
  }, []);

  const resetGame = useCallback(() => {
    console.log('Resetando o Jogo');

    // setRound((state) => state + 1);
    // setShowAnswer(false);
    getWords();
  }, []);

  useEffect(() => {
    // let roundTimer: NodeJS.Timeout;
    // if (startGame && round < MAX_ROUNDS) {
    //   roundTimer = setTimeout(() => {
    //     console.log('Should game start: ', startGame);
    //     console.log('ROUND:', round);
    //     resetGame();
    //   }, MINUTES * 60 * 1000);
    // }
    // return () => {
    //   clearTimeout(roundTimer);
    // };
  }, [startGame, round, resetGame]);

  return (
    <>
      <h2>{`ROUND: ${round}`}</h2>
      {startGame && <TimeControl duration={timeLimit} />}
      <Container>
        <GameContainer>
          {generatedWords.length ? (
            generatedWords
              .sort()
              .map((words) => (
                <Word
                  key={words.key}
                  word={words.word}
                  correctWord={words.correctWord}
                  showAnswer={showAnswer}
                />
              ))
          ) : (
            <p>Sem palavras</p>
          )}
        </GameContainer>
      </Container>
      <ButtonContainer>
        <Button onClick={startTheGame} text="Iniciar" />
        <Button onClick={() => setGeneratedWords([])} text="Recomeçar" />
        <Button
          color="danger"
          onClick={() => setGeneratedWords([])}
          text="Finalizar"
        />
      </ButtonContainer>
    </>
  );
};

export default ChooseWord;
