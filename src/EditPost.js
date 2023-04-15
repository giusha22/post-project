  import React, { useEffect } from 'react'
  import { Link, useParams } from 'react-router-dom'


  export const EditPost = ({posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle}) => {
      const {id} = useParams();
      const post = posts.find(post => post.id.toString() === id )

      useEffect(()=>{
          if(post) {
              setEditTitle(post.title);
              setEditBody(post.body);
          }
      },[post,setEditBody, setEditTitle])

    return (

      <main className='NewPost'>
        {editTitle &&  <>
          <h2>Edit Posts</h2>
          <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='postTitle'>Title:</label>
            <input 
            id = "postTitle"
            type='text'
            required
            value={editTitle}
            onChange={(e)=> setEditTitle(e.target.value)}
            />
            <label htmlFor='postBody'>Posts:</label>
            <textarea 
            id='postBody'
            required
            value={editBody}
            onChange={(e)=> setEditBody(e.target.value)}
            />
            <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
          </form>
          </>
        }
        {!editTitle && 
          <>
            <h2>Post Not Foudsdasdnd </h2>
            <p>well, that's disappointing.</p>
            <p>
              <Link to="/">Visit Our HomePage</Link>
            </p>
          </>
        }

      </main> 
    )
  }
