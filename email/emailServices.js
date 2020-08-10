const config = require("config");
const emailS = require("@sendgrid/mail");

emailS.setApiKey(config.get("sendGridAPI"));

const sendConfirmationEmail = (userId, email, name) => {
	const confirmationUrl = `confirm/${userId}`;

	const baseUrl =
		process.env.NODE_ENV === "production"
			? process.env.CLIENT_ORIGIN
			: "http://localhost:3000";

	emailS.send({
	    to: email,
	    from: 'info@kaltechs.net',
	    subject: 'Kaltechs App - Confirm Your Email Address',
        text: `Hi ${name}. In order to use the application, please confirm your email address, by clicking the link: ${baseUrl}/${confirmationUrl}`,
	})
};

module.exports = {
	sendConfirmationEmail,
};
