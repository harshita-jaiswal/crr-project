import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

test('should render title', () => {
  render(<App />);
  const title = screen.getByRole('heading',{name:'Click-n-Split'});
  expect(title).toBeInTheDocument();
});

test('should render homepage successfully', () => {
  render(<App />);
  const question = screen.getByText('Enter number of people involved in the transaction?')
  expect(question).toBeInTheDocument();
  const inputBox = screen.getByRole('spinbutton',{name:'Enter number of people involved in the transaction?'})
  expect(inputBox).toBeInTheDocument()
  fireEvent.change(inputBox, {target: {value: '2'}})
  let textBoxes =screen.getAllByRole('textbox')
  expect(textBoxes).toHaveLength(2)
  let doneButton= screen.getByText('Done')
  expect(doneButton).toBeInTheDocument()
});

