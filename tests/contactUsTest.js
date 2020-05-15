var contactUs_Page = require("./pageObjects/ContactUs_Page.js");

beforeEach(function(){
		browser.url('/Contact-Us/contactus.html');
	})

	describe('Test contact us from webdriveruni', function(){


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
			var validateSubmissionHeader = browser.waitUntil(function(){
				return browser.getText(successfulSubmissionSelector) == "Thank You for your Message!";
			}, 3000) 
			expect(validateSubmissionHeader, 'Successful submission message does not exist!').to.be.true;
		};

		function confirmUnsuccessfulSubmission() {
			var validateSubmissionHeader = browser.waitUntil(function(){
				return browser.getText(unsuccessfulSubmissionSelector) == "Error: all fields are required"
			}, 3000)
			expect(browser.getText(unsuccessfulSubmissionSelector)).to.include('Error: all fields are required');
		};


		contactUsDetails.forEach(function(contactDetail) {

			it('Should be able to submit a successful submission', function(){
				setFirstName('Joe');
				setLastName('Last');
				setEmailAddress(contactDetail.email);
				setComments(contactDetail.body);
				clickSubmitButton();
				confirmSuccessfulSubmission();
				});
			});

//				browser.submitDataViaContactUsForm('Joe', 'Test', contactDetails.email, contactDetails.body );

//	check if successful submission
//				var successfulContactConfirmation = browser.isExisting("h1");
//				expect(successfulContactConfirmation, 'Successful submission message does not exist').to.be.true;

// check for successful message
//				var successfulSubmission = browser.getText("h1");
//				expect(successfulSubmission).to.equal('Thank You for your Message!');


		it('Should not be able to submit a succesful submission missing comments', function(){
			setFirstName('Jen');
			setLastName('Noodle');
			setEmailAddress('test@mail.com');
			clickSubmitButton();
			confirmUnsuccessfulSubmission();
			});

//			var unsuccessfulContactConfirmation = browser.isExisting("body");
//			expect(unsuccessfulContactConfirmation, 'unsuccessful submission message does not exist').to.be.true;
		

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
	