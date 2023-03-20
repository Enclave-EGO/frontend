export const initialState = null;

export const reducer = (state, action) => {
  let newState;

  switch (action.type) {
    case "USER":
      newState = action.payload;
      break;
    case "CLEAR":
      newState = null;
      break;
    default:
      throw new Error("Invalid action");
  }
  return newState;
};

export const questionReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case "isMultiChoice":
      const { isMultiChoice } = state;
      newState = { ...state, isMultiChoice: !isMultiChoice };
      break;

    case "content":
      newState = { ...state, content: action.event.target.value };
      break;

    case "score":
      newState = { ...state, score: action.event.target.value };
      break;

    case "content-answer":
      const answers = state.answers;
      const newAnswer = {
        ...answers[action.index],
        content: action.event.target.value
      };
      answers[action.index] = newAnswer;
      newState = { ...state, answers };
      break;

    case "add-answer":
      const listAnswers = state.answers;
      listAnswers.push({ content: "", isCorrect: false });
      newState = { ...state, answers: listAnswers };
      break;

    case "cancel":
      newState = action?.initalValue ? { ...action.initalValue } : { ...state };
      break;

    default:
      throw new Error("Invalid action");
  }

  return newState;
};
