//Declearing class in Home page
class HomePage{

    getName()
    
    {
        return cy.get(':nth-child(1) > .form-control')
    }
    getGender()
    {
        return cy.get('select')
    }
    getTwoWayDataBinding()
    {
        return cy.get(':nth-child(4) > .ng-untouched')
    }
    getEnterpreneur()
    {
        return cy.get('#inlineRadio3')
    }
    getShop()
    {
        return cy.get(':nth-child(2) > .nav-link')
    }


}
export default HomePage;