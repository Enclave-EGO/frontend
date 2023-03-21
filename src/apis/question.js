import httpRequest from "./axiosConfig";
import { getSigninToken } from "../helpers";

export const createQuestionApi = (question) => {
  const token = getSigninToken();
  return httpRequest.post("/questions", JSON.stringify(question), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateQuesionApi = (question, questionId) => {
  const token = getSigninToken();
  return httpRequest.patch(
    `/questions/${questionId}`,
    JSON.stringify(question),
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const deleteQuestionApi = (questionId) => {
  const token = getSigninToken();
  return httpRequest.delete(`/questions/${questionId}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};
