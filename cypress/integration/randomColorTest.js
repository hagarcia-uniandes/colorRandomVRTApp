describe('Random color palette', () => {

  context('Generate Random Colors', () => {
    beforeEach(function () {
      cy.visit('https://hagarcia-uniandes.github.io/VRT_colorPallete/')
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

