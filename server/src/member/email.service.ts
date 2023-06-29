import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = createTransport({
      // Cấu hình transporter tại đây
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'wtfduy0908@gmail.com', // generated ethereal user
        pass: 'ebetrhoctygjpuib', // generated ethereal password
      },
    });
  }

  async sendEmail(sendEmailDetail) {
    const mailOptions = {
      from: 'ngoduy090801@gmail.com',
      to: sendEmailDetail.to,
      subject: sendEmailDetail.subject,
      html: sendEmailDetail.text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.log('Error:', error);
    }
  }
}
