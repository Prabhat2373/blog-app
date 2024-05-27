"use client";
import React, { useMemo, useState } from "react";
import axios from "axios";
import RichTextEditor from "@/component/ui/editor/RichTextEditor";
import { Descendant } from "slate";
import { Form, Formik } from "formik";
import InputField from "@/component/inputs/InputField";
import { Button } from "@/components/ui/button";
import { useCreatePostMutation } from "@/services/rtk/postsApi";
import { Label } from "@/components/ui/label";
import FileDnD from "@/component/form/FileDnd";
// import RichTextEditor from "./RichTextEditor";

// const dummy = {
//   type: "doc",
//   content: [
//     {
//       type: "paragraph",
//       attrs: {
//         textAlign: "left",
//       },
//       content: [
//         {
//           type: "text",
//           marks: [
//             {
//               type: "bold",
//             },
//           ],
//           text: "test",
//         },
//       ],
//     },
//     {
//       type: "paragraph",
//       attrs: {
//         textAlign: "left",
//       },
//       content: [
//         {
//           type: "text",
//           text: "test",
//         },
//       ],
//     },
//     {
//       type: "paragraph",
//       attrs: {
//         textAlign: "left",
//       },
//       content: [
//         {
//           type: "image",
//           attrs: {
//             src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACNElEQVRoge2YP0gbURzHf1qrUYfSJXGTjlUUHAudhCoYcVGHNgUlWAg4iC4OoWrbzUFxcnBwUAdFBcGhUErHFlpQcFI3wdKWLuIiQU1/v7zfec/cvSSX9N3L8D7wwdz75/eH9+6ZA7BYqo4Y+gE9QC9Z+vye+6qaBHqBZhVS30tj6Yowht6COrwjjUkayqikA72C4uEdaWybkaQKdqH08I7bRpL68AjNQPACMjzXOL0QPLzjCwN5PYxC+QWMhB/XSwrKLyBlIK8HW4BpbAGmsQWEDf3ir9L1/ypgmdu0YwsAW0Bl2ALAFlAZ1+h36TpZYlg/5e/GK7y2dn6iZ9J1vMSwfvZJ6+yj55qz5/gB4utghK+j6E3A4FmeE5XWPeK1tbPAAeJS2+ciYf38JM1vBfG6ZVFz9hzdHGBDansOwf4KNPaZNH+a23s0Z89Rix5yiC6p/Z0irJ+z0rzH6F/0BK3TnP2OAQ7yDdy9QLwF8SRRBae+dN5aa9yX0BvZyyq4t9IDqb2T2+R3pPR5HcQbPJk09++hNZrzemgEcaBRgI8gboV8YuD/Rroe3IPrWDE3FJpBPL8pyG90HG0oMJ72zyCI0DSHDsRogfGhQBtvEtxbhn5uolPoK3QInQBx0v7iMXSOzKNNBvIqaUFn0FNQb2J62iyhTw1lLAnajE/QfnBvlddoO/rQYK6y+AKigEixgdWKLcA0toAweINuKfwDooAdRf+wgbwenH8JynEu/LgWyz3+AQB5Ar65PzGZAAAAAElFTkSuQmCC",
//             alt: null,
//             title: null,
//           },
//         },
//       ],
//     },
//     {
//       type: "paragraph",
//       attrs: {
//         textAlign: "left",
//       },
//     },
//   ],
// };

const CreateBlogPostFormContainer = () => {
  const [publishPost, { isLoading }] = useCreatePostMutation();
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState<Descendant[]>([{}]);

  console.log("content", content);
  const [tags, setTags] = useState("");

  const handleSubmit = async (data) => {
    const payload = {
      ...data,
      content,
    };
    
    const response = await publishPost(payload);
    console.log("Blog post created:", response.data);
  };
  const initialValues = useMemo(() => {
    return {
      title: "",
      content: {},
      tags: "",
    };
  }, []);
  console.log("files", files);
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="mx-32 my-20 flex flex-col gap-4">
        <div>
          <InputField
            label="Title"
            name="title"
            placeholder="Enter About Your Blog"
          />
        </div>
        <div>
          <Label>Content</Label>
          <RichTextEditor value={content} onChange={setContent} />
        </div>
        <div>
          <InputField
            label="Tags"
            name="tags"
            placeholder="Use Comma (,) saperated value "
          />
        </div>
        <FileDnD setFiles={setFiles} files={files} />
        <div>
          <Button isLoading={isLoading}>Publish</Button>
        </div>
      </Form>
    </Formik>
  );
};

export default CreateBlogPostFormContainer;
