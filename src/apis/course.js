export const getCourseApi = (courseId) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/courses/${courseId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getCoursesApi = (courseId) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/courses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
