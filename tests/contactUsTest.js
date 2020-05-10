var request = require('sync-request');

beforeEach(function(){
	browser.url('/Contact-Us/contactus.html');
})

describe('Test contact us from webdriveruni', function(){
	var res = request('GET', 'http://jsonplaceholder.typicode.com/posts/1/comments');

	var contactUsDetails = JSON.parse(res.getBody().toString('utf8'));

	beforeEach(function(){
	console.log('inside the describe block!');
})

contactUsDetails.forEach(function(contactDetails) {

	it('Should be able to submit a successful submission', function(){
		browser.setValue("[name='first_name']",'Jen');
		browser.setValue("[name='last_name']",'Noodle');
		browser.setValue("[name='email']", contactDetails.email);
		browser.setValue("[name='message']",contactDetails.body);
		browser.click("[type='submit']");
		
		var successfulContactConfirmation = browser.isExisting("h1");
		expect(successfulContactConfirmation, 'Successful submission message does not exist').to.be.true;

		var successfulSubmission = browser.getText("h1");
		expect(successfulSubmission).to.equal('Thank You for your Message!');
		console.log(successfulSubmission);
		});

});

	it('Should not be able to submit a succesful submission missing email', function(){
		browser.setValue("[name='first_name']",'Jen');
		browser.setValue("[name='last_name']",'Noodle');
		browser.setValue("[name='message']",'test');
		browser.click("[type='submit']");

		var unsuccessfulContactConfirmation = browser.isExisting("body");
		expect(unsuccessfulContactConfirmation, 'unsuccessful submission message does not exist').to.be.true;
	});

	it('Should not be able to submit a succesful submission missing last name', function(){
		browser.setValue("[name='first_name']",'Jen');
		browser.setValue("[name='email']",'test@mail.com');
		browser.setValue("[name='message']",'test');
		browser.click("[type='submit']");

		var successfulContactConfirmation = browser.isExisting("h1");
		expect(successfulContactConfirmation, 'Successful submission message does not exist').to.be.false;
	});

	it('Should not be able to submit a succesful submission missing message and email', function(){
		browser.setValue("[name='first_name']",'Jen');
		browser.setValue("[name='last_name']",'Noodle');
		browser.click("[type='submit']");

		var unsuccessfulContactConfirmation = browser.isExisting("body");
		expect(unsuccessfulContactConfirmation, 'Unsuccessful submission message does not exist').to.be.true;

		var errorText = browser.getText('body');
		expect(errorText).to.include('Error: all fields are required');
		console.log(errorText);

		var errorText = browser.isVisible('body');
		expect(errorText, 'Error message is not visible').to.be.true;

	});
})