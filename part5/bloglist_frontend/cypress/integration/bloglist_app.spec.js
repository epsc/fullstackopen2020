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
})