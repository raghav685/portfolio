/* All portfolio copy lives here. Both the animated site and Paper mode render from it. */
window.SITE = {
  first: "Manjunath",
  last: "Chandrashekar",
  preferred: "Raghav",
  handle: "RAGHAV/BUILD",
  url: "https://manjunathchandrashekar.com/",
  tagline: "[ Marketing Manager / AI Automation Specialist / Web Developer ]",
  intro: "London based marketing manager. I help businesses get found through search, AI answers, paid media and automation, then build the websites and films that turn that attention into leads.",
  origin: "London, UK",
  coords: "51.51°N 0.09°W",
  cv: "assets/docs/Manjunath-Chandrashekar-CV.pdf",
  email: "manj6911@gmail.com",
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/manjunath-chandrashekar78/", handle: "manjunath-chandrashekar78" }
  ],

  music: { name: "Spotify", label: "Lose Yourself, Eminem", title: "Lose Yourself", artist: "Eminem", album: "8 Mile soundtrack", length: "5:24", uri: "spotify:track:3u0W3gJQNV5gegMmntzby8", url: "https://open.spotify.com/track/3u0W3gJQNV5gegMmntzby8", art: "https://i.scdn.co/image/ab67616d0000b273d2a9744ce3913664175e9197" },
  about: [
    ["(me)", "I have always been drawn to people who spot an opening where everyone else sees a dead end. A big idea is worth little until someone has the nerve to act on it, and acting on it is the part I enjoy most."],
    ["(now)", "As Marketing Manager at Annaizu, a UK immigration and compliance platform, I run SEO, AI search visibility, paid search, content and automation. Around 20% of the business now comes from qualified leads that search brings in."]
  ],
  languages: [["English", "Full professional proficiency"]],
  education: [
    { tag: "(masters) 2023 – 2024", school: "Queen Mary University of London", course: "Master's in Management, Marketing specialisation. Final result: Merit (2:1)" }
  ],
  awards: [
    ["First place", "Several college debate competitions on politics, religion and humanity"],
    ["Recognition", "Honoured by local government in India as part of a COVID-19 frontline volunteer team"],
    ["Cricket", "Played competitive cricket at division level"]
  ],

  ticker: ["SEO", "Technical SEO", "AI search optimisation", "GEO", "AEO", "Google Ads", "PPC", "LinkedIn Ads", "Email marketing", "Marketing automation", "AI automation", "Lead generation", "Lead pipeline", "Content marketing", "Copywriting", "Brand strategy", "Promotional strategy", "Social media", "Video editing", "Motion design", "Web development", "Link building", "Keyword research", "Conversion tracking", "Product requirements", "Market research", "Script writing"],
  tools: ["Webflow", "WordPress", "Semrush", "OpenSEO", "Google Search Console", "Google Ads", "HubSpot", "Zoho CRM", "Lusha", "Adobe Photoshop", "Adobe InDesign", "Adobe Premiere Pro", "Canva", "Remotion", "HyperFrames", "Firebase", "Aiven", "Vercel", "IONOS", "Hostinger", "GSAP", "HTML", "CSS", "JavaScript", "Claude", "MCP"],

  skills: [
    { t: "SEO & AI search", d: "Technical audits, keyword gap analysis, on page optimisation and getting cited in AI answers (GEO and AEO).", tags: ["Semrush", "OpenSEO", "Search Console", "Schema"] },
    { t: "Paid media", d: "Google Ads and LinkedIn Ads campaigns, from keyword and intent mapping to ad copy, budgets and conversion tracking.", tags: ["Google Ads", "LinkedIn Ads", "Tracking"] },
    { t: "AI automation", d: "AI agents and workflows that take repetitive work off the team: research, reporting, lead handling and content operations.", tags: ["AI agents", "Workflows", "Prompting", "MCP"] },
    { t: "Copywriting", d: "Long form articles, newsletters, landing pages, ad copy and LinkedIn posts, written to rank, get cited by AI and convert.", tags: ["Blogs", "Newsletters", "Landing pages", "LinkedIn"] },
    { t: "Design", d: "Brand consistent social posts, ads, print and presentation material.", tags: ["Adobe Photoshop", "Adobe InDesign", "Canva"] },
    { t: "Motion & video", d: "Reels, brand films and product videos, mixing AI generated footage with code driven edits.", tags: ["Remotion", "HyperFrames", "Premiere", "AI video"] },
    { t: "Web development", d: "Fast marketing sites and data driven web apps, from first design to launch, with the databases and hosting behind them.", tags: ["Webflow", "WordPress", "HTML/CSS/JS", "GSAP", "Firebase", "Aiven", "Vercel", "IONOS"] },
    { t: "Product & research", d: "Competitor analysis, product requirement documents and roadmaps that turn market gaps into features.", tags: ["PRDs", "Roadmaps", "Market research"] },
    { t: "CRM & lead generation", d: "Email marketing, lead sourcing, enrichment and nurturing that keep the sales pipeline moving.", tags: ["Email marketing", "Zoho CRM", "HubSpot", "Lusha"] }
  ],

  works: [
    { k: "Annaizu", t: "Cited by Google's AI Overview", d: "For \"best sponsor licence compliance software UK\", Google's AI Overview lists Annaizu as its first source, and the site also ranks in the organic results underneath.", tags: ["AI search", "GEO / AEO"], img: "assets/img/work-annaizu-ai.jpg", url: "" },
    { k: "Annaizu", t: "2.6x more referring domains", d: "Grew referring domains from 34 to 89 in a year, with 234 new backlinks in a single month, and earned a link from the Home Office's own DBS directory (domain authority 69). Measured with an OpenSEO audit.", tags: ["OpenSEO", "Link building", "Digital PR"], img: "assets/img/work-annaizu-links.jpg", url: "" },
    { k: "Annaizu, copywriting", t: "500+ articles written", d: "The blog and newsletter behind Annaizu's search growth: more than 500 articles on sponsorship, immigration, DBS checks and workforce compliance, written for UK employers.", tags: ["Copywriting", "Blog", "Newsletter"], img: "assets/img/work-annaizu-blog.jpg", url: "https://www.annaizu.com/blog", cta: "Read the blog" },
    { k: "Annaizu, built by me", t: "Annaizu website", d: "The marketing site for a UK workforce management and compliance platform, covering sponsorship compliance, immigration services, rota, onboarding and DBS checks.", tags: ["Web development", "Webflow", "SEO"], img: "assets/img/work-annaizu-site.jpg", url: "https://www.annaizu.com/" },
    { k: "Annaizu, built by me", t: "UK sponsor licence checker", d: "A searchable mirror of the GOV.UK register of 127,310 licensed sponsors, built end to end by me. A scheduled job pulls the government data every day and refreshes the site automatically.", tags: ["Data pipeline", "Daily sync", "Web app"], img: "assets/img/work-sponsorlist.jpg", url: "https://uk-tier2sponsorlist.annaizu.com/" },
    { k: "Freelance, built by me", t: "Bharathi Associates", d: "Website for an industrial equipment supplier of pumps, blowers and diffusers for wastewater treatment projects.", tags: ["Web development", "Anime.js"], img: "assets/img/work-bharathi.jpg", url: "https://bharathi-associates.com/" },
    { k: "Personal, built by me", t: "Baba Yaga Fitness", d: "A training web app with an exercise library of 873 movements, workout logging, programmes and progress tracking.", tags: ["Web app", "Fitness"], img: "assets/img/work-fitness.jpg", url: "https://palegreen-oyster-544450.hostingersite.com/", place: "life" }
  ],

  reels: [
    { k: "Annaizu", t: "Keep the Licence", d: "A video game style reel that turns a surprise Home Office audit into a mission the HR team wins.", src: "assets/video/reel-annaizu.mp4", poster: "assets/img/reel-annaizu-poster.jpg" },
    { k: "VeggiGo, freelance", t: "86'd", d: "A kitchen ticket story for a friend's fresh produce supplier launching across central London.", src: "assets/video/reel-veggigo.mp4", poster: "assets/img/reel-veggigo-poster.jpg" }
  ],

  reelsNote: "Each reel starts from a reference edit: its cut timing, transitions and pacing, rebuilt shot for shot around the brand's own story. Brand logos are blurred on this page.",

  writing: {
    k: "MAANAV", ver: "Shooting script, Kannada",
    t: "MAANAV: a short film script",
    d: "A shot by shot shooting script covering camera angles, sound design, cuts and dialogue for a short film about finding humanity in a crowd that has lost it.",
    tags: ["Script writing", "Short film", "Direction"],
    pdf: "assets/docs/MAANAV-shooting-script.pdf",
    pages: ["assets/img/maanav-p1.jpg", "assets/img/maanav-p2.jpg", "assets/img/maanav-p3.jpg", "assets/img/maanav-p4.jpg"]
  },

  quote: ["See the opening,", "back the idea,", "build it anyway."],
  manifesto: "The people I learn from rarely fit the mould. They question the obvious, take the unpopular route and make the thing others said could not be done. You can argue with them, but you cannot overlook them. That is the standard I hold my own work to.",
  now: ["AI search", "Marketing automation", "Google Ads", "Remotion", "Strength training"],

  jobs: [
    { r: "Marketing Manager", o: "Annaizu", when: "2026 – Present", d: "Lead SEO, AI search, paid media, email marketing and automation, running the lead pipeline end to end. Promoted from Marketing Executive (2025 – 2026).", tag: "UK" },
    { r: "Sales Associate", o: "Greene King", when: "2024 – 2025", d: "Brand and promotional strategy, reels and content, offline marketing with banners and posters, offer pricing, events and guest communication.", tag: "London" },
    { r: "Marketing Associate, Digital & Growth", o: "Bharathi Associates", when: "2022 – 2023", d: "Digital campaigns and growth marketing for an industrial equipment supplier.", tag: "India" },
    { r: "Marketing Associate", o: "IFI Tech Solutions", when: "2020 – 2022", d: "Joined as an intern learning Lusha, CRM and sales strategy. Promoted in 2021 after building the lead pipeline, then took over content and advertising within the team.", tag: "India" }
  ],
  freelance: [
    { r: "Web developer", o: "Bharathi Associates website" },
    { r: "Reels & motion", o: "VeggiGo" }
  ],
  soft: ["Teamwork", "Leadership", "Public speaking & debate", "Stakeholder communication", "Research", "Fast iteration"],
  certs: ["Digital Marketing", "Google", "HubSpot", "LinkedIn", "Adobe InDesign"],

  life: {
    title: "Lift heavy /",
    text: "Training keeps me disciplined, and the gym is where I clear my head. It is also why I built Baba Yaga Fitness, my own training app.",
    clip: "assets/video/gym-deadlift.mp4", poster: "assets/img/gym-deadlift-poster.jpg",
    photos: ["assets/img/gym-kettlebell.jpg", "assets/img/gym-legpress.jpg"]
  },
  hobbies: ["Strength training", "Cricket", "Debating", "Script writing", "Film editing", "Web design"]
};
