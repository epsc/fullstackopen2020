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
    beforeEach(function () {
      cy.login({ username: 'jdlc', password: 'password' })
    })

    it('a user can add a blog', function() {
      cy.contains('add blog').click()
      cy.get('[name="title"]').type('Added using cypress')
      cy.get('[name="author"]').type('Cyp Ress')
      cy.get('[name="url"]').type('http://somesite.com/cypressTest')
      cy.get('#create-button').click()

      cy.contains('Added using cypress Cyp Ress')
    })

    it.only('a user can like a blog', function() {
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
  })
})