import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
/* eslint-disable */

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getAllByPlaceholderText('write title here')[0]
    const authorInput = screen.getAllByPlaceholderText('write author name here')[0]
    const urlInput = screen.getAllByPlaceholderText('write url here')[0]
    const sendButton = screen.getByText('create')

    await user.type(titleInput, 'testing a form...')
    await user.type(authorInput, 'tester')
    await user.type(urlInput, 'www.test.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
    expect(createBlog.mock.calls[0][0].author).toBe('tester')
    expect(createBlog.mock.calls[0][0].url).toBe('www.test.com')
})