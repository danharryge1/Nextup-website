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
export const WHATWEDO_DESCRIPTOR = "We don't guess. We diagnose, plan, and hand you something you can actually use.";

export const SERVICE_CARDS = [
  {
    title: "Strategy & Direction",
    description: "Don't know where to focus? We cut through the noise and build a ==clear plan== with ==real priorities== so you stop guessing and start moving.",
    colour: "blue" as const,
  },
  {
    title: "Growth & Marketing",
    description: "Spending money but not seeing results? We find what's ==actually working==, kill what isn't, and build a growth engine that compounds.",
    colour: "teal" as const,
  },
  {
    title: "Operations & Systems",
    description: "Drowning in manual work? We ==streamline== how your business runs so your team focuses on ==what matters==.",
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
    description: "Youth employment innovation, Liverpool. Partnered with a youth employment hub in Birkenhead to tackle youth unemployment. Delivered a strategic plan to reduce the area's 6,000 NEETs on a £10k budget.",
    category: "Strategy",
    colour: "blue" as const,
    logo: "/images/Logos/spark.png",
  },
  {
    name: "Marden Digital",
    description: "Solo web designer being bottlenecked by slow client content. We built a system that cut content turnaround time so he could take on more builds and scale revenue.",
    category: "Operations",
    colour: "teal" as const,
    logo: "/images/Logos/Marden Digital.jpeg",
  },
  {
    name: "Student Showdown Boxing",
    description: "Boxing and MMA events company needing support across two fight nights. We managed fighters, planned the event schedule, and helped execute on the night.",
    category: "Events",
    colour: "coral" as const,
    logo: "/images/Logos/student-showdown.webp",
  },
  {
    name: "RBC Events",
    description: "Boxing events company that needed credible, innovative marketing to stand out in a competitive market. We built the brand, managed operations including boxer management and event planning, and sold out to 500+ viewers in 8 weeks.",
    category: "Events",
    colour: "amber" as const,
    logo: "/images/Logos/rbc events.avif",
  },
  {
    name: "Africa Oye",
    description: "Consulted for the UK's biggest African music festival on innovative marketing strategies to attract international and local students, while managing the transition from a free to a paid event. Delivered two actionable marketing approaches and a contact list for further support.",
    category: "Marketing",
    colour: "blue" as const,
    logo: "/images/Logos/africa oye.webp",
  },
  {
    name: "Castel Clothing",
    description: "Personal shopper stuck at a revenue ceiling, trapped in a market category limiting growth. We built a clear, executable strategy to reposition upmarket and attract higher-quality clients.",
    category: "Brand",
    colour: "teal" as const,
    logo: "/images/Logos/Castel clothing.webp",
  },
  {
    name: "Soar the Project",
    description: "Clothing brand with 15k+ followers looking to break into the UK market. We're building their customer strategy, marketing approach, and a sustainable shipping model to launch UK sales.",
    category: "Marketing",
    colour: "coral" as const,
    logo: "/images/Logos/soar the project.png",
  },
  {
    name: "Donna",
    description: "Details coming soon.",
    category: "TBC",
    colour: "amber" as const,
  },
  {
    name: "RegenerUS",
    description: "Details coming soon.",
    category: "TBC",
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
    description: "We dig into your business, your goals, and the ==real blockers== holding you back. No assumptions. No recycled frameworks.",
    colour: "blue" as const,
  },
  {
    number: "02",
    title: "Design",
    description: "We build an ==actionable strategy== with ==real numbers== and timelines. You'll know exactly what needs to happen and why.",
    colour: "teal" as const,
  },
  {
    number: "03",
    title: "Deliver",
    description: "You get a ==complete roadmap== you can act on immediately. No 50-page report collecting dust. Just ==clarity and direction==, and a built-in check-up to make sure it's actually working.",
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
export const CTA_SUBTEXT = "Book a free discovery call. We'll learn about your business, and if we can help, we'll tell you exactly how.";
export const CTA_BUTTON = "Book a Free Call";

// ABOUT PAGE
export const ABOUT_HEADLINE = "A different kind of consultancy";
export const ABOUT_SUBHEADLINE = "Everything we know, we learned by building. Not by reading about it.";

export const ABOUT_STORY = [
  "We've spent the last few years using ==AI, automation, and modern tech== to solve real problems across real projects - from youth unemployment strategy to operational overhauls to brand repositioning. We've run our own companies, delivered for paying clients, and we're still ==learning and applying every day==.",
  "We built Next Up Co. because the traditional consultancy model is broken. Weeks of scoping before anyone understands the problem. A partner sells it, a junior delivers it. A 100-slide deck nobody uses. We do it differently - ==discovery first==, same team start to finish, and a built-in check-up because we actually care whether it worked.",
];

export const ABOUT_TEAM_BIOS = [
  {
    name: "Dan",
    role: "Co-Founder",
    bio: [
      "Keeps things moving every single day. Holds the team accountable, pushes decisions forward, and brings a sharp edge with AI and modern tech.",
      "Built and sold out a boxing events company to 500+ people, ran a dropshipping business, and invests on the side.",
      "Gym, painting, travelling, and currently trying to learn the guitar.",
    ],
    image: "/images/team/Dan.jpg",
    linkedin: "https://www.linkedin.com/in/daniel-h-george/",
  },
  {
    name: "Joe",
    role: "Co-Founder",
    bio: [
      "Brings ambition and positivity to the team. Always pushing the vision forward and finding ways to improve, learn, and innovate.",
      "Director and co-lead of marketing for an events company that sold out its venue, then Head of Marketing for a healthcare startup.",
      "Gym, travelling, and experiencing new cultures and perspectives.",
    ],
    image: "/images/team/Joe.jpg",
    linkedin: "https://www.linkedin.com/in/joseph-tipping-298193327/",
  },
  {
    name: "Charlie",
    role: "Co-Founder",
    bio: [
      "The organiser and connector of the team. Makes sure people stay aligned and that clients receive the work we deliver.",
      "Built a social media audience of over 125,000 followers, ran e-commerce sales across 18+ countries, and led Student Showdown - a sold-out event with over 600 tickets sold.",
      "Travelled to 40 countries, which has helped develop strong people skills and the ability to connect with different cultures.",
    ],
    image: "/images/team/Charlie.jpg",
    linkedin: "https://www.linkedin.com/in/charlie-waugh-339069201/",
  },
  {
    name: "Liam",
    role: "Co-Founder",
    bio: [
      "The one who stress-tests ideas before they go through to clients for implementation.",
      "Ran a property investment business for 4 years and co-founded a student boxing events company.",
      "Enjoys reading fiction and keeping active in the gym.",
    ],
    image: "/images/team/Liam.jpg",
    linkedin: "https://www.linkedin.com/in/liam-sawley-703013211/",
  },
];

export const VALUES = [
  {
    title: "Where business is going, not where it was.",
    description: "We use AI, automation, and modern tools because they work - not because they're trendy. While others are still catching up, we're already building with what's next.",
    colour: "blue" as const,
  },
  {
    title: "Honesty, even when it's uncomfortable",
    description: "We tell you what you need to hear, not what you want to hear. That's the whole point.",
    colour: "teal" as const,
  },
  {
    title: "Outcomes, not hours",
    description: "We don't sell time. We sell clarity and results.",
    colour: "coral" as const,
  },
];

// SERVICES PAGE
export const SERVICES_HEADLINE = "What we do";
export const SERVICES_SUBHEADLINE = "We don't guess. We diagnose, plan, and hand you something you can actually use.";

export const SERVICE_BLOCKS = [
  {
    number: "01",
    title: "Strategy & Direction",
    description: "Most businesses know something needs to change but can't pinpoint what. We cut through assumptions and build a ==clear picture== of where you are, where you need to go, and ==how to get there==.",
    areas: ["Strategic planning", "Business model review", "Prioritisation frameworks", "Decision-making support"],
    colour: "blue" as const,
    bgStyle: "light" as const,
  },
  {
    number: "02",
    title: "Growth & Marketing",
    description: "Throwing money at marketing without a system is expensive guesswork. We find what's ==actually driving results==, kill what isn't, and build a growth engine that ==compounds over time==.",
    areas: ["Marketing audits", "Customer acquisition strategy", "Brand positioning", "Digital presence"],
    colour: "teal" as const,
    bgStyle: "dark" as const,
  },
  {
    number: "03",
    title: "Operations & Systems",
    description: "Your team is talented but drowning in inefficiency. We identify the ==bottlenecks==, simplify processes, and implement tools that ==give you your time back==.",
    areas: ["Process optimisation", "Workflow automation", "Tool implementation", "Team productivity"],
    colour: "coral" as const,
    bgStyle: "light" as const,
  },
];

export const FAQ_ITEMS = [
  {
    question: "Are you experienced enough?",
    answer: "We've built and run revenue-generating businesses from scratch, managed hundreds of clients, and study entrepreneurship full-time. More importantly, we bring ==tools, thinking, and speed== that most consultancies can't match. We're not here to theorise. We're here to get results.",
  },
  {
    question: "What industries do you work with?",
    answer: "We're industry-agnostic. Our skills apply across sectors. We're most useful for small-to-medium businesses that need to move faster but don't have the internal resource to figure out how.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Most engagements run 2-8 weeks. We ==move fast by design==.",
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
export const CONTACT_SUBHEADLINE = "Book a free discovery call. We'll learn about your business, and if we can help, we'll tell you exactly how.";
export const CONTACT_TEXT = "Whether you've got a specific challenge or just want to explore how we might help, we're happy to chat.";

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
