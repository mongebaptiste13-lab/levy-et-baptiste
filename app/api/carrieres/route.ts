import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE_CONFIG } from "@/lib/config";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");
  try {
    const body = await req.json();
    const { name, email, linkedin, motivation, position } = body;

    if (!name || !email || !position) {
      return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
    }

    // Email reçu par DataForge IA
    await resend.emails.send({
      from: `Carrières DataForge IA <onboarding@resend.dev>`,
      to: [SITE_CONFIG.email],
      replyTo: email,
      subject: `Candidature — ${position} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 580px; margin: 0 auto; padding: 32px; background: #f5f2eb; border-radius: 12px;">
          <h2 style="margin: 0 0 8px; font-size: 20px; color: #1a2e1a;">Nouvelle candidature</h2>
          <p style="margin: 0 0 24px; font-size: 13px; color: #7ab87a; font-weight: 600;">${position}</p>

          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; font-size: 13px; width: 120px;">Nom</td><td style="padding: 8px 0; font-size: 13px; color: #1a2e1a; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Email</td><td style="padding: 8px 0; font-size: 13px;"><a href="mailto:${email}" style="color: #7ab87a;">${email}</a></td></tr>
            ${linkedin ? `<tr><td style="padding: 8px 0; color: #666; font-size: 13px;">LinkedIn</td><td style="padding: 8px 0; font-size: 13px;"><a href="${linkedin}" style="color: #7ab87a;">${linkedin}</a></td></tr>` : ""}
          </table>

          ${motivation ? `
          <div style="margin-top: 24px; padding: 20px; background: #fff; border-radius: 8px; border-left: 3px solid #7ab87a;">
            <p style="margin: 0 0 8px; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Lettre de motivation</p>
            <p style="margin: 0; font-size: 13px; color: #1a2e1a; line-height: 1.7; white-space: pre-line;">${motivation}</p>
          </div>
          ` : ""}

          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Reçu via le portail carrières — <a href="${SITE_CONFIG.siteUrl}/carrieres" style="color: #7ab87a;">${SITE_CONFIG.siteUrl}/carrieres</a>
          </p>
        </div>
      `,
    });

    // Email de confirmation envoyé au candidat
    await resend.emails.send({
      from: `${SITE_CONFIG.agencyName} <onboarding@resend.dev>`,
      to: [email],
      subject: `Candidature reçue — ${position}`,
      html: `
        <div style="font-family: sans-serif; max-width: 580px; margin: 0 auto; padding: 32px; background: #f5f2eb; border-radius: 12px;">
          <h2 style="margin: 0 0 16px; font-size: 20px; color: #1a2e1a;">Candidature bien reçue ✓</h2>
          <p style="font-size: 14px; color: #555; line-height: 1.7; margin: 0 0 24px;">
            Merci <strong>${name.split(" ")[0]}</strong>, on a bien reçu ta candidature pour le poste <strong>${position}</strong>.<br/>
            On étudie chaque profil avec attention et on revient vers toi dans les meilleurs délais.
          </p>
          <p style="margin-top: 32px; font-size: 12px; color: #999;">— L'équipe ${SITE_CONFIG.agencyName}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[API/carrieres]", err);
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
  }
}
