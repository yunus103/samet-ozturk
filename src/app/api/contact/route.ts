import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ad, email, etkinlikTuru, etkinlikTarihi, mesaj } = body;

    if (!ad || !email || !mesaj) {
      return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Samet Öztürk Web" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_FORM_TO,
      replyTo: email,
      subject: `Yeni İletişim Formu — ${etkinlikTuru || "Genel"} · ${ad}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="border-bottom: 2px solid #D4A843; padding-bottom: 0.5rem; color: #111;">
            Yeni Booking Talebi
          </h2>
          <table style="width:100%; border-collapse:collapse;">
            <tr><td style="padding:8px 0; font-weight:bold; color:#555;">Ad Soyad</td><td style="padding:8px 0;">${ad}</td></tr>
            <tr><td style="padding:8px 0; font-weight:bold; color:#555;">E-posta</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            ${etkinlikTuru ? `<tr><td style="padding:8px 0; font-weight:bold; color:#555;">Etkinlik Türü</td><td style="padding:8px 0;">${etkinlikTuru}</td></tr>` : ""}
            ${etkinlikTarihi ? `<tr><td style="padding:8px 0; font-weight:bold; color:#555;">Etkinlik Tarihi</td><td style="padding:8px 0;">${etkinlikTarihi}</td></tr>` : ""}
          </table>
          <div style="margin-top:1.5rem; padding:1rem; background:#f9f9f9; border-left:3px solid #D4A843;">
            <strong>Mesaj:</strong><br/>
            <p style="margin:0.5rem 0 0;">${mesaj.replace(/\n/g, "<br/>")}</p>
          </div>
          <p style="margin-top:2rem; font-size:12px; color:#999;">— sametozturk.com</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Mail gönderilemedi." }, { status: 500 });
  }
}
