import httpRequest from "./axiosConfig";
import { getSigninToken } from "../helpers";

export const getCourseApi = (courseId) => {
  return httpRequest.get(`/courses/${courseId}`);
};

export const getCoursesApi = () => {
  return httpRequest.get(`/courses`);
};

export const getCoursesByUserApi = (userId) => {
  return httpRequest.get(`/courses?userId=${userId}`);
};

export const createCourseApi = (course) => {
  const token = getSigninToken();
  return httpRequest.post(`/courses`, JSON.stringify(course), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

export const updateCourseApi = (courseId, course) => {
  const token = getSigninToken();
  return httpRequest.patch(`/courses/${courseId}`, JSON.stringify(course), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

export const deleteCourseApi = (courseId) => {
  const token = getSigninToken();
  return httpRequest.delete(`/courses/${courseId}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};
