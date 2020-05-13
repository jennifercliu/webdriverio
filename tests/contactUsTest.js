var request = require('sync-request');
browser.addCommand("submitDataViaContactUsForm", function (firstName, lastName, emailAddress, comments){
	
	beforeEach(function(){
		browser.url('/Contact-Us/contactus.html');
	})

	describe('Test contact us from webdriveruni', function(){
		var res = request('GET', 'http://jsonplaceholder.typicode.com/posts/1/comments');
		var contactUsDetails = JSON.parse(res.getBody().toString('utf8'));

		var firstNameSelector = "[name='first_name']";
		var lastNameSelector = "[name='last_name']";
		var emailAddressSelector = "[name='email']";
		var commentsSelector = "[name='message']";
		var successfulSubmissionSelector = "h1";
		var unsuccessfulSubmissionSelector = "body";
		var submitButtonSelector = "[type='submit']"

		function setFirstName(firstName) {
			return browser.setValue(firstNameSelector, firstName);
		};

		function setLastName(lastName) {
			return browser.setValue(lastNameSelector, lastName);
		};

		function setEmailAddress(emailAddress) {
			return browser.setValue(emailAddressSelector, emailAddress);
		};

		function setComments(comments) {
			return browser.setValue(commentsSelector, comments);
		};

		function clickSubmitButton() {
			return browser.click(submitButtonSelector);
		};

		function confirmSuccessfulSubmission() {
			var validateSubmittionHeader = browser.waitUntil(function(){
				return browser.getText(successfulSubmissionSelector) == "Thank you for your Message!";
			}, 3000);

			expect(validateSubmittionHeader, 'Successful submittion message does not exist!').to.be.true;
		};



		contactUsDetails.forEach(function(contactDetails) {

			it.only('Should be able to submit a successful submission', function(){
				browser.submitDataViaContactUsForm('Joe', 'Test', contactDetails.email, contactDetails.body );

				var successfulContactConfirmation = browser.isExisting("h1");
				expect(successfulContactConfirmation, 'Successful submission message does not exist').to.be.true;

				var successfulSubmission = browser.getText("h1");
				expect(successfulSubmission).to.equal('Thank You for your Message!');
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