describe('Cadastro', () => {
    it('Usuário deve se tornar um entregador', ()=>{
      cy.viewport(1440,900)
  
      cy.visit('https://buger-eats.vercel.app/')
      cy.get('a[href="/deliver"]').click()
      cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
   
      var entregador= {
        nome: 'Vanessa Mass',
        cpf: '00000014141',
        email: 'vanemassoni@hotmail.com',
        whatsapp: '1199999999',
        endereco:{
            cep: '04534011',
            rua: 'Rua Joaquim Floriano',
            numero: '1000',
            complemento: 'Ap 142',
            bairro:'Itaim Bibi',
            cidade_uf: 'São Paulo/SP'
        },
        metodo_entrega: 'Moto',
        cnh: 'cnh-digital.jpg'

      }
      //nome
      cy.get('input[name="name"]').type(entregador.nome)
      cy.get('input[name="cpf"]').type(entregador.cpf)
      cy.get('input[name="email"]').type(entregador.email)
      cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

      cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
      //Clicar no botão
      cy.get('input[type=button][value="Buscar CEP"]').click()

      cy.get('input[name="address-number"]').type(entregador.endereco.numero)
      cy.get('input[name="address-details"]').type(entregador.endereco.complemento)
    
      //validar se está escrito corretamente
      //assert
      cy.get('input[name="address"]').should('have.value',entregador.endereco.rua)
      cy.get('input[name="district"]').should('have.value',entregador.endereco.bairro)
      cy.get('input[name="city-uf"]').should('have.value',entregador.endereco.cidade_uf)
     
      //aq tenho 3 .delivery-method li, Moto, Bicicleta, Van/Carro
      cy.contains('.delivery-method li', entregador.metodo_entrega).click()
    
      cy.get('input[accept^="image"]').attachFile(entregador.cnh)
    
      cy.get('form button[type="submit"]').click()

      const expectedMessage= 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

      cy.get('.swal2-container .swal2-html-container')
         .should('have.text', expectedMessage)
    })
  })

  describe('Cadastro', () => {
    it('CPF inválido', ()=>{
      cy.viewport(1440,900)
  
      cy.visit('https://buger-eats.vercel.app/')
      cy.get('a[href="/deliver"]').click()
      cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
   
      var entregador= {
        nome: 'Vanessa Mass',
        cpf: '000000141AA',
        email: 'vanemassoni@hotmail.com',
        whatsapp: '1199999999',
        endereco:{
            cep: '04534011',
            rua: 'Rua Joaquim Floriano',
            numero: '1000',
            complemento: 'Ap 142',
            bairro:'Itaim Bibi',
            cidade_uf: 'São Paulo/SP'
        },
        metodo_entrega: 'Moto',
        cnh: 'cnh-digital.jpg'

      }
      //nome
      cy.get('input[name="name"]').type(entregador.nome)
      cy.get('input[name="cpf"]').type(entregador.cpf)
      cy.get('input[name="email"]').type(entregador.email)
      cy.get('input[name="whatsapp"]').type(entregador.whatsapp)

      cy.get('input[name="postalcode"]').type(entregador.endereco.cep)
      //Clicar no botão
      cy.get('input[type=button][value="Buscar CEP"]').click()

      cy.get('input[name="address-number"]').type(entregador.endereco.numero)
      cy.get('input[name="address-details"]').type(entregador.endereco.complemento)
    
      //validar se está escrito corretamente
      //assert
      cy.get('input[name="address"]').should('have.value',entregador.endereco.rua)
      cy.get('input[name="district"]').should('have.value',entregador.endereco.bairro)
      cy.get('input[name="city-uf"]').should('have.value',entregador.endereco.cidade_uf)
     
      //aq tenho 3 .delivery-method li, Moto, Bicicleta, Van/Carro
      cy.contains('.delivery-method li', entregador.metodo_entrega).click()
    
      cy.get('input[accept^="image"]').attachFile(entregador.cnh)
    
      cy.get('form button[type="submit"]').click()

     
      cy.get('.alert-error')
         .should('have.text', 'Oops! CPF inválido')
    })
  })