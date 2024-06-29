///<reference types='cypress'/>

import raffle from "../pageObject/pageobject.js";



let username, email, age, reson;
describe("Raffle Form", () => {
    const raffleform = new raffle();

    //random value generator
    const randomUsername = `BluebiteTest${Math.floor(Math.random() * 10000)}`;
    const randomEmail = `${randomUsername}${Math.floor(Math.random() * 10000)}@gmail.com`;
    const randomAge = Math.floor(Math.random() * (80 - 18 + 1)) + 18;
    const randomAgebelow = Math.floor(Math.random() * 17) + 1;



    before('Get Customer details form fixture file', () => {
        cy.clearAllSessionStorage();

        //data Read from fixture folder
        cy.fixture('customerdata.json').then((customerdata) => {
            username = customerdata.username;
            email = customerdata.email;
            age = customerdata.age;
            reson = customerdata.reson;
        })

    })
    beforeEach(() => {
        cy.visit('/');
    })

    it("should require name, age, and valid email address", () => {

        raffleform.setname(randomUsername);
        raffleform.setemail(randomEmail);
        raffleform.setage(randomAge);
        raffleform.setreson(reson);
        raffleform.clicksubmit();
        raffleform.assertSuccessMessageVisible();
    })

    it('should allow multiple entries and display submission count', () => {


        // Function to submit the form and check submission message
        const submitForm = () => {
            raffleform.setname(username);
            raffleform.setemail(email);
            raffleform.setage(age);
            raffleform.setreson(reson);
            raffleform.clicksubmit();
            // Wait for success message and count of entries
            raffleform.assertSuccessMessageVisible()

            cy.get('.snippet__Body-sc-12bo3rm-0').last().find('strong').then(($count) => {
                const trimmedCount = $count.text().trim();
                cy.log(`This ${username} has submitted: ${trimmedCount} times`);
            });

            // Reload the page for subsequent submissions
            cy.reload();
        };
        // Submit the form multiple times
        for (let i = 1; i <= 3; i++) {
            submitForm();
        }
    });

    //let username, email, age, reson;

    it('should allow the customer to submit the form with a reason', () => {

        // Fill out and submit the form with a reason
        raffleform.setname(randomUsername);
        raffleform.setemail(randomEmail);
        raffleform.setage(randomAge);
        raffleform.setreson(reson);
        raffleform.clicksubmit();
        raffleform.assertSuccessMessageVisible();

        // Verify that the form was submitted successfully
    });
    it('should allow the customer to submit the form without a reason', () => {

        // Fill out and submit the form without a reason
        raffleform.setname(randomUsername);
        raffleform.setemail(randomEmail);
        raffleform.setage(randomAge);
        //submit the form without a reason
        raffleform.clicksubmit();
        raffleform.assertSuccessMessageVisible();
    });


    it('should not allow a customer under 18 to submit the form', () => {

        // Fill out the form with age less than 18
        raffleform.setname(randomUsername);
        raffleform.setemail(randomEmail);
        raffleform.setage(randomAgebelow);
        raffleform.setreson(reson);
        raffleform.clicksubmit();
        cy.get('.snippet__Body-sc-12bo3rm-0.cmpVnN').eq(1).should('be.visible').then((message) => {
            const belowagemessage = message.text();
            console.log(belowagemessage)
            cy.log(belowagemessage)

        })


    });

    it('should turn the input field blue when focused', () => {
        const inputs = [raffleform.txtname, raffleform.txtemail, raffleform.txtage, raffleform.txtreson];

        inputs.forEach(selector => {
            cy.get(selector).should('exist').focus().then($el => {
                const borderColor = $el.css('border-color');
                cy.log(`${selector} border color is ${borderColor} when focused.`);
                if (borderColor === 'rgb(0, 0, 255)') {
                    cy.log(`${selector} border color is blue when focused.`);
                } else if (borderColor === 'rgb(221, 221, 221)') {
                    cy.log(`${selector} border color is light gray when focused.`);
                } else {
                    cy.log(`${selector} border color is ${borderColor} when focused.`);
                }
                try {
                    expect('rgb(0, 0, 255)').to.equal(borderColor, `${selector} should have blue border when focused.`);
                } catch (error) {
                    cy.log(`Error: ${selector} did not have the expected blue border color when focused. Found: ${borderColor}`);
                    throw error;
                }
            })
        });
    });

    it('should turn required fields red if form submission fails', () => {
        const requiredFields = //[raffleform.txtname, raffleform.txtemail, raffleform.txtage, raffleform.txtreson];
            [{ selector: raffleform.txtname, errorMessage: 'Name is required' },
            { selector: raffleform.txtemail, errorMessage: 'Email is required' },
            { selector: raffleform.txtage, errorMessage: 'Age is required' }
            ]
        raffleform.clicksubmit();// Attempt to submit the form without filling in required fields

        requiredFields.forEach(field => {
            cy.get(field.selector)
                .then($el => {
                    const borderColor = $el.css('border-color');
                    cy.log(`${field.selector} border color is ${borderColor} after failed submission.`);
                    expect(borderColor).to.equal('rgb(255, 0, 0)', `${field.selector} should have red border after failed submission.`);
                });

            // Check if the error message is displayed
            cy.contains(field.errorMessage)
                .should('be.visible')
                .then($el => {
                    cy.log(`Error message for ${field.selector}: ${$el.text()}`);
                });
        });
    })



});


