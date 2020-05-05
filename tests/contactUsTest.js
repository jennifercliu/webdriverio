beforeEach(function(){
	browser.url('/Contact-Us/contactus.html');
})
describe('Test contact us from webdriveruni', function(){

	beforeEach(function(){
	console.log('inside the describe block!');
})

	it('Should be able to submit a successful submission', function(){
		browser.setValue("[name='first_name']",'Jen');
		browser.setValue("[name='last_name']",'Noodle');
		browser.setValue("[name='email']",'test@mail.com');
		browser.setValue("[name='message']",'test');
		browser.click("[type='submit']");
	});

	it('Should not be able to submit a succesful submission missing email', function(){
		browser.setValue("[name='first_name']",'Jen');
		browser.setValue("[name='last_name']",'Noodle');
		browser.setValue("[name='message']",'test');
		browser.click("[type='submit']");
	});

	it('Should not be able to submit a succesful submission missing last name', function(){
		browser.setValue("[name='first_name']",'Jen');
		browser.setValue("[name='email']",'test@mail.com');
		browser.setValue("[name='message']",'test');
		browser.click("[type='submit']");
	});

	it('Should not be able to submit a succesful submission missing message and email', function(){
		browser.setValue("[name='first_name']",'Jen');
		browser.setValue("[name='last_name']",'Noodle');
		browser.click("[type='submit']");
	});
})