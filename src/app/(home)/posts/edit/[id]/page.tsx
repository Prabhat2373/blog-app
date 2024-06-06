"use client";
import { BLOG_POST_MODES } from "@/config/app/AppConstants";
import CreateBlogPostFormContainer from "@/containers/posts/create/BlogPostFormContainer";
import React from "react";

const EditBlogPostIndex = () => {
  return <CreateBlogPostFormContainer mode={BLOG_POST_MODES.EDIT} />;
};

export default EditBlogPostIndex;
