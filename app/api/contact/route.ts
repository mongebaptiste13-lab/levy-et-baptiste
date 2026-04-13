import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE_CONFIG } from "@/lib/config";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");
  try {
    const body = await req.json();
    const { name, company, email, description, projectType } = body;

    if (!name || !email || !description) {
      return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
    }

    // Email reçu par DataForge IA
    await resend.emails.send({
      from: `Site DataForge IA <onboarding@resend.dev>`,
      to: [SITE_CONFIG.email],
      replyTo: email,
      subject: `Nouveau contact — ${projectType || "Projet"} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 580px; margin: 0 auto; padding: 32px; background: #f5f2eb; border-radius: 12px;">
          <h2 style="margin: 0 0 24px; font-size: 20px; color: #1a2e1a;">Nouvelle demande de contact</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; font-size: 13px; width: 120px;">Nom</td><td style="padding: 8px 0; font-size: 13px; color: #1a2e1a; font-weight: 600;">${name}</td></tr>
            ${company ? `<tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Entreprise</td><td style="padding: 8px 0; font-size: 13px; color: #1a2e1a;">${company}</td></tr>` : ""}
            <tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Email</td><td style="padding: 8px 0; font-size: 13px;"><a href="mailto:${email}" style="color: #7ab87a;">${email}</a></td></tr>
            ${projectType ? `<tr><td style="padding: 8px 0; color: #666; font-size: 13px;">Besoin</td><td style="padding: 8px 0; font-size: 13px; color: #1a2e1a;">${projectType}</td></tr>` : ""}
          </table>

          <div style="margin-top: 24px; padding: 20px; background: #fff; border-radius: 8px; border-left: 3px solid #7ab87a;">
            <p style="margin: 0; font-size: 13px; color: #1a2e1a; line-height: 1.7; white-space: pre-line;">${description}</p>
          </div>

          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Reçu via le formulaire de contact — <a href="${SITE_CONFIG.siteUrl}" style="color: #7ab87a;">${SITE_CONFIG.siteUrl}</a>
          </p>
        </div>
      `,
    });

    // Email de confirmation envoyé au client
    await resend.emails.send({
      from: `${SITE_CONFIG.agencyName} <onboarding@resend.dev>`,
      to: [email],
      subject: `On a bien reçu votre message, ${name.split(" ")[0]} 👋`,
      html: `
        <div style="font-family: sans-serif; max-width: 580px; margin: 0 auto; padding: 32px; background: #f5f2eb; border-radius: 12px;">
          <h2 style="margin: 0 0 16px; font-size: 20px; color: #1a2e1a;">Votre message est bien arrivé.</h2>
          <p style="font-size: 14px; color: #555; line-height: 1.7; margin: 0 0 24px;">
            Merci <strong>${name.split(" ")[0]}</strong>, on a bien reçu votre demande.<br/>
            Un membre de l'équipe vous répondra personnellement sous <strong>24h ouvrées</strong>.
          </p>
          <div style="padding: 16px 20px; background: #fff; border-radius: 8px; border-left: 3px solid #7ab87a;">
            <p style="margin: 0; font-size: 12px; color: #999; line-height: 1.6;">Votre message :<br/><span style="color: #333;">${description}</span></p>
          </div>
          <p style="margin-top: 24px; font-size: 13px; color: #555;">
            En attendant, vous pouvez consulter <a href="${SITE_CONFIG.siteUrl}/#pricing" style="color: #7ab87a;">nos offres</a> ou
            <a href="${SITE_CONFIG.calendlyUrl}" style="color: #7ab87a;">réserver un créneau directement</a>.
          </p>
          <p style="margin-top: 32px; font-size: 12px; color: #999;">— L'équipe ${SITE_CONFIG.agencyName}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[API/contact]", err);
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
  }
}
