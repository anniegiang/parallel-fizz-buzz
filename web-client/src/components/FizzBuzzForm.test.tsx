import React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FizzBuzzForm from "./FizzBuzzForm";
import {LOWER_LIMIT, UPPER_LIMIT} from "../constants/fizzBuzz";

test("renders a form", () => {
  render(<FizzBuzzForm />);
  expect(screen.getByRole("form")).toBeInTheDocument();
});

test("renders a number input", () => {
  render(<FizzBuzzForm />);

  const inputEl = screen.getByPlaceholderText(/enter a number/i);

  expect(inputEl).toBeInTheDocument();
  expect(inputEl).toHaveAttribute("type", "number");
});

test("renders a disabled button", () => {
  render(<FizzBuzzForm />);

  const submitButton = screen.getByRole("button");

  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toHaveDisplayValue(/compute/i);
  expect(submitButton).toBeDisabled();
});

test("number input can take user input, and the button is enabled", () => {
  const input = 123;

  render(<FizzBuzzForm />);

  const inputEl = screen.getByPlaceholderText(/enter a number/i);

  userEvent.type(inputEl, `${input}`);

  expect(screen.getByPlaceholderText(/enter a number/i)).toHaveValue(input);
  expect(screen.getByText(/compute/i)).not.toBeDisabled();
});

test("shows an error if the input is less than the lower limit, and disables the button", () => {
  render(<FizzBuzzForm />);

  const inputEl = screen.getByPlaceholderText(/enter a number/i);

  userEvent.type(inputEl, `${LOWER_LIMIT - 1}`);

  expect(screen.getByText(/compute/i)).toBeDisabled();
  expect(screen.getByText(/number must be at least/i)).toBeInTheDocument();
});

test("shows an error if the input is greater than the upper limit, and disables the button", () => {
  render(<FizzBuzzForm />);

  const inputEl = screen.getByPlaceholderText(/enter a number/i);

  userEvent.type(inputEl, `${UPPER_LIMIT + 1}`);

  expect(screen.getByText(/compute/i)).toBeDisabled();
  expect(screen.getByRole("button")).toBeInTheDocument();
});

test("submitting shows a waiting state", () => {
  const input = 1;

  render(<FizzBuzzForm />);

  const inputEl = screen.getByPlaceholderText(/enter a number/i);
  const submitButton = screen.getByRole("button");

  userEvent.type(inputEl, `${input}`);
  userEvent.click(submitButton);

  expect(screen.getByText(/computing/i)).toBeInTheDocument();
});
