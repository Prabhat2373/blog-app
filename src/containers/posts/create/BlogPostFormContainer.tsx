"use client";
import { blogCategories } from "@/__mock__/blogs.categories";
import Asterisk from "@/component/form/Asterisk";
import FileDropableInput from "@/component/form/FileDropableInput";
import InputError from "@/component/form/InputError";
import InputField from "@/component/inputs/InputField";
import Modal from "@/component/modals/Modal";
import ReactSelect from "@/component/select/ReactSelect";
import RichTextEditor from "@/component/ui/editor/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import BlogPostDraftHandler from "@/helpers/form/BlogPostDraftHandler";
import { useCreatePostMutation } from "@/services/rtk/postsApi";
import { isSuccess } from "@/utils/utils";
import { createPostValidation } from "@/validators/posts/posts.validator";
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
  const [content, setContent] = useState<Descendant[]>([]);

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
      router.push(`/posts/${response?.data?.data?._id}`);
    }
  };
  const initialValues = useMemo(() => {
    return {
      title: "",
      content: null,
      tags: "",
    };
  }, []);

  const fileTypes = ["JPEG", "PNG"];

  const handleChange = (file) => {
    setThumbnail(file?.[0]);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Schedule For Later"}
        description={"test"}
      >
        <div>
          <div>Schedule for later</div>
          <div className="flex justify-end">
            <Button>Shedule</Button>
          </div>
        </div>
      </Modal>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={createPostValidation}
      >
        {({ setFieldValue, values, errors }) => {
          console.log("values", values);
          console.log("errors", errors);
          return (
            <Form className="mx-32 my-20 flex flex-col gap-4">
              <BlogPostDraftHandler content={content} thumbnail={thumbnail} />
              <div>
                <InputField
                  label="Title"
                  name="title"
                  placeholder="Enter About Your Blog"
                  required
                />
              </div>
              <div>
                <Label>
                  Content <Asterisk />
                </Label>
                <RichTextEditor
                  value={content}
                  onChange={(value) => {
                    setContent(value);
                    // setFieldValue("content", value);
                  }}
                />
                {errors?.content ? (
                  <InputError>{errors?.content}</InputError>
                ) : null}
              </div>
              <div>
                <Label>Tags (optional)</Label>
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
                <Label>Thumbnail</Label>
                <FileDropableInput
                  multiple={true}
                  onChange={(file) => {
                    setFieldValue("thumbnail", file);
                    handleChange(file);
                  }}
                  name="file"
                  types={fileTypes}
                />
                {errors?.thumbnail ? (
                  <InputError>{errors?.thumbnail}</InputError>
                ) : null}
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
