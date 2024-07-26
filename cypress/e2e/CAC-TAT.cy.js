//describe: define uma suíte de testes
describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    //it: define um caso de teste
    it('verifica o titulo da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })


    it.only('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'Lorem ipsum dolor sit amet consectetur adipiscing elit gravida, eleifend lacinia rhoncus natoque eu litora molestie, fringilla etiam vel dictumst habitasse fermentum netus. Potenti imperdiet dignissim cras mi gravida sociosqu rutrum inceptos neque, proin pulvinar cum nascetur at felis natoque in est diam, laoreet blandit nisi consequat vestibulum sodales conubia auctor. Blandit parturient venenatis tempor sed feugiat ante donec accumsan ac vestibulum, augue inceptos magna eget felis tincidunt commodo luctus porta laoreet, class ornare senectus nam fermentum pellentesque torquent hendrerit aptent.'
        const THREE_HOURS_IN_MS = 3000;
        cy.clock()

        cy.get('#firstName').should('be.visible').type('Raquel')
        cy.get('#lastName').should('be.visible').type('Carneiro')
        cy.get('#email').should('be.visible').type('qualquer@email.com')
        cy.get('#open-text-area').should('be.visible').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').should('be.visible').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_HOURS_IN_MS)
        cy.contains('Mensagem enviada com sucesso.').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').should('be.visible').type('Raquel')
        cy.get('#lastName').should('be.visible').type('Carneiro')
        cy.get('#email').should('be.visible').type('qualqueremail.com')
        cy.get('#open-text-area').should('be.visible').type('Lorem ipsum', { delay: 0 })
        cy.contains('button', 'Enviar').should('be.visible').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não numérico', function () {
        cy.get('#phone').type('abcdefghij').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatorio mas não é preenchido antes do envio do formulario', function () {
        cy.get('#firstName').should('be.visible').type('Raquel')
        cy.get('#lastName').should('be.visible').type('Carneiro')
        cy.get('#email').should('be.visible').type('qualquer@email.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').should('be.visible').type("Texto", { delay: 0 })
        cy.contains('button', 'Enviar').should('be.visible').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').should('be.visible').type('Raquel')
            .should('have.value', 'Raquel')
            .clear().should('have.value', '')
        cy.get('#lastName').should('be.visible').type('Carneiro')
            .should('have.value', 'Carneiro')
            .clear().should('have.value', '')
        cy.get('#email').should('be.visible').type('qualquer@email.com')
            .should('have.value', 'qualquer@email.com')
            .clear().should('have.value', '')
        cy.get('#phone').should('be.visible').type('62988888888')
            .should('have.value', '62988888888')
            .clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulario sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').should('be.visible').click()
        // cy.get('button[type="submit"]')

        cy.get('.error').should('be.visible')
    })

    it('envia o formulario com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (Youtube) por seu texto', function () {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento (Feedback)', function () {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo com fixture', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/12.jpeg')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('12.jpeg')
            })
    })

    it('seleciona um arquivo simulando drag-and-drop', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/12.jpeg', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('12.jpeg')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e clicando no link', function () {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
    })


})