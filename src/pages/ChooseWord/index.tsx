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
import { useTime } from '../../hooks/useTime';
import TimeIsOver from '../../components/TimeIsOver';

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
    console.log(`>> Breath TIME <<`);

    if (cleanupCallback) {
      console.log('Cleaning Up the MESS');
      cleanupCallback();
    }

    await delayBetweenAction(delayTime);
    console.log(`>> [ ${whoCalled} ] <<`);
    if (callback) callback();
  };

  const handleShowAnswer = useCallback(() => {
    console.log('Mostrar Resposta');
    setShowAnswer(true);
  }, []);

  const startTheGame = useCallback(() => {
    console.log('Resetando o timer');
    resetTimer();

    console.log('Ocultando respostas');
    setShowAnswer(false);

    console.log('Setando tempo do game');
    setTimeLimit((round + 1) * MINUTES * 200);

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
  }, [resetTimer, getWords]);

  useEffect(() => {
    if (time === 0) {
      setStartGame(false);
      handleShowAnswer();
    }
  }, [time, handleShowAnswer]);

  return (
    <>
      <h2>{`ROUND: ${round}`}</h2>
      {startGame && <TimeControl duration={timeLimit} />}
      {time === 0 && <TimeIsOver />}
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
        <Button color="success" onClick={startTheGame} text="Iniciar" />
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
