//Declearing class in Home page
class ConfirmPage{
    
    getProductsPrices()
    
    {
        return cy.get('tr td:nth-child(4) strong')
    }

    getProductsGrandPrice()
    {
        return cy.get('h3 strong')
    }

    getCheckOutConfirm()
    
    {
        return cy.get(':nth-child(6) > :nth-child(5) > .btn')
    }
   

}
export default ConfirmPage; 