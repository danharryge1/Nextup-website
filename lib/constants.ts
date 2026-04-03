export const COMPANY_NAME = "Next Up Co.";
export const COMPANY_EMAIL = "book.next.up@gmail.com";
export const BOOKING_LINK = "https://calendly.com/book-next-up";
export const COMPANY_LOCATION = "Liverpool, UK";
export const LINKEDIN_URL = "https://www.linkedin.com/in/daniel-h-george/";

// NAV
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];
export const NAV_CTA = "Get in Touch";

// HOME - HERO
export const HERO_HEADLINE = "Consultancy Built For What's Next";
export const HERO_SUBHEADLINE = "Young minds. ==Modern tools.== Real results.";
export const HERO_CTA = "Book a Free Call";
export const HERO_CTA_LINK = "/contact";
export const HERO_REASSURANCE = "No pressure. Just a conversation.";

// HOME - WHAT WE DO
export const WHATWEDO_LABEL = "WHAT WE DO";
export const WHATWEDO_HEADING = "Problems worth solving";
export const WHATWEDO_DESCRIPTOR = "Every business has a next move. We help you find it, plan it, and make it happen.";

export const SERVICE_CARDS = [
  {
    title: "Strategy & Direction",
    description: "Lost in the noise? We'll build you a ==clear plan== with ==real priorities==, so you know exactly where to focus and what to do first.",
    colour: "blue" as const,
  },
  {
    title: "Growth & Marketing",
    description: "Marketing that's costing more than it's making? We'll find what's ==actually working==, cut the waste, and build something that grows with you.",
    colour: "teal" as const,
  },
  {
    title: "Operations & Systems",
    description: "Too much time on the wrong things? We'll ==streamline== your operations so your team can focus on ==what matters==.",
    colour: "coral" as const,
  },
];

// HOME - CREDIBILITY
export const CREDIBILITY_METRICS = [
  { value: "4", label: "Founders", colour: "blue" as const },
  { value: "9+", label: "Projects delivered", colour: "teal" as const },
  { value: "2026", label: "Est.", colour: "coral" as const },
  { value: "Liverpool", label: "Based in", colour: "amber" as const },
];

// HOME - PROJECT CAROUSEL
export type AccentColour = "blue" | "teal" | "coral" | "amber";

export const PROJECTS = [
  {
    name: "Spark",
    niche: "Youth Unemployment Hub",
    subtitle: "Youth Unemployment Hub",
    description: "Youth employment innovation, Liverpool. Partnered with a youth employment hub in Birkenhead to tackle youth unemployment. Delivered a strategic plan to reduce the area's 6,000 NEETs on a £10k budget.",
    category: "Strategy",
    colour: "blue" as const,
    logo: "/images/Logos/spark.png",
  },
  {
    name: "Marden Digital",
    niche: "Website Developer",
    subtitle: "Web Design Agency",
    description: "Built and implemented a systemised blueprint to reduce lead times on client content, allowing this web design agency to increase output and scale their revenue.",
    category: "Operations",
    colour: "teal" as const,
    logo: "/images/Logos/Marden Digital.jpeg",
  },
  {
    name: "Student Showdown Boxing",
    niche: "Sporting Events",
    subtitle: "Sporting Events",
    description: "Supported two student fight-night events by overseeing talent management, designing a new website and supporting marketing efforts. This contributed to a total 900+ tickets sold.",
    category: "Events",
    colour: "coral" as const,
    logo: "/images/Logos/student-showdown.webp",
  },
  {
    name: "RBC Events",
    niche: "Sporting Events",
    subtitle: "Boxing Events",
    description: "In a timeframe of just 8 weeks, our team established a consistent and striking brand via social media marketing. We also managed operations, including boxer management and comprehensive event planning. The above lead to a sold-out event with 500+ viewers for a company that needed a credible, innovative strategy to stand out in a highly competitive sector.",
    category: "Events",
    colour: "amber" as const,
    logo: "/images/Logos/rbc events.avif",
  },
  {
    name: "Africa Oye",
    niche: "Music Festival",
    subtitle: "A Music Event",
    description: "Designed actionable marketing strategies for the UK's biggest African music festival. Delivered credible strategies to attract international and local students, while managing a large-scale transition from a free to paid event. We also provided access to the necessary network to expand Africa Oye's attendee demographic.",
    category: "Marketing",
    colour: "blue" as const,
    logo: "/images/Logos/africa oye.webp",
  },
  {
    name: "Castel Clothing",
    niche: "Personal Shopper",
    subtitle: "Personal Shopper",
    description: "Designed and implemented a brand repositioning strategy for this luxury-tier personal shopping service. Our roadmap included a revised product segment & distribution model, fresh marketing strategy, and automation that has allowed Castel to reach and serve a more affluent customer base.",
    category: "Brand",
    colour: "teal" as const,
    logo: "/images/Logos/Castel clothing.webp",
  },
  {
    name: "Soar the Project",
    niche: "Clothing Brand",
    subtitle: "Clothing Brand",
    description: "Built a comprehensive go-to-market strategy for this Egypt-based clothing brand with a following of 16k+. This included an efficient shipping process, reliable SOP and an innovative marketing approach, specifically designed to help S.T.P break into the UK fashion landscape.",
    category: "Marketing",
    colour: "coral" as const,
    logo: "/images/Logos/soar the project.png",
  },
  {
    name: "Donatti LTD.",
    niche: "Property Investor",
    subtitle: "Property",
    description: "Built a bespoke deal analysis tool, a project cost estimator, built write a full business plan, and a legally structured partnership agreement, giving a first-time property investor everything needed to operate professionally from day one.",
    category: "Strategy",
    colour: "amber" as const,
    logo: "/images/Logos/Donatti.jpeg",
  },
  {
    name: "RegenerUS",
    niche: "Environmental Charity",
    subtitle: "Environmental Charity",
    description: "Coded an educational interactive experience to raise environmental awareness by teaching users about the measures taken by major cities to battle climate change.",
    category: "Education",
    colour: "coral" as const,
    logo: "/images/Logos/regnerus.jpg",
  },
];

// HOME - HOW WE WORK
export const PROCESS_LABEL = "OUR PROCESS";
export const PROCESS_HEADING = "Simple. Clear. Effective.";
export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Understand",
    description: "We learn your business inside out: your goals, your challenges, and the ==real blockers== you might not even see yet.",
    colour: "blue" as const,
  },
  {
    number: "02",
    title: "Design",
    description: "We design an ==actionable strategy== with ==real numbers== and timelines. Clear enough that you could explain it to anyone.",
    colour: "teal" as const,
  },
  {
    number: "03",
    title: "Deliver",
    description: "You walk away with a ==complete roadmap== you can act on straight away. Plus a built-in check-up to make sure it's ==actually working==.",
    colour: "coral" as const,
  },
];

// HOME - TEAM TEASER
export const TEAM_HEADING = "The Team";
export const TEAM_TAGLINE = "No handoffs. No juniors. The people on this page are the people doing the work.";
export const TEAM_MEMBERS = [
  { name: "Dan", role: "Co-Founder", image: "/images/team/Dan.jpg", linkedin: "https://www.linkedin.com/in/daniel-h-george/" },
  { name: "Joe", role: "Co-Founder", image: "/images/team/Joe.jpg", linkedin: "https://www.linkedin.com/in/joseph-tipping-298193327/" },
  { name: "Charlie", role: "Co-Founder", image: "/images/team/Charlie.jpg", linkedin: "https://www.linkedin.com/in/charlie-waugh-339069201/" },
  { name: "Liam", role: "Co-Founder", image: "/images/team/Liam.jpg", linkedin: "https://www.linkedin.com/in/liam-sawley-703013211/" },
];

// HOME - FINAL CTA
export const CTA_HEADING = "Ready to level up?";
export const CTA_SUBTEXT = "Book a free discovery call. We'll get to know your business and show you exactly where we can help.";
export const CTA_BUTTON = "Book a Free Call";

// ABOUT PAGE
export const ABOUT_HEADLINE = "A different kind of consultancy";
export const ABOUT_SUBHEADLINE = "Everything we know, we learned by building. Not by reading about it.";

export const ABOUT_STORY = [
  "Over the last few years we've used ==AI, automation, and modern tech== to solve real problems across real projects: youth unemployment strategy, operational overhauls, brand repositioning. We've built our own companies, delivered for real clients, and we're still ==learning and applying every day==.",
  "We started Next Up Co. because the traditional consultancy model doesn't work for most businesses. Weeks of scoping before anyone understands the problem. The person who sold it disappears. You get a 100-slide deck that sits in a drawer. We do it differently: ==discovery first==, same team from start to finish, and a built-in check-up because we genuinely care whether it worked.",
];

export const ABOUT_TEAM_BIOS = [
  {
    name: "Dan",
    role: "Co-Founder",
    bio: [
      "I keep things moving every single day. I hold the team accountable, push decisions forward, and bring a sharp edge with AI and modern tech.",
      "I started building businesses at 15. Ran a four-figure Facebook marketplace dropshipping business, built and sold out a boxing events company to 500+ people, and I actively invest in crypto, index funds, and stocks.",
      "Gym, painting, travelling, and currently trying to learn the guitar.",
    ],
    image: "/images/team/Dan.jpg",
    linkedin: "https://www.linkedin.com/in/daniel-h-george/",
  },
  {
    name: "Joe",
    role: "Co-Founder",
    bio: [
      "I bring ambition and positivity to the team. I'm always pushing our vision forward and finding ways to improve, learn, and innovate.",
      "Before this, I was director and co-lead of marketing for an events company that sold out its venue, then I worked as Head of Marketing for a healthcare startup.",
      "Gym, travelling, and experiencing new cultures and perspectives.",
    ],
    image: "/images/team/Joe.jpg",
    linkedin: "https://www.linkedin.com/in/joseph-tipping-298193327/",
  },
  {
    name: "Charlie",
    role: "Co-Founder",
    bio: [
      "I'm the organiser and connector of the team. I make sure people stay aligned and that clients receive the work we deliver.",
      "I built a social media audience of over 125,000 followers, ran e-commerce sales across 18+ countries, and led Student Showdown - a sold-out event with over 600 tickets sold.",
      "I've travelled to 40 countries, which has helped me develop strong people skills and the ability to connect with different cultures.",
    ],
    image: "/images/team/Charlie.jpg",
    linkedin: "https://www.linkedin.com/in/charlie-waugh-339069201/",
  },
  {
    name: "Liam",
    role: "Co-Founder",
    bio: [
      "I'm the one who stress-tests ideas before they go through to clients for implementation.",
      "I ran a property investment business for 4 years and co-founded a student boxing events company.",
      "I enjoy reading fiction and keeping myself active in the gym.",
    ],
    image: "/images/team/Liam.jpg",
    linkedin: "https://www.linkedin.com/in/liam-sawley-703013211/",
  },
];

export const VALUES = [
  {
    title: "Evolving rapidly, blazing ahead.",
    description: "We use tools such as AI and automation to bring our clients to the forefront of modern business practice. While others are still catching up, we're already building with what's next.",
    colour: "blue" as const,
  },
  {
    title: "Integrity as a tool for good.",
    description: "We tell you exactly what stands between you and your business goals, and then we achieve them.",
    colour: "teal" as const,
  },
  {
    title: "Outcome focused no matter what.",
    description: "Our goal is to help you achieve yours. Our clients either get results or more quality consultancy, no in-between.",
    colour: "coral" as const,
  },
];

// SERVICES PAGE
export const SERVICES_OFFER_LABEL = "SERVICES WE OFFER";

export const SERVICES_OFFER_CARDS = [
  {
    title: "Standalone Projects",
    description: "We take on a specific challenge, diagnose the real problem, and build you a clear strategy you can act on. Fixed scope, clear timeline, one deliverable you can use straight away.",
    note: "Typical timeline: 2-8 weeks",
    accent: "blue" as const,
  },
  {
    title: "Implementation",
    description: "Want us to help put the plan into action? We work alongside your team to execute the strategy, build the systems, and make sure everything lands properly.",
    note: "Hands-on delivery with your team",
    accent: "teal" as const,
  },
  {
    title: "Maintenance",
    description: "Once the work is done, we stay in touch. Regular check-ins to make sure things are working, adjustments when needed, and ongoing support as your business evolves.",
    note: "Ongoing advisory and support",
    accent: "coral" as const,
  },
];

export const SERVICES_HEADLINE = "What we do";
export const SERVICES_SUBHEADLINE = "Every business has a next move. We help you find it, plan it, and make it happen.";

export const SERVICE_BLOCKS = [
  {
    number: "01",
    title: "Strategy & Direction",
    description: "Most businesses know something needs to change but can't quite pinpoint what. We help you see the ==clear picture==: where you are now, where you need to be, and ==how to get there==.",
    areas: ["Strategic planning", "Business model review", "Prioritisation frameworks", "Decision-making support"],
    colour: "blue" as const,
    bgStyle: "light" as const,
  },
  {
    number: "02",
    title: "Growth & Marketing",
    description: "Marketing without a system is expensive guesswork. We figure out what's ==actually driving results==, cut what isn't, and build something that ==compounds over time==.",
    areas: ["Marketing audits", "Customer acquisition strategy", "Brand positioning", "Digital presence"],
    colour: "teal" as const,
    bgStyle: "dark" as const,
  },
  {
    number: "03",
    title: "Operations & Systems",
    description: "Your team is talented but stuck in inefficiency. We find the ==bottlenecks==, simplify the processes, and put tools in place that ==give you your time back==.",
    areas: ["Process optimisation", "Workflow automation", "Tool implementation", "Team productivity"],
    colour: "coral" as const,
    bgStyle: "light" as const,
  },
];

export const FAQ_ITEMS = [
  {
    question: "Are you experienced enough?",
    answer: "We've built and run our own businesses, delivered for real clients, and study entrepreneurship full-time. What sets us apart is the ==tools, thinking, and speed== we bring. We're practical: everything we do is built to get results.",
  },
  {
    question: "What industries do you work with?",
    answer: "We're industry-agnostic. Our skills apply across sectors. We're most useful for small to medium businesses that need to move faster but don't have the internal resource to figure out how.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Most engagements run 2 to 8 weeks. We ==move fast by design==.",
  },
  {
    question: "What does it cost?",
    answer: "We scope every project based on the ==value we deliver==, not the hours we work. Book a call and we'll give you a straight answer.",
  },
  {
    question: "What do I actually get?",
    answer: "A clear strategy and actionable roadmap you can execute immediately. Not a 50-page PDF. Not vague advice. A plan with real priorities, real timelines, and real numbers.",
  },
];

// CONTACT PAGE
export const CONTACT_HEADLINE = "Let's talk";
export const CONTACT_SUBHEADLINE = "Book a free discovery call. We'll get to know your business and show you exactly where we can help.";
export const CONTACT_TEXT = "Got a specific challenge or just want to explore how we could help? We're happy to chat.";

// ---- Additional labels (no hardcoded text rule) ----
export const TEAM_SECTION_LABEL = "THE TEAM";
export const TEAM_CTA = "Get to know us";
export const TEAM_CTA_HREF = "/about";
export const CTA_LINK = "/contact";
export const ABOUT_STORY_LABEL = "OUR STORY";
export const TEAM_BIOS_LABEL = "MEET THE TEAM";
export const VALUES_LABEL = "WHAT WE STAND FOR";
export const CONTACT_FORM_LABEL = "OR SEND A MESSAGE";
export const FOOTER_TAGLINE = "Young consultancy. Modern tools. Real results.";
export const FOOTER_COPYRIGHT = `2026 ${COMPANY_NAME}`;
export const CAROUSEL_LABEL = "OUR WORK";
