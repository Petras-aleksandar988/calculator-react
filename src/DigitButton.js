import React from "react";

export default function DigitButton({ dispatch, digit }) {
  return (
    <button onClick={() => dispatch({ type: "add", payload: { digit } })}>
      {digit}
    </button>
  );
}
