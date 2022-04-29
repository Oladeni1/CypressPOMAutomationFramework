//used for suggesting function/methods in cypress:
///// <reference types="Cypress"/>     

import HomePage from '../../support/pageObjects/HomePage.js'
import ProductPage from '../../support/pageObjects/ProductPage.js'
import ConfirmPage from '../../support/pageObjects/ConfirmPage.js'
import PaymentPage from '../../support/pageObjects/PaymentPage.js'

describe('My Framework Suite', function() 
{
    before(function() {
        // runs once before all tests in the block:

     cy.fixture('testdata').then(function(data)  //data driven from fixture file
     {
        this.data=data   //this exposed data to the app page

     })

      })

    it('Do something nice!', function() {
    var homePage = new HomePage() 
    var productPage = new ProductPage()  
    var confirmPage = new ConfirmPage() 
    var paymentPage = new PaymentPage() 
        cy.visit(Cypress.env("url"))  //Pulling for global variable setting from cypress.json folder

        homePage.getName().type(this.data.name)
        homePage.getGender().select(this.data.gender)

    //assert that name is displayed in 2way data binding field:
    homePage.getTwoWayDataBinding().should('have.value', this.data.name)

    //assert that inputed data for name field is having min of 2 characters:
    homePage.getName().should('have.attr', 'minlength','2')

    //assert that Entrepreneur is in disable mode in the application:
    homePage.getEnterpreneur().should('be.disabled')

//cy.pause() //<= use pause to debugg

    //nav to Shop
    homePage.getShop().click()
    
    //add product: Parameterising data and driving them from support => commands.js
    //cy.selectProduct('Blackberry')  // function coming from support => commands.js
    //cy.selectProduct('Nokia Edge')
    //cy.selectProduct('iphone X')

//Alternativelly, extend the support => commands.js dataParam to fixture => testdata.json and call it as below:
    this.data.productName.forEach(function(element){
    cy.selectProduct(element)
    console.log(element)
    })

  //Click Checkout buttton for products in the confirm page:  
productPage.getCheckOut().click()
  
//Sum Prices of all products in the bag:
var sum = 0
confirmPage.getProductsPrices().each(($el, index, $list) =>{
 cy.log($el.text())
 const amount = $el.text()
 var result = amount.split(" ")
 result = result[1].trim()  //trim to remove currency sign
 cy.log(result)
 sum = Number(sum) + Number(result)
}).then(function()
{
    cy.log(sum)
})

//Grand Total of all products prices in the bag:
 confirmPage.getProductsGrandPrice().then(function(element)
 {
    const amount = element.text()
    var grandtotal = amount.split(" ")
    var grandtotal = grandtotal[1].trim()  //trim to remove currency sign
    cy.log(grandtotal)
//Assert that sum of the products prices is equalto grand total
    expect(sum).to.equal(Number(grandtotal))
 })

//Click Checkout buttton for products in the confirm page: 
confirmPage.getCheckOutConfirm().click()

//Enter country of dispatch in the payment confirm page: 
paymentPage.getDispatchCountryName().type(this.data.CountryOfDispatch)
cy.wait(5000)
//Click checkbox in the paymentconfirm page: 
paymentPage.getCheckBox().click()

//Click purchase buttton for products in the payment confirm page: 
paymentPage.getPurchase().click()

//Click purchase buttton for products in the payment confirm page:
paymentPage.getSuccessMsg().should('include.text', 'Success!')


        //fixture
    })
})