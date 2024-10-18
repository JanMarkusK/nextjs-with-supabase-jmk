import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../components/counter';
import '@testing-library/jest-dom';

test('increments and decrements the counter', async () => {
  render(<Counter />);
// Leiab kõik komponendid
  const incrementButton = screen.getByText('+1');
  const decrementButton = screen.getByText('-1');
  const count = screen.getByRole('heading');
//Kontrollin, et algne value on õige
   expect(await count).toHaveTextContent('Count: 0');
//Ütlen talle, et vajuta +1'le ja kontrolli mis juhtus (peab olema 1)
  fireEvent.click(incrementButton);
  expect(count).toHaveTextContent('Count: 1');
//Ütlen talle, et vajuta -1'le ja kontrolli mis juhtus (peab olema 1)
  fireEvent.click(decrementButton);
  expect(count).toHaveTextContent('Count: 0');
});