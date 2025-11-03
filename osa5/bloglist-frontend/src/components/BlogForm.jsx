import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleAddBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    createBlog(blogObject)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

  }

  return (

    <form onSubmit={handleAddBlog} >

      <h2>create blog</h2>
      <div>
            title:
        <input
          type="text"
          value={newTitle}
          name="Title"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
        author:
      <input
        type="text"
        value={newAuthor}
        name="Author"
        onChange={({ target }) => setNewAuthor(target.value)}
      />
      < div >
            url:
        <input
          type="text"
          value={newUrl}
          name="Url"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div >
      <button type="submit">create</button>
    </form >
  )
}

export default BlogForm