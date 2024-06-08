"use client";
import EmptyState from "@/component/app/EmptyState";
import AuthorListCard from "@/component/author/AuthorListCard";
import Container from "@/component/ui/Container";
import { useLazyGetAllAuthorsQuery } from "@/services/rtk/profileApi";
import React, { useEffect } from "react";

const AuthorsListContainer = () => {
  const [getAuthors, { data: authors }] = useLazyGetAllAuthorsQuery();

  useEffect(() => {
    getAuthors("");
  }, []);

  console.log("authors", authors);
  return (
    <div>
      <Container className="mt-5">
        <div className="grid grid-cols-2">
          <EmptyState data={authors?.data}>
            {authors?.data?.map((author) => {
              return <AuthorListCard author={author} />;
            })}
          </EmptyState>
        </div>
      </Container>
    </div>
  );
};

export default AuthorsListContainer;
