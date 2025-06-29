import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login or register link', () => {
  render(<App />);
  // Check for Login or Register link/button/text
  const loginElement = screen.queryByText(/login/i);
  const registerElement = screen.queryByText(/register/i);
  expect(loginElement || registerElement).toBeInTheDocument();
});

