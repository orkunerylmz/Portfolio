import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const { name, email, phone, subject, message } = await request.json();

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Lütfen tüm zorunlu alanları doldurun.' },
                { status: 400 }
            );
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `[Portfolio] ${subject}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8b5cf6;">Yeni İletişim Formu Mesajı</h2>
          <hr style="border: 1px solid #e5e7eb;" />
          
          <table style="width: 100%; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; width: 120px;"><strong>Ad Soyad:</strong></td>
              <td style="padding: 10px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280;"><strong>E-posta:</strong></td>
              <td style="padding: 10px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280;"><strong>Telefon:</strong></td>
              <td style="padding: 10px 0;">${phone || 'Belirtilmedi'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280;"><strong>Konu:</strong></td>
              <td style="padding: 10px 0;">${subject}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px;">
            <strong style="color: #6b7280;">Mesaj:</strong>
            <div style="margin-top: 10px; padding: 15px; background: #f9fafb; border-radius: 8px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <hr style="border: 1px solid #e5e7eb; margin-top: 30px;" />
          <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
            Bu mesaj orkun.dev portfolio sitesinden gönderilmiştir.
          </p>
        </div>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Mesajınız başarıyla gönderildi!' });
    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json(
            { error: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.' },
            { status: 500 }
        );
    }
}
