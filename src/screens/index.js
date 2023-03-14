import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  SignupPage,
  SigninPage,
  CourseDetailPage,
  LessonDetailPage,
  NotFoundPage,
  TestTeacherPage
} from "../pages";

function Screens() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/course/:courseId" element={<CourseDetailPage />} />
      <Route path="/lesson/:lessonId" element={<LessonDetailPage />} />
      <Route path="/tests/:id" element={<TestTeacherPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Screens;
