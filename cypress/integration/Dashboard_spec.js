import {
  DECLARATION_STATUS,
  getDeclarationStatus,
  getCompletionJauge,
  getMissingEmployerFiles,
  getAllMissingFiles,
  getMissingInfoFiles,
} from '../pages/Dashboard'

describe('Dashboard page', function() {
  describe('Declaration not started ', () => {
    beforeEach(() => {
      cy.request('POST', '/api/tests/db/reset')
      cy.visit('/')
      cy.url().should('contain', '/dashboard')
    })

    it('should display declaration not started', () => {
      getDeclarationStatus().should('have.text', DECLARATION_STATUS.NOT_STARTED)
    })
  })

  describe('Declaration closed ', () => {
    beforeEach(() => {
      cy.request('POST', '/api/tests/db/reset-for-actu-closed')
      cy.visit('/')
      cy.url().should('contain', '/dashboard')
    })

    it('should display declaration closed', () => {
      getDeclarationStatus().should('have.text', DECLARATION_STATUS.CLOSED)
    })
  })

  describe('Declaration on going - Employers *not* declared', () => {
    beforeEach(() => {
      cy.request('POST', '/api/tests/db/reset-for-employers')
      cy.visit('/')
      cy.url().should('contain', '/dashboard')
    })

    it('should display declaration on going', () => {
      getDeclarationStatus().should('have.text', DECLARATION_STATUS.ON_GOING)
    })
    it('should display 30% as declaration completion', () => {
      getCompletionJauge().should('have.text', '30%')
    })
  })

  describe('Declaration on going - Employers declared', () => {
    beforeEach(() => {
      cy.request('POST', '/api/tests/db/reset-for-files')
      cy.visit('/')
      cy.url().should('contain', '/dashboard')
    })

    it('should display declaration on going', () => {
      getDeclarationStatus().should('have.text', DECLARATION_STATUS.ON_GOING)
    })

    it('should display 70% as declaration completion', () => {
      getCompletionJauge().should('have.text', '70%')
    })

    it('should display expected 3 files', () => {
      getAllMissingFiles().should('have.length', 3)
    })
    it('should display expected 2 employer files', () => {
      getMissingEmployerFiles().should('have.length', 2)
    })
    it('should display expected 1 info file', () => {
      getMissingInfoFiles().should('have.length', 1)
    })
  })

  describe('Declaration finished', () => {
    beforeEach(() => {
      cy.request('POST', '/api/tests/db/reset-for-files', {
        declarationOverride: {
          isFinished: true,
        },
      })
      cy.visit('/')
      cy.url().should('contain', '/dashboard')
    })

    it('should display declaration finished', () => {
      getDeclarationStatus().should('have.text', DECLARATION_STATUS.FINISHED)
    })
  })
})
