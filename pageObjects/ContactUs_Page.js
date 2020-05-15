class ContactUs_Page {
	get firstName() { return $("[name='first_name']"); }

	get lastName() { return $("[name='last_name']"); }

	get comments() { return $("[name='message']"); }

	get emailAddress() { return $("[name='email']"); }

	get submitButton() { return $("[type='submit']"); }

	get successfulSubmissionHeader() { return $("h1"); }

	get unsuccessfulSubmissionHeader() { return $("body"); }

};

module.exports = new ContactUs_Page();

