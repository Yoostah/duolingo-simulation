import React, { useCallback, useEffect, useState } from 'react';
import { WORDS_API } from '../../config/urls';
import { TChoosenWord } from './types';

import Word from '../../components/Word';
import TimeControl from '../../components/TimeControl';
import Button from '../../components/Button';
import TimeIsOver from '../../components/TimeIsOver';

import { selectRandomWords } from '../../mocks/words';
import api from '../../services/api';
import { delayBetweenAction } from '../../services/utils';
import { useTime } from '../../hooks/useTime';

import { Container, GameContainer, ButtonContainer } from './styles';

const ChooseWord: React.FC = () => {
  const [startGame, setStartGame] = useState(false);
  const [round, setRound] = useState(0);
  const [generatedWords, setGeneratedWords] = useState<TChoosenWord[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLimit, setTimeLimit] = useState(0);

  const { time, resetTimer } = useTime();

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

  const getWords = useCallback(() => {
    console.log('Palavrinhas ROUND:');

    setGeneratedWords(selectRandomWords(Number((round + 1) * 10)));
  }, [round]);

  const timeToBreath = async (
    delayTime: number,
    whoCalled: string,
    callback?: () => void,
    cleanupCallback?: () => void
  ) => {
    // console.log(`>> Breath TIME <<`);

    if (cleanupCallback) {
      // console.log('Cleaning Up the MESS');
      cleanupCallback();
    }

    await delayBetweenAction(delayTime);
    // console.log(`>> [ ${whoCalled} ] <<`);
    if (callback) callback();
  };

  const handleShowAnswer = useCallback(() => {
    // console.log('Mostrar Resposta');
    setShowAnswer(true);
  }, []);

  const handleSubmitFinalAnswer = () => {
    if (time === -1) return;
    resetTimer();
    setStartGame(false);
    handleShowAnswer();
    setTimeLimit(0);
  };

  const resetGame = useCallback(() => {
    resetTimer();
    setGeneratedWords([]);
    setShowAnswer(false);
    setTimeLimit(0);
    setRound(0);
    setStartGame(false);
  }, [resetTimer]);

  const startTheGame = useCallback(() => {
    if (timeLimit) return;
    // console.log('Resetando o timer');
    resetTimer();

    // console.log('Ocultando respostas');
    setShowAnswer(false);

    // console.log('Setando tempo do game');
    setTimeLimit(Math.floor((round + 1) * MINUTES * 200));

    timeToBreath(
      3000,
      'Start The Game',
      () => {
        setStartGame(true);
        getWords();
      },
      () => {
        setGeneratedWords([]);
        setRound((state) => state + 1);
      }
    );
  }, [resetTimer, getWords, round, timeLimit]);

  useEffect(() => {
    if (time === 0) {
      setStartGame(false);
      handleShowAnswer();
      setTimeLimit(0);
      if (round === MAX_ROUNDS) {
        setRound(0);
      }
    }
  }, [time, handleShowAnswer, round]);

  return (
    <>
      <h2>{`ROUND: ${round}`}</h2>
      {startGame && <TimeControl duration={timeLimit} />}
      {(time === 0 || showAnswer) && <TimeIsOver />}
      <Container>
        <GameContainer data-testid="game-board">
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
        <Button
          color="success"
          onClick={startTheGame}
          text="Iniciar"
          disabled={Boolean(timeLimit)}
        />
        <Button onClick={resetGame} text="Recomeçar" disabled={!startGame} />
        <Button
          color="danger"
          onClick={handleSubmitFinalAnswer}
          text="Finalizar"
          disabled={!startGame}
        />
      </ButtonContainer>
    </>
  );
};

export default ChooseWord;
