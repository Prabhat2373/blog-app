import React, { useState } from "react";
import axios from "axios";
import RichTextEditor from "@/component/ui/RichTextEditor";
import { Descendant } from "slate";
// import RichTextEditor from "./RichTextEditor";

const dummy = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "test",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "text",
          text: "test",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          type: "image",
          attrs: {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACNElEQVRoge2YP0gbURzHf1qrUYfSJXGTjlUUHAudhCoYcVGHNgUlWAg4iC4OoWrbzUFxcnBwUAdFBcGhUErHFlpQcFI3wdKWLuIiQU1/v7zfec/cvSSX9N3L8D7wwdz75/eH9+6ZA7BYqo4Y+gE9QC9Z+vye+6qaBHqBZhVS30tj6Yowht6COrwjjUkayqikA72C4uEdaWybkaQKdqH08I7bRpL68AjNQPACMjzXOL0QPLzjCwN5PYxC+QWMhB/XSwrKLyBlIK8HW4BpbAGmsQWEDf3ir9L1/ypgmdu0YwsAW0Bl2ALAFlAZ1+h36TpZYlg/5e/GK7y2dn6iZ9J1vMSwfvZJ6+yj55qz5/gB4utghK+j6E3A4FmeE5XWPeK1tbPAAeJS2+ciYf38JM1vBfG6ZVFz9hzdHGBDansOwf4KNPaZNH+a23s0Z89Rix5yiC6p/Z0irJ+z0rzH6F/0BK3TnP2OAQ7yDdy9QLwF8SRRBae+dN5aa9yX0BvZyyq4t9IDqb2T2+R3pPR5HcQbPJk09++hNZrzemgEcaBRgI8gboV8YuD/Rroe3IPrWDE3FJpBPL8pyG90HG0oMJ72zyCI0DSHDsRogfGhQBtvEtxbhn5uolPoK3QInQBx0v7iMXSOzKNNBvIqaUFn0FNQb2J62iyhTw1lLAnajE/QfnBvlddoO/rQYK6y+AKigEixgdWKLcA0toAweINuKfwDooAdRf+wgbwenH8JynEu/LgWyz3+AQB5Ar65PzGZAAAAAElFTkSuQmCC",
            alt: null,
            title: null,
          },
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
    },
  ],
};

const BlogPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<Descendant[]>(dummy);

  console.log("content", content);
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/blogposts", {
        title,
        content: JSON.stringify(content),
        tags: tags.split(",").map((tag) => tag.trim()),
      });
      console.log("Blog post created:", response.data);
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content</label>
        <RichTextEditor value={content} onChange={setContent} />
      </div>
      <div>
        <label>Tags</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="comma separated"
        />
      </div>
      <button type="submit">Create Blog Post</button>
    </form>
  );
};

export default BlogPostForm;
