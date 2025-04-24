import React from "react";

import { Routes, Route } from "react-router-dom";

import PostList from "../../Component/PostList";

import CreatePost from "./CreatePost";

import PostDetails from "./PostDetails";

const index = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<PostList />} />

        <Route path="create" element={<CreatePost />} />

        <Route path="edit/:postId" element={<EditPost />} />

        <Route path=":postId" element={<PostDetails />} />
      </Routes>
    </div>
  );
};

export default index;
