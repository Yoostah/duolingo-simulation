import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import Word from '../../components/Word';
import { WORDS_API } from '../../config/urls';
import api from '../../services/api';
import { TChoosenWord } from './types';

import { Container, GameContainer } from './styles';

const ChooseWord: React.FC = () => {
  const [generatedWords, setGeneratedWords] = useState<TChoosenWord[]>([]);
  const [timeToAnswer, setTimeToAnswer] = useState(5000);

  const getRandomWords = async (): Promise<void> => {
    // const { data } = await api
    //   .get<string[]>(WORDS_API)
    //   .catch((error: AxiosError) => {
    //     throw new Error(`Erro -> ${error.message}`);
    //   });
    const words1 = api.get<string[]>(WORDS_API);
    const words2 = api.get<string[]>(WORDS_API);

    Promise.all([words1, words2]).then((res) => {
      res.forEach((words) => {
        const wordWithWeight = words.data.map((word) => {
          return { word, weight: Math.ceil(Math.random() * 10 + 1) };
        });
        setGeneratedWords((state) => [...state, ...wordWithWeight]);
      });
    });
  };

  useEffect(() => {
    getRandomWords();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setTimeToAnswer(-1);
    }, timeToAnswer);
  });

  return (
    <Container>
      <GameContainer>
        {generatedWords.length ? (
          generatedWords
            .sort()
            .map((words) => (
              <Word
                key={words.word}
                word={words.word}
                shouldChange={words.weight % 2 === 0}
                showAnswer={timeToAnswer === -1}
              />
            ))
        ) : (
          <p>Sem palavras</p>
        )}
      </GameContainer>
    </Container>
  );
};

export default ChooseWord;
