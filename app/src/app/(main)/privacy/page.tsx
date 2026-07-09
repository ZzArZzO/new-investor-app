import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy · New Investor",
  description: "What personal data New Investor collects, why, and how to control it.",
};

// Interim draft — bracketed placeholders MUST be filled before this app is made public
// (see compliance-one-pager.md, "Regime 3 — GDPR"). Not legal advice; pending lawyer review.
const CONTROLLER = "[FULL LEGAL NAME]";
const CONTACT_EMAIL = "privacy@newinvestor.app";
const LAST_UPDATED = "9 July 2026";

export default function PrivacyPage() {
  return (
    <article className="pt-1 pb-4">
      <h1 className="font-heading text-2xl font-medium">Privacy policy</h1>
      <p className="mt-1.5 text-[13px] text-muted-foreground">Last updated: {LAST_UPDATED}</p>

      <p className="mt-4 text-[15px] leading-relaxed">
        New Investor is an educational app about investing and crypto. This policy explains what personal data we
        collect, why, who we share it with, and the rights you have over it under the EU General Data Protection
        Regulation (GDPR). We collect as little as the app needs to work.
      </p>

      <Section title="Who is responsible">
        The data controller is {CONTROLLER}. For any privacy question or request, contact{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-accent-foreground underline">
          {CONTACT_EMAIL}
        </a>
        .
      </Section>

      <Section title="What we collect">
        <ul className="mt-1 flex list-disc flex-col gap-1.5 pl-5">
          <li>
            <strong>If you join the waitlist:</strong> your email address.
          </li>
          <li>
            <strong>If you create an account:</strong> your email address and a securely hashed password (we never
            store your password in readable form). If you sign in with Google instead, we receive your basic Google
            profile (name, email, avatar) for identity only.
          </li>
          <li>
            <strong>Your app progress:</strong> lessons completed, streaks, quiz result, and any holdings you choose to
            track. Holdings are figures <em>you type in</em> — the app fetches no prices and connects to no bank or
            broker.
          </li>
          <li>
            <strong>Anonymous usage analytics:</strong> aggregate, cookieless page and event counts. These do not
            identify you.
          </li>
        </ul>
      </Section>

      <Section title="Why we use it (lawful basis)">
        <ul className="mt-1 flex list-disc flex-col gap-1.5 pl-5">
          <li>
            <strong>To run your account and sync your progress</strong> across devices — because you asked us to
            (performance of a contract).
          </li>
          <li>
            <strong>To send you a streak reminder or a weekly summary</strong> — only if you have an account, and you
            can turn these off at any time (an unsubscribe link is in every email).
          </li>
          <li>
            <strong>To keep the waitlist and tell you when we launch</strong> — based on your request to be notified.
          </li>
          <li>
            <strong>To understand aggregate usage</strong> and improve the app — our legitimate interest, using data
            that does not identify you.
          </li>
        </ul>
      </Section>

      <Section title="Who we share it with">
        We do not sell your data. We use a small number of processors to run the service, each under a data-processing
        agreement:
        <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5">
          <li>
            <strong>Neon</strong> — hosts the database where accounts and progress are stored.
          </li>
          <li>
            <strong>Resend</strong> — sends account emails (reminders, weekly summary).
          </li>
          <li>
            <strong>Google</strong> — only if you choose &ldquo;Continue with Google&rdquo; to sign in.
          </li>
          <li>
            <strong>Vercel</strong> — hosts the app and provides the cookieless analytics.
          </li>
          <li>
            <strong>Formspree</strong> — receives waitlist sign-ups (separate from accounts).
          </li>
        </ul>
      </Section>

      <Section title="How long we keep it">
        We keep account data for as long as your account exists. When you delete your account (Settings &rarr; Delete my
        account), your email, password, and all synced progress are erased from our database immediately, along with any
        linked sign-in records. Waitlist emails are kept until you ask us to remove them or we launch and no longer need
        the list.
      </Section>

      <Section title="Your rights">
        Under GDPR you can ask us to: access the data we hold about you, correct it, delete it, export it, or object to
        a particular use. Account deletion is built into the app; for anything else, email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-accent-foreground underline">
          {CONTACT_EMAIL}
        </a>
        . You also have the right to complain to your national data-protection authority (for example, the Autoriteit
        Persoonsgegevens in the Netherlands or the CNPD in Portugal).
      </Section>

      <Section title="Changes to this policy">
        If we change what we collect or how we use it, we will update this page and the &ldquo;last updated&rdquo; date
        above.
      </Section>

      <p className="mt-8 px-1 text-center text-[11.5px] leading-relaxed text-muted-foreground">
        Educational information, not personal financial advice. Investing involves risk, including loss of the money you
        invest.
      </p>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="font-heading text-lg font-medium">{title}</h2>
      <div className="mt-1.5 text-[15px] leading-relaxed text-foreground">{children}</div>
    </section>
  );
}
