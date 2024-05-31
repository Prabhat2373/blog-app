import RichTextEditor from "@/component/ui/editor/RichTextEditor";
import { Button } from "@/components/ui/button";
import { useCommentOnPostMutation } from "@/services/rtk/postsApi";
import { isSuccess } from "@/utils/utils";
import { Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Descendant } from "slate";

const PostCommentFormContainer = () => {
  const router = useRouter();
  const params = useParams();
  console.log("params", params);
  const [postComment, { isLoading }] = useCommentOnPostMutation();
  const [content, setContent] = useState<Descendant[]>([]);

  const initialValues = {
    content: "",
  };

  const handlePostComment = async (data: typeof initialValues) => {
    const payload = {
      blogId: params?.id,
      body: {
        content,
      },
    };
    const res = await postComment(payload);
    if (isSuccess(res)) {
      toast.success(res?.data?.message);
    }
  };
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handlePostComment}>
        <Form>
          <RichTextEditor
            output="html"
            value={content}
            onChange={(value) => {
              setContent(value);
              // setFieldValue("content", value);
            }}
          />
          <Button className="my-3">Post Comment</Button>
        </Form>
      </Formik>
    
    </div>
  );
};

export default PostCommentFormContainer;
