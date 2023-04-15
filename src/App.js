import React, { useEffect, useState } from 'react'
import { NewPosts } from './NewPosts'
import { HomePage } from './HomePage'
import { Posts } from './Posts'
import {About } from "./About"
import { Missing } from './Missing'
import { Route, Routes,  useNavigate  } from 'react-router-dom'
import { Layout } from './Layout'
import { format } from 'date-fns'
import { api } from './api/posts'
import { EditPost } from './EditPost'

const App = () => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts')
        setPosts(response.data)
        console.log(response.data);
      } catch (err) {
        if(err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }
    fetchPosts()
  },[])

  useEffect(()=>{
    const filteredResults = posts.filter(post => 
      ((post.body).toLocaleLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLocaleLowerCase()).includes(search.toLowerCase()))
      setSearchResults(filteredResults.reverse())
  },[posts,search])


  const handleDelete = async(id) => {
    try {
      await api.delete(`/posts/${id}`)
      const postList = posts.filter(post => post.id !== id)
      setPosts(postList)
      navigate("/")
    } catch (err) {
      console.log(`Error: ${err.message}`);

    }
 
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id +1 : 1 ;
    const datetime = format( new Date(), 'MMMM dd, yy pp')
    const newPost = {id, title: postTitle, datetime, body: postBody}
    try {
      const response = await api.post('/posts',newPost)
      const allPosts = [...posts,response.data]
      setPosts(allPosts)
      setPostTitle('')
      setPostBody('')
      navigate('/')
      }
    catch (err) {
      console.log(`Error: ${err.message}`);
    }}
    const handleEdit = async (id) => {
      const datetime = format( new Date(), 'MMMM dd, yy pp')
      const updatedPost = {id, title: editTitle, datetime, body: editBody}
      try {
        const response = await api.put(`/posts/${id}`, updatedPost)
        setPosts(posts.map(post => post.id === id ? {...response.data} : post));
        setEditTitle('');
        setEditBody('');
        navigate('/')
      } 
      catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }
  return (
    <Routes>
      <Route path='/' element={<Layout search={search} setSearch={setSearch}/>}>
        <Route index  element={<HomePage posts={searchResults}/>} />
        <Route path='post' >
          <Route index element={<NewPosts 
          handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />}/>
          <Route path=':id' element ={<Posts posts={posts} handleDelete={handleDelete} />} />
        </Route>
        <Route path='/edit/:id'element={<EditPost
           posts={posts} handleEdit={handleEdit}  editTitle={editTitle} setEditTitle={setEditTitle}
           setEditBody={setEditBody} editBody={editBody}
           />} />
        <Route path='about' element={<About/>} />
        <Route path='*' element={<Missing/>} />
      </Route>
    </Routes>

  )
}

export default App