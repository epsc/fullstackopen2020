describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Juan Dela Cruz',
      username: 'jdlc',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('[name="Username"]').type('jdlc')
      cy.get('[name="Password"]').type('password')
      cy.contains('login').click()

      cy.contains('Juan Dela Cruz logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('[name="Username"]').type('jdlc')
      cy.get('[name="Password"]').type('wrong password')
      cy.contains('login').click()

      cy.get('.error').should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jdlc', password: 'password' })
    })

    it('a user can add a blog', function() {
      cy.contains('add blog').click()
      cy.get('input[name="title"]').type('Added using cypress')
      cy.get('input[name="author"]').type('Cyp Ress')
      cy.get('input[name="url"]').type('http://somesite.com/cypressTest')
      cy.get('#create-button').click()

      cy.contains('Added using cypress Cyp Ress')
    })

    it('a user can like a blog', function() {
      cy.createBlog({
        title: 'Add likes to this post',
        author: 'Cypress Test',
        url: 'http://link.com/'
      })

      cy.contains('Add likes to this post')
        .contains('view')
        .click()
      cy.contains('Add likes to this post')
        .parent()
        .contains('likes 0')
      cy.get('#like-button').click()

      cy.contains('Add likes to this post')
        .parent()
        .contains('likes 1')
    })

    it('the user that created a blog can delete it', function() {
      cy.createBlog({
        title: 'This post will be removed',
        author: 'Tester',
        url: 'http://site.com/'
      })

      cy.contains('This post will be removed')
        .contains('view')
        .click()
      cy.contains('delete')
        .click()

      cy.get('.pass').contains('Successfully deleted This post will be removed')
      cy.get('#root').should('not.contain', 'This post will be removed Tester')
    })

    it('the user can not delete a blog another user created', function() {
      // Create a second user
      const secondUser = {
        name: 'Maria Clara de los Santos',
        username: 'mcdls',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', secondUser)
      cy.visit('http://localhost:3000')


      // Create a blog using the initial user then logout
      cy.createBlog({
        title: 'Another user cannot delete this',
        author: 'Tester',
        url: 'http://site.com/'
      })

      cy.contains('logout').click()

      // Log in as the second user, the delete button should not be present
      cy.login({ username: secondUser.username , password: secondUser.password })
      cy.contains('view').click()

      cy.get('#delete-button').should('not.be.visible')
    })

    describe('when there are multiple blogs', function() {
      beforeEach(function() {
      // Create blogs and add different amount of likes
        cy.createBlog({
          title: 'Blog with no likes',
          author: 'Tester Zero',
          url: 'http://blog.com/zero',
        })
        cy.createBlog({
          title: 'Blog with one like',
          author: 'Tester One',
          url: 'http://blog.com/one',
        })
        cy.createBlog({
          title: 'Blog with two likes',
          author: 'Tester Two',
          url: 'http://blog.com/two',
        })

        // Add likes, but wait for put requests to finish before adding the next like
        cy.server()
        cy.route('PUT','/api/blogs/*').as('addLike')
        cy.addLike('Blog with one like')
        cy.wait('@addLike').addLike('Blog with two likes')
        cy.wait('@addLike').addLike('Blog with two likes')
        cy.wait('@addLike')
      })

      it('blogs are ordered according to likes with the most likes being first', function () {
        // The first result should have the highest likes, last should have the least.
        // Traverse through the blog divs checking in order
        cy.contains('Blog with').parent().as('firstBlog')
        cy.get('@firstBlog').should('contain', 'likes 2')
        cy.get('@firstBlog').next().should('contain', 'likes 1')
        cy.get('@firstBlog').next().next().should('contain', 'likes 0')
      })
    })
  })
})