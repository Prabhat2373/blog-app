"use client";
import { blogCategories } from "@/__mock__/blogs.categories";
import InputField from "@/component/inputs/InputField";
import Modal from "@/component/modals/Modal";
import ReactSelect from "@/component/select/ReactSelect";
import RichTextEditor from "@/component/ui/editor/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import BlogPostDraftHandler from "@/helpers/form/BlogPostDraftHandler";
import {
  useCreatePostMutation,
  useSaveDraftsMutation,
} from "@/services/rtk/postsApi";
import { isSuccess } from "@/utils/utils";
import { IconBolt, IconClockBolt, IconDeviceFloppy } from "@tabler/icons-react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Descendant } from "slate";

const CreateBlogPostFormContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [publishPost, { isLoading }] = useCreatePostMutation();

  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState<Descendant[]>([{}]);

  const router = useRouter();
  console.log("content", content);

  const handleSubmit = async (data) => {
    const payload = {
      ...data,
      content,
    };
    const formdata = new FormData();
    Object.keys(payload).forEach((key) => {
      if (key !== "thumbnail" && key !== "content" && key !== "tags") {
        formdata.append(key, payload[key]);
      }
    });

    formdata.append("content", JSON.stringify(payload.content));
    formdata.append("tags", JSON.stringify(payload.tags));
    formdata.append("file", thumbnail);

    const response = await publishPost(formdata);
    console.log("Blog post created:", response.data);
    if (isSuccess(response)) {
      toast.success(response?.data?.message);
      // router.push(`/posts/${response?.data?.data?._id}`);
    }
  };
  const initialValues = useMemo(() => {
    return {
      title: "",
      content: {},
      tags: "",
    };
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={"Schedule For Later"}>
        <div>
          <div>Schedule for later</div>
          <div className="flex justify-end">
            <Button>Shedule</Button>
          </div>
        </div>
      </Modal>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => {
          console.log("values", values);
          return (
            <Form className="mx-32 my-20 flex flex-col gap-4">
              <BlogPostDraftHandler content={content} thumbnail={thumbnail} />
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
                <Label>Tags</Label>
                <ReactSelect
                  options={blogCategories}
                  isMulti
                  onChange={(option) => {
                    setFieldValue(
                      "tags",
                      option?.map((option) => option?.label)
                    );
                  }}
                />
              </div>
              <div>
                <input
                  type="file"
                  onChange={(e) => setThumbnail(e?.target?.files?.[0])}
                />
              </div>
              <div className="flex gap-3 items-center justify-end">
                <Button variant={"outline"}>
                  <IconDeviceFloppy /> Save as Draft
                </Button>
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={() => setIsOpen(true)}
                >
                  <IconClockBolt /> Schedule For Later
                </Button>
                <Button isLoading={isLoading}>
                  <IconBolt /> Publish
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CreateBlogPostFormContainer;
