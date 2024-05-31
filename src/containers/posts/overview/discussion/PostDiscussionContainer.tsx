import RichTextEditor from "@/component/ui/editor/RichTextEditor";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Descendant } from "slate";
import PostCommentFormContainer from "../../forms/PostCommentFormContainer";
import { useParams } from "next/navigation";
import { useLazyGetPostCommentsQuery } from "@/services/rtk/postsApi";
import BlogCommentCard from "@/component/blog/comments/BlogCommentCard";

const PostDiscussionContainer = () => {
  const params = useParams();
  const postId = params?.id;

  const [getComments, { data }] = useLazyGetPostCommentsQuery();
  const [content, setContent] = useState<Descendant[]>([]);

  const fetchComments = () => {
    if (postId) {
      getComments(postId);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  console.log("comments", data);
  return (
    <>
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased md:w-2/3">
        <div className="">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion (20)
            </h2>
          </div>
          <div>
            {/* <RichTextEditor
              value={content}
              onChange={(value) => {
                setContent(value);
                // setFieldValue("content", value);
              }}
            />
            <Button className="my-3">Post Comment</Button> */}
            <PostCommentFormContainer />
          </div>
          {data?.data?.map((comment) => {
            return <BlogCommentCard data={comment} />;
          })}
        </div>
      </section>
    </>
  );
};

export default PostDiscussionContainer;
