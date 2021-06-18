import React, { useCallback, useEffect, useState } from 'react';
import Word from '../../components/Word';
import { WORDS_API } from '../../config/urls';
import api from '../../services/api';
import { TChoosenWord } from './types';

import { Container, GameContainer, ButtonContainer } from './styles';
import TimeControl from '../../components/TimeControl';
import Button from '../../components/Button';

const ChooseWord: React.FC = () => {
  const [generatedWords, setGeneratedWords] = useState<TChoosenWord[]>([]);
  const [showAnswer, setshowAnswer] = useState(false);
  const MINUTES = 0.5;

  const getRandomWords = async (): Promise<void> => {
    const words1 = api.get<string[]>(WORDS_API);
    const words2 = api.get<string[]>(WORDS_API);

    Promise.all([words1, words2]).then((res) => {
      res.forEach((words, index) => {
        const wordWithWeight = words.data.map((word) => {
          return {
            word,
            weight: Math.ceil(Math.random() * 10 + 1),
            key: word + index,
          };
        });
        setGeneratedWords((state) => [...state, ...wordWithWeight]);
      });
    });
  };

  const handleShowAnswer = useCallback(() => {
    setshowAnswer(true);
  }, []);

  useEffect(() => {
    if (!generatedWords.length) {
      getRandomWords();
      setshowAnswer(false);
    }
  }, [generatedWords]);

  return (
    <>
      <TimeControl
        duration={MINUTES * 60 * 1000}
        timeIsOverFunction={handleShowAnswer}
        resetTimer={!generatedWords.length}
      />
      <Container>
        <GameContainer>
          {generatedWords.length ? (
            generatedWords
              .sort()
              .map((words) => (
                <Word
                  key={words.key}
                  word={words.word}
                  shouldChange={words.weight % 2 === 0}
                  showAnswer={showAnswer}
                />
              ))
          ) : (
            <p>Sem palavras</p>
          )}
        </GameContainer>
      </Container>
      <ButtonContainer>
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
