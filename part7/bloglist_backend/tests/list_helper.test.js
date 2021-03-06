const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  { _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const singleEntry = [
  {
    _id: '5f06be345d1b8f0be83606ab',
    title: 'A new blog post',
    author: 'VS Code Rest Client',
    url: 'http://newblogpost.com/newPost',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {
  test('of an empty list is 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('of a list with a single entry returns the likes of the entry ', () => {
    expect(listHelper.totalLikes(singleEntry)).toBe(2)
  })

  test('of a list returns the correct total number of likes', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })
})

describe('favorite blog', () => {
  const highestVotes = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  }

  const singleEntryExpected = {
    title: singleEntry[0].title,
    author: singleEntry[0].author,
    likes: singleEntry[0].likes
  }

  test('of an empty list is null', () => {
    expect(listHelper.favoriteBlog([])).toEqual(null)
  })

  test('of a list with a single entry returns the title, author, and likes of the entry', () => {
    expect(listHelper.favoriteBlog(singleEntry)).toEqual(singleEntryExpected)
  })

  test('returns the title, author, and likes of the blog with the highest number of likes', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(highestVotes)
  })
})


describe('most blogs', () => {
  const mostBlogs = {
    author: 'Robert C. Martin',
    blogs: 3
  }

  const mostBlogsSingle = {
    author: 'VS Code Rest Client',
    blogs: 1
  }

  test('when list is empty returns null', () => {
    expect(listHelper.mostBlogs([])).toEqual(null)
  })

  test('when list has one entry returns the entry author with a blog count of 1', () => {
    expect(listHelper.mostBlogs(singleEntry)).toEqual(mostBlogsSingle)
  })

  test('returns the author and number of blogs of the author with the most blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual(mostBlogs)
  })
})

describe('most likes', () => {
  const mostLikes = {
    author: 'Edsger W. Dijkstra',
    likes: 17
  }

  const mostLikesSingle = {
    author: 'VS Code Rest Client',
    likes: 2
  }

  test('in an empty list is null', () => {
    expect(listHelper.mostLikes([])).toBeNull()
  })

  test('in a list with a single entry returns the author and likes of the entry', () => {
    expect(listHelper.mostLikes(singleEntry)).toEqual(mostLikesSingle)
  })

  test('is the author with the highest sum of likes across all the posts of the author', () => {
    expect(listHelper.mostLikes(blogs)).toEqual(mostLikes)
  })
})