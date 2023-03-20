import httpRequest from "./axiosConfig";
import { getSigninToken } from "../helpers";

export const createTestApi = (test) => {
  const token = getSigninToken();
  return httpRequest.post("/tests", JSON.stringify(test), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

export const getTestDetailApi = (testId) => {
  const token = getSigninToken();
  return httpRequest.get(`/tests/${testId}`, null, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

export const getTestsByLessonApi = (lessonId) => {
  const token = getSigninToken();
  return httpRequest.get(`/tests?lessonId=${lessonId}`, null, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateTestApi = (testId, test) => {
  const token = getSigninToken();
  return httpRequest.patch(`/tests/${testId}`, JSON.stringify(test), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteTestApi = (testId) => {
  const token = getSigninToken();
  return httpRequest.delete(`/tests/${testId}`, null, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};
