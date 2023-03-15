import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  SignupPage,
  SigninPage,
  CourseDetailPage,
  CreateCoursePage,
  UpdateCoursePage,
  LessonDetailPage,
  CreateLessonPage,
  UpdateLessonPage,
  TestTeacherPage,
  ManageCoursePage,
  NotFoundPage
} from "../pages";

function Screens() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/courses/create" element={<CreateCoursePage />} />
      <Route path="/courses/update/:courseId" element={<UpdateCoursePage />} />
      <Route path="/courses/:courseId" element={<CourseDetailPage />} />
      <Route path="/lessons/create" element={<CreateLessonPage />} />
      <Route path="/lessons/update/:lessonId" element={<UpdateLessonPage />} />
      <Route path="/lessons/:lessonId" element={<LessonDetailPage />} />
      <Route path="/tests/:id" element={<TestTeacherPage />} />
      <Route path="/manage/courses" element={<ManageCoursePage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Screens;
