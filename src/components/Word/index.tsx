import React, { useCallback, useEffect, useState } from 'react';
import { Container } from './styles';

interface IWord {
  word: string;
  correctWord: string;
  showAnswer?: boolean;
}
const Word: React.FC<IWord> = ({ word, correctWord, showAnswer = false }) => {
  const [trueWord, setTrueWord] = useState(correctWord);
  const [modifiedWord, setModifiedWord] = useState(word);
  const [wordIsWrong, setWordIsWrong] = useState(false);
  const [selected, setSelected] = useState(false);

  const changeWord = useCallback((string: string) => {
    return `${string}ed`;
  }, []);

  // useEffect(() => {
  //   setModifiedWord(shouldChange ? changeWord(trueWord) : trueWord);
  // }, [trueWord, shouldChange, changeWord]);

  useEffect(() => {
    if (showAnswer) {
      setWordIsWrong(trueWord !== modifiedWord);
    }
  }, [trueWord, modifiedWord, showAnswer]);

  const handleClick = useCallback(() => {
    if (showAnswer) return;

    setSelected((state) => !state);
  }, [showAnswer]);

  return (
    <Container
      wrongAnswer={wordIsWrong}
      revealAnswer={showAnswer}
      selected={selected}
    >
      <button type="button" onClick={handleClick}>
        {modifiedWord}
      </button>
    </Container>
  );
};

export default Word;
