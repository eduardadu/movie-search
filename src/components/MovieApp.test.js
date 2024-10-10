import { render, screen } from "@testing-library/react";
import MovieApp from "./MovieApp";

test("renders learn react link", () => {
  render(<MovieApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
