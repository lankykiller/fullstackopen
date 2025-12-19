describe('Note app', function () {

  beforeEach(function () {
   /* cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'testinimi',
      username: 'testikaveri',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)*/

    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('user can login', function () {
    cy.contains('button', 'login').click()
    cy.get('input:first').type('testikaveri')
    cy.get('input:last').type('salasana')
    cy.get('#login-button').click()

    cy.contains('testi logged in')
  })

  describe('when logged in', function () {
   beforeEach(function () {
      cy.contains('button', 'login').click()
      cy.contains('label', 'username').type('testikaveri')
      cy.contains('label', 'password').type('salasana')
      cy.get('#login-button').click()
    }) 

    it('a new note can be created', function () {
      cy.contains('new note').debug()
      cy.get('input').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('new note').click()
        cy.get('input').type('another note cypress')
        cy.contains('save').click()
      })

      it('it can be made not important', function () {
        cy.contains('another note cypress')
          .contains('button', 'make not important')
          .click()

        cy.contains('another note cypress')
          .contains('button', 'make important')
      })
    })
  })
})


