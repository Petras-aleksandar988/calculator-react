import { useReducer } from "react";
import "./App.css";
import DigitButton from "./DigitButton";
import Operation from "./Operation";

function reducer(state, { type, payload }) {
  switch (type) {
    case "add":
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case "operation":
      if (state.currentOperand == null && state.previousOperand == null)
        return state;
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case "clear":
      return {};
    case "equal":
      if (
        state.previousOperand == null ||
        state.currentOperand == null ||
        state.operation == null
      ) {
        return state;
      }
      return {
        ...state,
        previousOperand: null,
        overwrite: true,
        operation: null,
        currentOperand: evaluate(state),
      };
    case "delete":
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: null,
          overwrite: false,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    default:
      break;
  }
}
function evaluate({ currentOperand, previousOperand, operation }) {
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(previous || isNaN(current))) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = previous + current;
      break;
    case "-":
      computation = previous - current;
      break;
    case "*":
      computation = previous * current;
      break;
    case "/":
      computation = previous / current;
      break;
    default:
      break;
  }
  return computation.toString();
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  const INTEGER_FORMATER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
  });
  function formater(operand) {
    if (operand == null) return;
    const [integer, decimal] = operand.split(".");

    if (decimal == null) return INTEGER_FORMATER.format(integer);
    return `${INTEGER_FORMATER.format(integer)}.${decimal}
`
  }
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formater(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formater(currentOperand)}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: "clear" })}>
        AC
      </button>
      <button onClick={() => dispatch({ type: "delete" })}>DEL</button>
      <Operation operation="/" dispatch={dispatch} />

      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />

      <DigitButton digit="3" dispatch={dispatch} />

      <Operation operation="*" dispatch={dispatch} />

      <DigitButton digit="4" dispatch={dispatch} />

      <DigitButton digit="5" dispatch={dispatch} />

      <DigitButton digit="6" dispatch={dispatch} />

      <Operation operation="+" dispatch={dispatch} />

      <DigitButton digit="7" dispatch={dispatch} />

      <DigitButton digit="8" dispatch={dispatch} />

      <DigitButton digit="9" dispatch={dispatch} />

      <Operation operation="-" dispatch={dispatch} />

      <DigitButton digit="." dispatch={dispatch} />

      <DigitButton digit="0" dispatch={dispatch} />

      <button className="span-two" onClick={() => dispatch({ type: "equal" })}>
        =
      </button>
    </div>
  );
}

export default App;
