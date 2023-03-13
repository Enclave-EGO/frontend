export const getCourseApi = (courseId) => {
  return fetch(`/course/${courseId}`, {
    method: "GET"
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
