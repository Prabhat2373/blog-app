"use client";
import React, { useEffect } from "react";
import BlogPostForm from "./BlogPostFormContainer";
import BlogPost from "@/component/BlogPost";
import { useAppSelector } from "@/hooks/useRtkQuery";
import { RootState } from "@/services/store";
import { useGetPokemonByNameQuery } from "@/services/rtk/testApi";
import { useLazyGetPostOverviewQuery } from "@/services/rtk/postsApi";
// export const content = {
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

const MainPageContainer = () => {
  const [getPost, { data }] = useLazyGetPostOverviewQuery();
  console.log("data", data);
  const todos = useAppSelector((state: RootState) => state.todos);
  console.log("todos", todos);

  useEffect(() => {
    getPost("665339eec603975d806b3080");
  }, []);
  return (
    <>
      <BlogPostForm />
      {data?.content ? <BlogPost content={data?.content} /> : null}
    </>
  );
};

export default MainPageContainer;
