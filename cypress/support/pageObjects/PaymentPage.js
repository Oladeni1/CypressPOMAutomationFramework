//Declearing class in Home page
class PaymentPage{

    getDispatchCountryName() 
    
    {
        return cy.get('#country')
        
    }
    getCheckBox()
    
    {
        return cy.get('.checkbox')
    }
    getPurchase()
    
    {
        return cy.get('form.ng-untouched > .btn')
    }
    getSuccessMsg()
    {
        return cy.get('.alert')
    }

}
export default PaymentPage;

