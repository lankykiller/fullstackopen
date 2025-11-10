import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage] = useState(null)
  const blogFromRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    } else {
      console.log('no user logged in')

    }

  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('logged in user:', user)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (id) => {
  try {
    const blogToUpdate = blogs.find(b => b.id === id)
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }
    const returnedBlog = await blogService.update(id, updatedBlog)
    setBlogs(blogs.map(blog => blog.id === id ? returnedBlog : blog))
  } catch (error) {
    console.error('like failed', error)
  }
}

  const logoutButton = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFromRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const handleDeleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(prev => prev.filter(b => b.id !== id))
    } catch (error) {
      console.error('delete failed', error)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} type="error" />
        <h2>log in to application</h2>
        {loginForm()}
      </div>
    )

  } else {
    return (
      <div>
        <Notification message={successMessage} type="success" />
        <h2>blogs</h2>
        <p>
          {user.name} logged in <button onClick={logoutButton}>logout</button>
        </p><Togglable buttonLabel="new Blog" ref = {blogFromRef}><BlogForm createBlog={addBlog}/></Togglable>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} user={user} onDelete={handleDeleteBlog} handleLike={handleLike} />
        )}
      </div>
    )
  }
}

export default App