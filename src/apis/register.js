export const registerCourseApi = ({ userId, courseId }) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));
  const newRegister = { userId, courseId };

  return fetch("/registers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(newRegister)
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const getRegisterApi = ({ userId, courseId }) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/registers?userId=${userId}&courseId=${courseId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const getMyRegisteredCoursesApi = (userId) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/registers/my-registers?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .then((res) => res.json())
    .catch((err) => err);
};

export const getMyNotRegisteredCoursesApi = (userId) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/registers/my-not-registers?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .then((res) => res.json())
    .catch((err) => err);
};
