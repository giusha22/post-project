import React from 'react'
import { Link } from 'react-router-dom'

export const HomePage = ({posts }) => {
  return (
    <main className='Home'>
      {posts.length ? (
      posts.map((post)=>{
        return(
          <article className='post' key={post.id}> 
            <Link to={`/post/${post.id}`}>
              <h2>{post.title}</h2>
              <p className='postDate'>{post.datetime}</p>
            </Link>
            <p className='postBody'>{
            (post.body).length <= 25 ? 
            post.body :
            `${(post.body).slice(0, 25)}...`
            }</p>
          </article>
        )
      })
      ) : (
        <p style={{marginTop : "2rem"}}>No posts to dispaly</p>
      )}
    </main>
  )
}
