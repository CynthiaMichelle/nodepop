const nodemailer = require('nodemailer');

module.exports = async function() {
  // entorno desarrollo

  const testAccount = await nodemailer.createTestAccount();

  const developmentConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  };

  const productionConfig = {
    service: process.env.EMAIL_SERVICE_NAME,
    auth: {
      user: process.env.EMAIL_SERVICE_USER,
      pass: process.env.EMAIL_SERVICE_PASS,
    }
  };

  console.log('process.env.NODE_ENV', process.env.NODE_ENV);
  // uso la configuración del entorno en el que me encuentro
  const activeConfig = process.env.NODE_ENV === 'development' ?
    developmentConfig :
    productionConfig;

  const transport = nodemailer.createTransport(activeConfig);

  return transport;

}