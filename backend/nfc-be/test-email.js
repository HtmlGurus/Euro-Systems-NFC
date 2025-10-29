import nodemailer from 'nodemailer';

async function testEmail() {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // TLS requires secure:false for port 587
      auth: {
        user: 'sapb1@eurosystems.com',
        pass: 'Caz99435%',
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });

    const info = await transporter.sendMail({
      from: '"Test Sender" <sapb1@eurosystems.com>',
      to: 'owais.shaikh@esparkconsultants.com', // replace with your email
      subject: 'SMTP Test',
      text: 'This is a test email from Office365 SMTP.',
    });

    console.log('✅ Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

testEmail();
