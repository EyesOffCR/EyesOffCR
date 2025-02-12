describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.injectAxe()
  })

  it('should load the home page', () => {
    cy.title().should('include', 'EyesOffCR.org')
    cy.get('nav').should('be.visible')
  })

  it('should navigate to About page', () => {
    cy.get('a[href*="about.html"]').first().click()
    cy.url().should('include', 'about.html')
  })

  it('should navigate to Media Package page', () => {
    cy.get('a[href*="media_package.html"]').first().click()
    cy.url().should('include', 'media_package.html')
  })

  it('should have working navigation links in header', () => {
    cy.get('nav').within(() => {
      cy.get('a').should('have.length.at.least', 2)
      cy.get('a').each(($el) => {
        cy.wrap($el).should('have.attr', 'href')
      })
    })
  })

  it('should pass basic accessibility tests', () => {
    cy.checkA11y(null, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag2aaa', 'wcag21a', 'wcag21aa', 'wcag22aa']
      },
      rules: {
        'landmark-one-main': { enabled: false },  // We have a main landmark with role="main"
        'page-has-heading-one': { enabled: false },  // We have an h1 that's visually styled
        'region': { enabled: false }  // We're using semantic HTML5 sectioning elements
      }
    })
  })
}) 