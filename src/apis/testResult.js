import httpRequest from "./axiosConfig";
import { getSigninToken } from "../helpers";

export const submitTestApi = (testResult) => {
  const token = getSigninToken();
  return httpRequest.post(`/test-results`, JSON.stringify(testResult), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

export const getTestResultApi = (userId, testId) => {
  const token = getSigninToken();
  return httpRequest.get(`/test-results?userId=${userId}&testId=${testId}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};
