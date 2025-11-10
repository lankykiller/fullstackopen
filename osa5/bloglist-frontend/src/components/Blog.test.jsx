import { render, screen } from '@testing-library/react'
import Blog from './Blog.jsx'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable.jsx'
/* eslint-disable */


test('renders content', () => {

    const blog = {
        title: 'Test blog',
        author: 'test author',
        url: 'testurl',
        likes: 99
    }

    render(<Blog blog={blog} />)

   // screen.debug()

    const element = screen.getByText('Test blog test author')
    expect(element).toBeDefined()
   // const element2 = screen.getByText('test author')
   // expect(element2).toBeDefined()

})

test('not url rendered', () => {

    const blog = {
        title: 'Test blog',
        author: 'test author',
        url: 'testurl',
        likes: 99
    }

    render(<Blog blog={blog} />)

    //screen.debug()

    const urlElement = screen.queryByText('testurl')
    expect(urlElement).toBeNull()

})

test('not likes rendered', () => {

    const blog = {
        title: 'Test blog',
        author: 'test author',
        url: 'testurl',
        likes: 99
    }
    
    render(<Blog blog={blog} />)

   // screen.debug()
    
    const likesElement = screen.queryByText('99')
    expect(likesElement).toBeNull()
})

describe('<Togglable />', () => {
    beforeEach(() => {
        render(
            <Togglable buttonLabel="view...">
                <Blog blog={{
                    title: 'Test blog',
                    author: 'test author',
                    url: 'testurl',
                    likes: 99
                }} />
            </Togglable>
        )
    })

    test('renders its children', () => {
        screen.getByText('Test blog test author')
    })

    test('at start the children are not displayed', () => {
        const urlElement = screen.queryByText('testurl')
        expect(urlElement).toBeNull()

        const likesElement = screen.queryByText('99')
        expect(likesElement).toBeNull()
    })

    test('after clicking the button, url and likes are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        screen.debug()

        const urlElement = screen.getByText('testurl')
        expect(urlElement).toBeDefined()

        const likesElement = screen.getByText('likes: 99')
        expect(likesElement).toBeDefined()
    })
})


test('clicking the like button twice calls event handler twice', async () => {
    const blog = {
        title: 'Test blog',
        author: 'test author',
        url: 'testurl',
        likes: 99
    }
    
    const mockHandler = vi.fn()
    
    render(
        <Blog blog={blog} handleLike={mockHandler} />
    )
    
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    
    expect(mockHandler.mock.calls).toHaveLength(2)
})