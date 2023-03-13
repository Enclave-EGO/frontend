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
    .catch((err) => {
      return err;
    });
};
