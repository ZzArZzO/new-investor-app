// i18n scaffolding for the landing page. Client-side, runtime toggle only —
// this does NOT localize <title>/<meta> tags (crawlers and social-preview
// bots don't run JS), so search/share previews stay English regardless of
// the toggle. A proper multi-language SEO setup would need separate URLs
// (e.g. /nl/) — out of scope for this pass; this covers the on-page
// reading experience and demonstrates the pattern to extend to /lessons/.
window.NI_I18N = {
  en: {
    'hero.eyebrow': 'Investing · Crypto · Blockchain — for first-timers in Europe',
    'hero.title': 'Understand investing and crypto before you risk a single euro.',
    'hero.sub': 'A calm course that takes you from <em>“I don’t get any of this”</em> to confidently making your first move — in stocks <em>or</em> crypto. About 5 minutes a day. No hype, no hot tips, no jargon.',

    'form.emailPlaceholder': 'you@email.com',
    'form.submit': 'Join the waitlist',
    'form.submitPending': 'Joining…',
    'form.payLabel': 'Would you pay a few euros a month for this once it’s live? <span>(optional, helps us a lot)</span>',
    'form.payYes': 'Yes',
    'form.payMaybe': 'Maybe',
    'form.payNoFree': 'No, free only',
    'form.microcopy': 'Be first to get access. No spam — one email when we launch.',
    'form.success': 'You’re on the list. 🎉 We’ll email you when the first lessons are ready.',

    'learn.kicker': 'What you’ll learn',
    'learn.title': 'Two worlds, one calm course.',
    'learn.lead': 'Short lessons — one idea, a real example, a quick check, done in 5–8 minutes. Start with the shared foundations, then go as deep as you want into investing, crypto, or both.',
    'learn.previewLink': '👀 Preview the first lessons, free →',
    'learn.pillarFoundations': '🌱 Foundations <span>— the ideas that apply to everything</span>',
    'learn.pillarInvesting': '📈 Investing <span>— stocks, funds &amp; the traditional markets</span>',
    'learn.pillarCrypto': '₿ Crypto &amp; blockchain <span>— honestly, including the risks</span>',
    'learn.m1Title': 'Why put your money to work',
    'learn.m1Desc': 'Why cash quietly loses value, and what compound growth really does over time.',
    'learn.m2Title': 'Risk & time',
    'learn.m2Desc': 'What “risk” actually means, and why your time horizon changes everything.',
    'learn.m3Title': 'The building blocks',
    'learn.m3Desc': 'Stocks, bonds, ETFs, index funds — in plain language, no jargon.',
    'learn.m4Title': 'Diversification, fees & mistakes',
    'learn.m4Desc': 'Why fees matter more than you think, and the beginner traps to avoid.',
    'learn.m5Title': 'Your first investment',
    'learn.m5Desc': 'Choosing a broker, your first deposit, placing your first order — step by step.',
    'learn.m6Title': 'What blockchain & crypto actually are',
    'learn.m6Desc': 'The real idea behind it — and what crypto is, and isn’t — without the hype.',
    'learn.m7Title': 'Wallets, exchanges & staying safe',
    'learn.m7Desc': 'Custody, self-custody, and how to spot the scams that target beginners.',
    'learn.m8Title': 'Risk, reward & a sensible slice',
    'learn.m8Desc': 'Why it’s high-risk, and how people keep it to a bounded “could-go-to-zero” slice.',

    'archetype.kicker': 'Find your type',
    'archetype.title': 'What kind of investor are you?',
    'archetype.lead': 'A short quiz (no income or savings questions — ever) sorts you into one of four types, so the course speaks to how <em>you</em> actually think about money.',
    'archetype.cautiousTitle': 'The Cautious Starter',
    'archetype.cautiousDesc': 'Wants safety and simplicity above all. Build the habit first, add risk later.',
    'archetype.steadyTitle': 'The Steady Builder',
    'archetype.steadyDesc': 'Wants to grow wealth long-term without obsessing over it day to day.',
    'archetype.handsonTitle': 'The Hands-On Explorer',
    'archetype.handsonDesc': 'Enjoys research and wants some control over where the money goes.',
    'archetype.curiousTitle': 'The Curious Diversifier',
    'archetype.curiousDesc': 'Interested in a bit of everything, including newer, higher-risk assets.',

    'quiz.startBtn': 'Take the 30-second quiz →',
    'quiz.questionOf': 'Question {n} of {total}',
    'quiz.resultEyebrow': 'Your investor type',
    'quiz.shareX': 'Share on X',
    'quiz.shareLinkedin': 'Share on LinkedIn',
    'quiz.copyLink': 'Copy link',
    'quiz.downloadImage': 'Download image',
    'quiz.toolExploreLead': 'Curious what’s actually out there?',
    'quiz.toolExploreSub': 'We’re compiling a plain-facts comparison of brokers and MiCA-licensed exchanges — the same list for everyone, no personalized picks based on your result.',
    'quiz.toolExploreLink': 'Preview the draft comparison table →',
    'quiz.retake': 'Retake quiz',
    'quiz.toastCopied': 'Link copied!',
    'quiz.shareText': 'I’m {title} {emoji} — find your investor type with this 30-second quiz:',

    'why.kicker': 'Why this exists',
    'why.title': 'Investing feels intimidating. Crypto feels like a minefield.',
    'why.p1': 'Every app wants you to <strong>deposit money now</strong>. The stocks apps ignore crypto; the crypto apps are full of hype and people trying to sell you something. Almost none of them slow down to honestly teach you what you’re actually doing.',
    'why.p2': 'This is the opposite: <strong>learn first, invest second</strong> — across <strong>both</strong> worlds. Understand the handful of ideas that matter, get a straight, no-hype take on crypto <em>including</em> the risks, decide what fits you, and take the first step feeling calm instead of anxious.',
    'why.p3': 'It’s built around how this works in <strong>Europe</strong> specifically — the real tools, the protections, the fees, and only regulated, licensed platforms — not a US app with the wrong currency.',

    'final.title': 'Be one of the first.',
    'final.sub': 'We’re building this now. Join the waitlist and you’ll get early access — and a say in what gets built.',

    'footer.disc': 'This is an educational project. It provides general information about investing, not personal financial advice. Investing involves risk, including the possible loss of the money you invest.',
    'footer.madeIn': 'Made in Europe',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',

    quizTypes: [
      { key: 'cautious', emoji: '🟢', title: 'The Cautious Starter', tagline: 'You want safety and simplicity above all — build the habit first, add risk later.', accent: '#1f9d63' },
      { key: 'steady',   emoji: '🔵', title: 'The Steady Builder',   tagline: 'You want to grow wealth long-term without obsessing over it day to day.', accent: '#2f7bd1' },
      { key: 'handson',  emoji: '🟠', title: 'The Hands-On Explorer', tagline: 'You enjoy research and want some control over where the money goes.', accent: '#d8822f' },
      { key: 'curious',  emoji: '🟣', title: 'The Curious Diversifier', tagline: 'You’re interested in a bit of everything, including newer, higher-risk assets.', accent: '#8b5fd1' }
    ],
    quizQuestions: [
      {
        q: 'When you imagine your money invested, what matters most?',
        options: ['Knowing I won’t lose sleep over it', 'Watching it quietly grow over years', 'Understanding exactly where it’s going', 'Having a mix, including some new stuff']
      },
      {
        q: 'How do you feel about crypto?',
        options: ['Too risky for me, not right now', 'Maybe a tiny slice, way later', 'I want to really understand it before touching it', 'Curious — I want some exposure now']
      },
      {
        q: 'How often do you want to check on your investments?',
        options: ['As rarely as possible', 'Occasionally, a quick look', 'Regularly — I like to stay on top of it', 'Whenever something new catches my eye']
      },
      {
        q: 'Pick a starting move that sounds like you:',
        options: ['Open a savings-like account, ease in slowly', 'Set up an automatic monthly investment and forget it', 'Research a few individual stocks or funds myself', 'Split it — some safe, some experimental']
      }
    ]
  },

  nl: {
    'hero.eyebrow': 'Beleggen · Crypto · Blockchain — voor beginners in Europa',
    'hero.title': 'Snap beleggen en crypto voordat je één euro riskeert.',
    'hero.sub': 'Een rustige cursus die je van <em>“ik snap er niks van”</em> naar zelfverzekerd je eerste stap brengt — in aandelen <em>of</em> crypto. Zo’n 5 minuten per dag. Geen hype, geen hot tips, geen jargon.',

    'form.emailPlaceholder': 'jij@email.com',
    'form.submit': 'Meld je aan voor de wachtlijst',
    'form.submitPending': 'Bezig…',
    'form.payLabel': 'Zou je een paar euro per maand betalen zodra dit live is? <span>(optioneel, helpt ons enorm)</span>',
    'form.payYes': 'Ja',
    'form.payMaybe': 'Misschien',
    'form.payNoFree': 'Nee, alleen gratis',
    'form.microcopy': 'Wees als eerste erbij. Geen spam — één e-mail zodra we live gaan.',
    'form.success': 'Je staat op de lijst. 🎉 We mailen je zodra de eerste lessen klaar zijn.',

    'learn.kicker': 'Wat je leert',
    'learn.title': 'Twee werelden, één rustige cursus.',
    'learn.lead': 'Korte lessen — één idee, een echt voorbeeld, een korte check, klaar in 5–8 minuten. Begin met de gedeelde basis, en ga daarna zo diep als je wilt in beleggen, crypto, of allebei.',
    'learn.previewLink': '👀 Bekijk de eerste lessen, gratis →',
    'learn.pillarFoundations': '🌱 Basis <span>— de ideeën die overal voor gelden</span>',
    'learn.pillarInvesting': '📈 Beleggen <span>— aandelen, fondsen &amp; de traditionele markten</span>',
    'learn.pillarCrypto': '₿ Crypto &amp; blockchain <span>— eerlijk, inclusief de risico’s</span>',
    'learn.m1Title': 'Waarom je je geld laat werken',
    'learn.m1Desc': 'Waarom contant geld stilletjes waarde verliest, en wat samengestelde groei écht doet over tijd.',
    'learn.m2Title': 'Risico & tijd',
    'learn.m2Desc': 'Wat "risico" eigenlijk betekent, en waarom je tijdshorizon alles verandert.',
    'learn.m3Title': 'De bouwstenen',
    'learn.m3Desc': 'Aandelen, obligaties, ETF’s, indexfondsen — in gewone taal, zonder jargon.',
    'learn.m4Title': 'Spreiding, kosten & fouten',
    'learn.m4Desc': 'Waarom kosten belangrijker zijn dan je denkt, en de beginnersvalkuilen om te vermijden.',
    'learn.m5Title': 'Je eerste belegging',
    'learn.m5Desc': 'Een broker kiezen, je eerste storting, je eerste order plaatsen — stap voor stap.',
    'learn.m6Title': 'Wat blockchain & crypto écht zijn',
    'learn.m6Desc': 'Het echte idee erachter — en wat crypto wel en niet is — zonder de hype.',
    'learn.m7Title': 'Wallets, exchanges & veilig blijven',
    'learn.m7Desc': 'Bewaring, self-custody, en hoe je de scams herkent die zich op beginners richten.',
    'learn.m8Title': 'Risico, rendement & een verstandig deel',
    'learn.m8Desc': 'Waarom het hoog risico is, en hoe mensen het beperken tot een afgebakend "kan-naar-nul"-deel.',

    'archetype.kicker': 'Ontdek je type',
    'archetype.title': 'Wat voor belegger ben jij?',
    'archetype.lead': 'Een korte quiz (nooit vragen over inkomen of spaargeld) deelt je in bij één van vier types, zodat de cursus aansluit op hoe <em>jij</em> eigenlijk over geld denkt.',
    'archetype.cautiousTitle': 'De Voorzichtige Starter',
    'archetype.cautiousDesc': 'Wil vooral veiligheid en eenvoud. Eerst de gewoonte opbouwen, later meer risico toevoegen.',
    'archetype.steadyTitle': 'De Stabiele Bouwer',
    'archetype.steadyDesc': 'Wil op de lange termijn vermogen opbouwen zonder er dagelijks mee bezig te zijn.',
    'archetype.handsonTitle': 'De Actieve Onderzoeker',
    'archetype.handsonDesc': 'Houdt van uitzoekwerk en wil zelf controle over waar het geld naartoe gaat.',
    'archetype.curiousTitle': 'De Nieuwsgierige Spreider',
    'archetype.curiousDesc': 'Geïnteresseerd in een beetje van alles, inclusief nieuwere, risicovollere assets.',

    'quiz.startBtn': 'Doe de 30-seconden quiz →',
    'quiz.questionOf': 'Vraag {n} van {total}',
    'quiz.resultEyebrow': 'Jouw beleggerstype',
    'quiz.shareX': 'Deel op X',
    'quiz.shareLinkedin': 'Deel op LinkedIn',
    'quiz.copyLink': 'Kopieer link',
    'quiz.downloadImage': 'Download afbeelding',
    'quiz.toolExploreLead': 'Benieuwd wat er allemaal is?',
    'quiz.toolExploreSub': 'We stellen een feitelijke vergelijking samen van brokers en MiCA-erkende exchanges — dezelfde lijst voor iedereen, geen persoonlijke keuzes op basis van jouw resultaat.',
    'quiz.toolExploreLink': 'Bekijk de conceptvergelijking →',
    'quiz.retake': 'Doe de quiz opnieuw',
    'quiz.toastCopied': 'Link gekopieerd!',
    'quiz.shareText': 'Ik ben {title} {emoji} — ontdek jouw beleggerstype met deze 30-seconden quiz:',

    'why.kicker': 'Waarom dit bestaat',
    'why.title': 'Beleggen voelt intimiderend. Crypto voelt als een mijnenveld.',
    'why.p1': 'Elke app wil dat je <strong>nu geld stort</strong>. De aandelenapps negeren crypto; de cryptoapps zitten vol hype en mensen die je iets proberen te verkopen. Bijna geen enkele neemt de tijd om je eerlijk te leren wat je nou eigenlijk doet.',
    'why.p2': 'Dit is het tegenovergestelde: <strong>eerst leren, dan beleggen</strong> — in <strong>beide</strong> werelden. Begrijp de handvol ideeën die ertoe doen, krijg een eerlijk, nuchter verhaal over crypto <em>inclusief</em> de risico’s, bepaal wat bij je past, en zet je eerste stap met een kalm gevoel in plaats van onrust.',
    'why.p3': 'Het is opgebouwd rond hoe dit werkt in <strong>Europa</strong> specifiek — de echte tools, de bescherming, de kosten, en alleen gereguleerde, erkende platforms — geen Amerikaanse app met de verkeerde munt.',

    'final.title': 'Wees één van de eersten.',
    'final.sub': 'We bouwen dit nu. Meld je aan voor de wachtlijst en krijg vroege toegang — en inspraak in wat we bouwen.',

    'footer.disc': 'Dit is een educatief project. Het biedt algemene informatie over beleggen, geen persoonlijk financieel advies. Beleggen brengt risico’s met zich mee, inclusief het mogelijke verlies van het geld dat je belegt.',
    'footer.madeIn': 'Gemaakt in Europa',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Voorwaarden',

    quizTypes: [
      { key: 'cautious', emoji: '🟢', title: 'De Voorzichtige Starter', tagline: 'Je wilt vooral veiligheid en eenvoud — eerst de gewoonte opbouwen, later meer risico toevoegen.', accent: '#1f9d63' },
      { key: 'steady',   emoji: '🔵', title: 'De Stabiele Bouwer',       tagline: 'Je wilt op de lange termijn vermogen opbouwen zonder er dagelijks mee bezig te zijn.', accent: '#2f7bd1' },
      { key: 'handson',  emoji: '🟠', title: 'De Actieve Onderzoeker',   tagline: 'Je houdt van uitzoekwerk en wilt zelf controle over waar het geld naartoe gaat.', accent: '#d8822f' },
      { key: 'curious',  emoji: '🟣', title: 'De Nieuwsgierige Spreider', tagline: 'Je bent geïnteresseerd in een beetje van alles, inclusief nieuwere, risicovollere assets.', accent: '#8b5fd1' }
    ],
    quizQuestions: [
      {
        q: 'Als je je voorstelt dat je geld belegd is, wat vind je dan het belangrijkst?',
        options: ['Weten dat ik er niet wakker van lig', 'Het rustig zien groeien over de jaren', 'Precies weten waar het naartoe gaat', 'Een mix hebben, ook wat nieuwe dingen']
      },
      {
        q: 'Hoe denk je over crypto?',
        options: ['Te risicovol voor mij, nu nog niet', 'Misschien een heel klein deel, veel later', 'Ik wil het echt begrijpen voordat ik eraan begin', 'Nieuwsgierig — ik wil er nu al iets van hebben']
      },
      {
        q: 'Hoe vaak wil je naar je beleggingen kijken?',
        options: ['Zo weinig mogelijk', 'Af en toe, een korte blik', 'Regelmatig — ik hou het graag in de gaten', 'Wanneer er iets nieuws mijn aandacht trekt']
      },
      {
        q: 'Kies een eerste stap die bij jou past:',
        options: ['Open een spaarachtige rekening, langzaam beginnen', 'Zet een automatische maandelijkse inleg op en vergeet het', 'Zelf een paar individuele aandelen of fondsen uitzoeken', 'Verdelen — deels veilig, deels experimenteel']
      }
    ]
  }
};
