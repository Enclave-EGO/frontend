export const getLessonApi = (lessonId) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/lessons/${lessonId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getLessonsByCourseApi = (courseId) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/lessons?courseId=${courseId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const createLessonApi = (lesson) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));
  return fetch(`/lessons/`, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(lesson)
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const updateLessonApi = (lessonId, lessonInfo) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/lessons/${lessonId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(lessonInfo)
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const deleteLessonApi = (lessonId) => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/lessons/${lessonId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .catch((error) => error);
};
