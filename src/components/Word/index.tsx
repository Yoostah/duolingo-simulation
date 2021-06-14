import React, { useCallback, useEffect, useState } from 'react';
import { Container } from './styles';

interface IWord {
  word: string;
  shouldChange: boolean;
  showAnswer?: boolean;
}
const Word: React.FC<IWord> = ({ word, shouldChange, showAnswer = false }) => {
  const [realWord, setRealWord] = useState(word);
  const [modifiedWord, setModifiedWord] = useState('');
  const [wordIsModified, setWordIsModified] = useState(false);
  const [selected, setSelected] = useState(false);

  const changeWord = useCallback((string: string) => {
    return `${string}ed`;
  }, []);

  useEffect(() => {
    setModifiedWord(shouldChange ? changeWord(realWord) : realWord);
  }, [realWord, shouldChange, changeWord]);

  useEffect(() => {
    if (showAnswer) {
      setWordIsModified(realWord !== modifiedWord);
    }
  }, [realWord, modifiedWord, showAnswer]);

  const handleClick = useCallback(() => {
    if (showAnswer) return;

    setSelected((state) => !state);
  }, [showAnswer]);

  return (
    <Container
      wrongAnswer={wordIsModified}
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
