import * as Yup from "yup";
export const createPostValidation = Yup.object({
  title: Yup.string().required("Title is required"),
  thumbnail: Yup.mixed().required("Thumbnail is required"),
  //   content: Yup.object().required("Content is required"),
});
