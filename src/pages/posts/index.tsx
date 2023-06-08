import { GetStaticProps, GetStaticPropsContext } from 'next'
import Link from 'next/link'
import React from 'react'

export interface PostListPageProps {
  posts: any[]
}

const Posts = ({posts}: PostListPageProps) => {
  return (
    <ul>
      {
        posts.map((obj,index)=><Link href={`/posts/${obj.id}`} key={index}>{obj.id}</Link>)
      }
    </ul>
  )
}

export default Posts



export const getStaticProps: GetStaticProps<PostListPageProps> = async(context: GetStaticPropsContext) => {


  const resp = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=1`);
  const data = await resp.json();
  
  return {
    props:{
      posts: data.data.map((obj:any) =>({id:obj.id}))
    }
  }

}