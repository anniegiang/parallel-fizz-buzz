import React, {memo} from "react";
import "./FizzBuzzResults.css";
import {FIZZ_BUZZ_TEXT} from "../constants/fizzBuzz";

const getTextClassname = (result: string) => {
  switch (result) {
    case FIZZ_BUZZ_TEXT.fizz:
      return "Result-fizz-text";
    case FIZZ_BUZZ_TEXT.buzz:
      return "Result-buzz-text";
    case FIZZ_BUZZ_TEXT.fizzBuzz:
      return "Result-fizz-buzz-text";
    default:
      return "Result-text";
  }
};

interface FizzBuzzResultsProps {
  results: string[];
}

const FizzBuzzResults = memo(({results}: FizzBuzzResultsProps) => {
  return (
    <ol role="list">
      {results.map((result, idx) => (
        <li role="listitem" key={idx}>
          <h4 className={getTextClassname(result)}>{result}</h4>
        </li>
      ))}
    </ol>
  );
});

FizzBuzzResults.displayName = "FizzBuzzResults";

export default FizzBuzzResults;
