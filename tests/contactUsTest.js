var ContactUs_Page = require("../pageObjects/ContactUs_Page.js");

beforeEach(function(){
	browser.url('/Contact-Us/contactus.html');
})

describe('Test contact us from webdriveruni', function(){

	it('Should be able to submit a successful submission', function(){
		ContactUs_Page.submitAllInformationViaContactUsForm('Joe', 'Last', 'email@mail.com', 'message????');
	});

	it('Should not be able to submit a succesful submission missing comments', function(){
		ContactUs_Page.setFirstName('Jen');
		ContactUs_Page.setLastName('Noodle');
		ContactUs_Page.setEmailAddress('test@mail.com');
		ContactUs_Page.clickSubmitButton();
		ContactUs_Page.confirmUnsuccessfulSubmission();
	});	

	it('Should not be able to submit a succesful submission missing last name', function(){
		ContactUs_Page.setFirstName('My first name');
		ContactUs_Page.setComments('My comments');
		ContactUs_Page.setEmailAddress('test@mail.com');
		ContactUs_Page.clickSubmitButton();
		ContactUs_Page.confirmUnsuccessfulSubmission();
	});


	it('Should not be able to submit a succesful submission missing firstname, comments', function(){
		ContactUs_Page.setLastName('My last name');
		ContactUs_Page.setEmailAddress('test@mail.com');
		ContactUs_Page.clickSubmitButton();
		ContactUs_Page.confirmUnsuccessfulSubmission();
	});

});
