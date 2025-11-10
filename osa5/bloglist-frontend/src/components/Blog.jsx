import { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog, user, onDelete, handleLike }) => {
  const [showMore, setShowMore] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const onLikeClick = () => {
    if (handleLike) {
      handleLike(blog.id)
    }
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
          <div>likes: {blog.likes}
            <button onClick={onLikeClick}>like</button>
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