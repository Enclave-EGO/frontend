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
    .catch((err) => console.log(err));
};
