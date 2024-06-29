
class raffle {

    txtname = "input[name='name']";
    txtemail = "input[name='email']";
    txtage = "input[name='age']";
    txtreson = "input[name='reason']";
    submit = ".button-sc-1ta45yz-0.cljsFy";
   successfull='.snippet__Body-sc-12bo3rm-0'
    setname(username) {
        cy.get(this.txtname)
            .type(username)

    }

    setemail(email) {
        cy.get(this.txtemail)
            .type(email)

    }
    setage(age) {
        cy.get(this.txtage)
            .type(age)

    }
    setreson(reson) {
        cy.get(this.txtreson)
            .type(reson)

    }
    clicksubmit() {
        cy.get(this.submit)
            .click()
    }

    assertSuccessMessageVisible(){
        cy.get(this.successfull)
        .contains('div', 'Enter chance to win!').should('be.visible')
    }
    customername(){
        cy.get(this.successfull).eq(1).invoke('text')
    }

    checksubmitcount(){
      return cy.get('.snippet__Body-sc-12bo3rm-0').last().find('strong')
    }
}
export default raffle;