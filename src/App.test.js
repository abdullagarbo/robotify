import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import {
  jest,
  describe,
  test,
  expect,
  beforeEach,
  afterEach,
} from '@jest/globals';
import RobotContextProvider, { RobotContext } from './store/Context';

describe('RobotContext - executeCommands function', () => {
  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function renderWithContext(children) {
    return render(
      <RobotContextProvider>
        <RobotContext.Consumer>{children}</RobotContext.Consumer>
      </RobotContextProvider>
    );
  }

  test('shows alert if commands are empty', async () => {
    renderWithContext(({ executeCommands }) => (
      <button onClick={executeCommands}>Run Commands</button>
    ));

    // Trigger the executeCommands function by clicking the button
    fireEvent.click(screen.getByText('Run Commands'));

    // Wait for the alert to be called
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        'Please enter commands before running.'
      );
    });
  });

  test('executes valid PLACE and REPORT commands', async () => {
    renderWithContext(({ setCommands, executeCommands, output }) => (
      <>
        <button onClick={() => setCommands('PLACE 1,2,NORTH\nREPORT')}>
          Set Commands
        </button>
        <button onClick={executeCommands}>Run Commands</button>
        <div data-testid='output'>{output}</div>
      </>
    ));

    // Set valid commands and run them
    fireEvent.click(screen.getByText('Set Commands'));
    fireEvent.click(screen.getByText('Run Commands'));

    // Check the output of the REPORT command
    await waitFor(() => {
      expect(screen.getByTestId('output')).toHaveTextContent(
        'Output: 1,2,NORTH'
      );
    });
  });

  test('moves robot correctly with MOVE and TURN commands', async () => {
    renderWithContext(({ setCommands, executeCommands, output }) => (
      <>
        <button
          onClick={() =>
            setCommands('PLACE 0,0,NORTH\nMOVE\nRIGHT\nMOVE\nREPORT')
          }
        >
          Set Commands
        </button>
        <button onClick={executeCommands}>Run Commands</button>
        <div data-testid='output'>{output}</div>
      </>
    ));

    // Set commands and execute them
    fireEvent.click(screen.getByText('Set Commands'));
    fireEvent.click(screen.getByText('Run Commands'));

    // Check the final output after movements
    await waitFor(() => {
      expect(screen.getByTestId('output')).toHaveTextContent(
        'Output: 1,1,EAST'
      );
    });
  });
});
