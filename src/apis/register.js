import httpRequest from "./axiosConfig";
import { getSigninToken } from "../helpers";

export const registerCourseApi = ({ userId, courseId }) => {
  const token = getSigninToken();
  const register = { userId, courseId };
  return httpRequest.post("/registers", JSON.stringify(register), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

export const getRegisterApi = ({ userId, courseId }) => {
  const token = getSigninToken();
  return httpRequest.get(
    `/registers?userId=${userId}&courseId=${courseId}`,
    null,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export const getMyRegisteredCoursesApi = (userId) => {
  const token = getSigninToken();
  return httpRequest.get(`/registers/my-registers?userId=${userId}`, null, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

export const getMyNotRegisteredCoursesApi = (userId) => {
  const token = getSigninToken();
  return httpRequest.get(`/registers/my-not-registers?userId=${userId}`, null, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};
