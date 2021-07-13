import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import ChooseWord from '../../../pages/ChooseWord';

import { TimeContext } from '../../../context/timeContext';

describe('New Game setup', () => {
  it('should show the round number equals 0', () => {
    const { getByRole } = render(<ChooseWord />);

    const gameTitle = getByRole('heading');

    expect(gameTitle).toHaveTextContent(/round: 0/i);
  });

  it('should show gameboard with the "No Words" message', () => {
    const { getByTestId } = render(<ChooseWord />);

    const gameBoard = getByTestId('game-board');

    expect(gameBoard.textContent).toBe('Sem palavras');
  });
});

describe('Start the Game', () => {
  it('should start the game after pressing the "Start" button', async () => {
    const resetTimer = jest.fn();

    const { getByRole } = render(
      <TimeContext.Provider
        value={{ time: 10, addTime: jest.fn(), resetTimer }}
      >
        <ChooseWord />
      </TimeContext.Provider>
    );

    const btnStart = getByRole('button', { name: 'Iniciar' });
    const gameTitle = getByRole('heading');

    fireEvent.click(btnStart);
    expect(gameTitle).toHaveTextContent(/round: 1/i);

    fireEvent.click(btnStart);
    expect(gameTitle).toHaveTextContent(/round: 2/i);

    fireEvent.click(btnStart);
    expect(gameTitle).toHaveTextContent(/round: 3/i);
  });
});
