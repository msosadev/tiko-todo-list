import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("tiko To-do List");
  expect(linkElement).toBeInTheDocument();
});
