'use client';
import { blogCategories } from '@/__mock__/blogs.categories';
import Asterisk from '@/components/form/Asterisk';
import FileDropableInput from '@/components/form/FileDropableInput';
import InputError from '@/components/form/InputError';
import InputField from '@/components/inputs/InputField';
import Modal from '@/components/modals/Modal';
import ReactSelect from '@/components/select/ReactSelect';
import RichTextEditor from '@/components/ui/editor/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { BLOG_POST_MODES } from '@/config/app/AppConstants';
import BlogPostDraftHandler from '@/helpers/form/BlogPostDraftHandler';
import {
  useCreatePostMutation,
  useLazyGetPostOverviewQuery,
  useUpdateBlogMutation
} from '@/services/rtk/postsApi';
import { isSuccess } from '@/utils/utils';
import { createPostValidation } from '@/validators/posts/posts.validator';
import { IconBolt, IconClockBolt, IconDeviceFloppy } from '@tabler/icons-react';
import { Form, Formik } from 'formik';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Descendant } from 'slate';

interface ICreateBlogPostFormContainer {
  mode: BLOG_POST_MODES.CREATE | BLOG_POST_MODES.EDIT;
}
const CreateBlogPostFormContainer = ({ mode }: ICreateBlogPostFormContainer) => {
  const params = useParams();
  const postId = params?.id;
  const [isOpen, setIsOpen] = useState(false);
  const [getBlogPost, { data: postData }] = useLazyGetPostOverviewQuery();
  const [publishPost, { isLoading }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdateBlogMutation();

  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState<Descendant[]>([]);

  console.log('postData', postData);
  const router = useRouter();
  console.log('content', content);

  const handleSuccess = (response) => {
    if (isSuccess(response)) {
      toast.success(response?.data?.message);
      router.push(`/posts/${response?.data?.data?._id}`);
    }
  };

  const handleSubmit = async (data) => {
    const payload = {
      ...data,
      content
    };
    const formdata = new FormData();
    Object.keys(payload).forEach((key) => {
      if (key !== 'thumbnail' && key !== 'content' && key !== 'tags') {
        formdata.append(key, payload[key]);
      }
    });

    formdata.append('content', JSON.stringify(payload.content));
    formdata.append('tags', JSON.stringify(payload.tags));
    formdata.append('file', thumbnail);

    if (mode === BLOG_POST_MODES.EDIT) {
      const response = await updatePost({
        id: postId,
        body: formdata
      });
      console.log('Blog post updated:', response.data);
      handleSuccess(response);
    } else {
      const response = await publishPost(formdata);
      console.log('Blog post created:', response.data);
      handleSuccess(response);
    }
  };
  const initialValues = useMemo(() => {
    return {
      title: postData?.title ?? '',
      content: null,
      tags: postData?.tags ?? [],
      mode: mode
    };
  }, [postData]);

  const fileTypes = ['JPEG', 'PNG'];

  const handleChange = (file) => {
    setThumbnail(file?.[0]);
  };

  useEffect(() => {
    if (mode === BLOG_POST_MODES.EDIT) {
      getBlogPost(postId);
    }
  }, [mode, postId]);
  useEffect(() => {
    if (postData?.content) {
      setContent(postData?.content);
    }
  }, [postData]);
  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={'Schedule For Later'}
        description={'test'}
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
        enableReinitialize
      >
        {({ setFieldValue, values, errors }) => {
          console.log('values', values);
          console.log('errors', errors);
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
                {errors?.content ? <InputError>{errors?.content}</InputError> : null}
              </div>
              <div>
                <Label>Tags (optional)</Label>
                <ReactSelect
                  options={blogCategories}
                  // value={/}
                  isMulti
                  onChange={(option) => {
                    setFieldValue(
                      'tags',
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
                    setFieldValue('thumbnail', file);
                    handleChange(file);
                  }}
                  name="file"
                  types={fileTypes}
                />
                {errors?.thumbnail ? <InputError>{errors?.thumbnail}</InputError> : null}
              </div>
              <div>
                <img src={postData?.thumbnail} alt="thumbnail" width={200} height={200} />
              </div>
              <div className="flex gap-3 items-center justify-end">
                <Button variant={'outline'}>
                  <IconDeviceFloppy /> Save as Draft
                </Button>
                <Button variant={'outline'} type="button" onClick={() => setIsOpen(true)}>
                  <IconClockBolt /> Schedule For Later
                </Button>
                <Button isLoading={isLoading || isUpdating}>
                  <IconBolt /> {mode === BLOG_POST_MODES.EDIT ? 'Update' : 'Publish'}
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
