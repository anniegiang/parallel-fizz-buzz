import React, {memo, useCallback, useRef, useState} from "react";
import {computeFizzBuzz} from "../api/fizzBuzz";
import "./FizzBuzzForm.css";
import FizzBuzzResults from "./FizzBuzzResults";

export const LOWER_LIMIT = 1;
export const UPPER_LIMIT = 10000;

const FizzBuzzForm = memo(() => {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  const [computing, setComputing] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputRefValue = Number(inputRef?.current?.value);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      setComputing(true);
      setResults([]);
      setError("");

      computeFizzBuzz(input)
        .then((result) => setResults(result))
        .catch(() => setError("Something went wrong"))
        .finally(() => setComputing(false));
    },
    [input]
  );

  const isLessThanLowerLimit = inputRefValue < LOWER_LIMIT;
  const isGreaterThanUpperLimit = inputRefValue > UPPER_LIMIT;

  if (computing) {
    return <p className="Form-computing">Computing....</p>;
  }

  return (
    <div className="Form-container">
      <form role="form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          placeholder="Enter a number"
          type="number"
          value={input}
          onChange={handleChange}
        />
        <input
          role="button"
          type="submit"
          value="Compute"
          disabled={
            !input ||
            computing ||
            !!isLessThanLowerLimit ||
            !!isGreaterThanUpperLimit
          }
        />
      </form>
      {!!error && <p className="Form-error">{error}</p>}
      {isLessThanLowerLimit && !!input && (
        <p className="Form-error">{`Number must be at least ${LOWER_LIMIT}`}</p>
      )}
      {isGreaterThanUpperLimit && !!input && (
        <p className="Form-error">{`Number must less than ${UPPER_LIMIT}`}</p>
      )}
      {!!results && <FizzBuzzResults results={results} />}
    </div>
  );
});

FizzBuzzForm.displayName = "FizzBuzzForm";

export default FizzBuzzForm;
