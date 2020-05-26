var ContactUs_Page = require("../pageObjects/ContactUs_Page.js");

beforeEach(async() => {
	await browser.url('/Contact-Us/contactus.html');
});

describe('Test contact us from webdriveruni', () => {
	it('Test 1: Should be able to submit a successful submission', () => {
		ContactUs_Page.submitAllInformationViaContactUsForm('Joe', 'Last', 'email@mail.com', 'message????');
		ContactUs_Page.successfulSubmissionHeader.waitForDisplayed(5000);
		try {
			expect(ContactUs_Page.successfulSubmissionHeaderText).to.equal('Thank You for your Message!');
		} catch(err) {
			console.log("Exception: " + err);
			assert.fail();
		}
	});

	it('Test 2: Should not be able to submit a succesful submission missing firstname, comments', () => {
		ContactUs_Page.setLastName('My last name');
		ContactUs_Page.setEmailAddress('test@mail.com');
		ContactUs_Page.clickSubmitButton();
		ContactUs_Page.unsuccessfulSubmissionHeader.waitForDisplayed(3000);
		try {
			expect(ContactUs_Page.unsuccessfulSubmissionHeaderText).to.have.string("Error: all fields are required");
		} catch(err) {
			console.log("Exception: " + err);
			assert.fail();
		}
		

	});

});
