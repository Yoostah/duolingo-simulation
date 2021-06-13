import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import Word from '../../components/Word';
import { WORDS_API } from '../../config/urls';
import api from '../../services/api';

// import { Container } from './styles';

const ChooseWord: React.FC = () => {
  const [generatedWords, setGeneratedWords] = useState<string[]>([]);
  const [timeToAnswer, setTimeToAnswer] = useState(5000);

  const getRandomWords = async (): Promise<void> => {
    const { data } = await api
      .get<string[]>(WORDS_API)
      .catch((error: AxiosError) => {
        throw new Error(`Erro -> ${error.message}`);
      });

    const wordWithWeight = data.map((word) => {
      return { word, weight: Math.ceil(Math.random() * 10 + 1) };
    });

    console.log(wordWithWeight);

    setGeneratedWords(data);
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
    <>
      {generatedWords.length ? (
        generatedWords
          .sort()
          .map((word, index) => (
            <Word
              key={word}
              word={word}
              shouldChange={index % 2 === 0}
              showAnswer={timeToAnswer === -1}
            />
          ))
      ) : (
        <p>Sem palavras</p>
      )}
    </>
  );
};

export default ChooseWord;
