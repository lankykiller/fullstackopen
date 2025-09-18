const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('Blog does not have _id property', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  
  blogs.forEach(blog => {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

test('Blog can be added ', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  assert(titles.includes('Canonical string reduction'))
})

test('Blog without likes is added with likes property set to 0', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Baby Yoda',
    url: 'http://example.com/blog-without-likes',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

assert.strictEqual(response.body.likes, 0)
//assert.strictEqual(response.body.author, 'Baby Yoda')
})

test('blog without title or url is a bad request', async() => {

const newBlog = {
    author: 'Baby Yoda',
    url: 'http://example.com/blog-without-likes',
    likes: '10'
}

const secondBlog = {
    author: 'Baby youda',
    title: 'Crazy blog',
    likes: '10'
}

await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

await api
    .post('/api/blogs')
    .send(secondBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})



after(async () => {
  await mongoose.connection.close()
})