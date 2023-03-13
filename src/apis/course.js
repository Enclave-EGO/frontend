export const getCourseApi = (courseId) => {
  return fetch(`/course/${courseId}`, {
    method: "GET"
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getCourses = () => {
  const token = JSON.parse(localStorage.getItem("signin_token"));

  return fetch(`/courses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
};
