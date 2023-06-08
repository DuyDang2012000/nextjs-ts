import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";

export interface PostPageProps {
  post: any;
}

const PostsDetailId = ({ post }: PostPageProps) => {
  const router = useRouter()
  if (!post) return null;
  return (
    <div>
      <ul>
        <li>{post?.title}</li>
      </ul>
    </div>
  );
};

export default PostsDetailId;

export const getStaticPaths: GetStaticPaths = async () => {
  const resp = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=1`);
  const data = await resp.json();

  return {
    paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async (
  context: GetStaticPropsContext
) => {
  const postId = context.params?.postId;
  if (!postId) return { notFound: true };

  const resp = await fetch(
    `https://js-post-api.herokuapp.com/api/posts/${postId}`
  );
  const data = await resp.json() || [];
  
  return {
    props: {
      post: data,
    },
  };
};
