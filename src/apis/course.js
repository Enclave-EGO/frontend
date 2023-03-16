export const getCourseApi = (courseId) => {
  return fetch(`/courses/${courseId}`, {
    method: "GET"
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getCoursesApi = () => {
  return fetch("/courses", {
    method: "GET"
  })
    .then((res) => res.json())
    .catch((error) => error);
};

export const getCoursesByUserApi = (userId) => {
  return fetch(`/courses?userId=${userId}`, {
    method: "GET"
  })
    .then((res) => res.json())
    .catch((error) => error);
};

export const createCourseApi = (course) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/courses/`, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(course)
  })
    .then((res) => res.json())
    .catch((error) => error);
};

export const updateCourseApi = (courseId, courseInfo) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/courses/${courseId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(courseInfo)
  })
    .then((res) => res.json())
    .catch((error) => error);
};
    
export const deleteCourseApi = (courseId) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/courses/${courseId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .catch((error) => error);
};
