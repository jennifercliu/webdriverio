var ContactUs_Page = require("../pageObjects/ContactUs_Page.js");

beforeEach(function(){
	browser.url('/Contact-Us/contactus.html');
})

describe('Test contact us from webdriveruni', function(){

	it('Should be able to submit a successful submission', function(){
		setFirstName('Joe');
		setLastName('Last');
		setEmailAddress('email@email.com');
		setComments('message?????');
		clickSubmitButton();
		confirmSuccessfulSubmission();
	});

	it('Should not be able to submit a succesful submission missing comments', function(){
		setFirstName('Jen');
		setLastName('Noodle');
		setEmailAddress('test@mail.com');
		clickSubmitButton();
		confirmUnsuccessfulSubmission();
	});	

	it('Should not be able to submit a succesful submission missing last name', function(){
		setFirstName('My first name');
		setComments('My comments');
		setEmailAddress('test@mail.com');
		clickSubmitButton();
		confirmUnsuccessfulSubmission();
	});


	it('Should not be able to submit a succesful submission missing firstname, comments', function(){
		setLastName('My last name');
		setEmailAddress('test@mail.com');
		clickSubmitButton();
		confirmUnsuccessfulSubmission();
	});

});
