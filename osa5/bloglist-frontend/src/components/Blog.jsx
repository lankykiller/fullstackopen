import { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog, user, onDelete }) => {

  const [showMore, setShowMore] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: likes + 1
    }
    const returnedBlog = await blogs.update(blog.id, updatedBlog)
    setLikes(returnedBlog.likes)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      if (onDelete) onDelete(blog.id)
    }
  }


  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShowMore(!showMore)}>
        {showMore ? 'hide' : 'view'}
      </button>

      {showMore && (
        <div>
          <div>{blog.url}</div>
          <div>likes: {likes}
            <button onClick={handleLike}>
              like</button>
          </div>
          <div>{blog.user?.name}</div>
          {user?.username.toString() === blog?.user?.username && (

            <button onClick={handleDelete}>remove</button>
          )}
        </div>

      )}



    </div>

  )
}

export default Blog