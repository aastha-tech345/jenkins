import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("here test content", () => {
  render(<App />);
  const text = screen.getByText(/aastha/i);
  expect(text).toBeInTheDocument();
});