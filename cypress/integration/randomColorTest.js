describe('Random color palette', () => {

  context('Generate Random Colors', () => {
    beforeEach(function () {
      cy.visit('https://daprieto1.github.io/MISO-4208-randomColors/')
    })

    it('T1: Should generate random color from empty palette', () => {
      cy.contains('Paleta de colores')
      cy.contains(' Generar nueva paleta').click()
      cy.screenshot('T1-before')
      cy.contains(' Generar nueva paleta').click()
      cy.screenshot('T1-after')
    })

  })

})

