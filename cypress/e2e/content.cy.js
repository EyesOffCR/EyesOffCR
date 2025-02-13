describe('Content Tests', () => {
  it('should have correct content on home page', () => {
    cy.visit('/')
    cy.get('img[alt="EyesOffCR.org Logo"]').should('be.visible')
    cy.contains(/surveillance/i).should('be.visible')
    cy.get('img').should('have.attr', 'alt')
  })

  it('should have correct content on about page', () => {
    cy.visit('/about.html')
    cy.get('h1').should('be.visible')
    cy.get('p').should('have.length.at.least', 1)
  })

  it('should have correct content on media package page', () => {
    cy.visit('/media_package.html')
    cy.get('#page-title').should('be.visible')
    cy.contains('Social Media Graphics').should('exist')
    cy.contains('Documents & Research').should('exist')
    cy.get('a[href*="/downloads/"]').should('exist')
  })

  it('should have valid external links', () => {
    cy.visit('/')
    cy.get('a[href^="http"]').each(($link) => {
      cy.wrap($link)
        .should('have.attr', 'href')
        .and('match', /^https?:\/\//)
    })
  })

  it('should have proper meta tags', () => {
    cy.visit('/')
    cy.get('meta[name="description"]').should('exist')
    cy.get('meta[name="viewport"]').should('exist')
  })
}) 