import { render, screen } from '@testing-library/react';
import App from './App';

describe("Check app renders content", () => {
  test('Renders welcome text', () => {
    render(<App />);
      const welcome = screen.getByText(/Welcome to the Internship Application Country App/i);
    expect(welcome).toBeInTheDocument();
  });
});
