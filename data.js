/* Sample blog data. Edit or replace this file to add your own articles. */
const img = (seed) => `https://picsum.photos/seed/${seed}/900/560`;

const para = (topic) => `
  <p>${topic} is changing quickly, and the people who take time to understand the fundamentals tend to adapt the best. In this article we look at what matters, what is hype, and what you can actually apply this week.</p>
  <h2>Why it matters</h2>
  <p>Good habits compound. Small, consistent improvements in how you approach ${topic.toLowerCase()} add up to a noticeable edge over months, not days. Start simple, measure what happens, and iterate.</p>
  <blockquote>Make it work, make it right, then make it fast.</blockquote>
  <h2>Getting started</h2>
  <ul>
    <li>Define a clear goal before you begin.</li>
    <li>Pick one tool or approach and stick with it for a while.</li>
    <li>Review your progress every week and adjust.</li>
  </ul>
  <p>Whatever your level, the best next step is the smallest one you can take today. Come back to this article when you need a refresher, and share it with someone who might find it useful.</p>`;

const POSTS = [
  { id: 1,  title: "The Future of Web Development in 2026", category: "Technology", tags: ["web", "javascript", "trends"], date: "2026-11-12", author: "Aarav Sharma", featured: true,  image: img("webdev"),    excerpt: "From server components to AI-assisted coding, here is where the web platform is heading next year.", content: para("Web development") },
  { id: 2,  title: "Minimalist UI: Less Is Truly More", category: "Design", tags: ["ui", "ux", "minimalism"], date: "2026-11-09", author: "Meera Kapoor", featured: true,  image: img("minimalui"), excerpt: "How restraint, whitespace and typography create interfaces people love to use.", content: para("Minimalist design") },
  { id: 3,  title: "A Weekend in the Himalayan Foothills", category: "Travel", tags: ["india", "mountains", "weekend"], date: "2026-11-05", author: "Rohan Verma", featured: true,  image: img("himalaya"),  excerpt: "Three days, one backpack and endless views: a practical guide to a short mountain escape.", content: para("Mountain travel") },
  { id: 4,  title: "Building Habits That Actually Stick", category: "Lifestyle", tags: ["habits", "productivity", "wellness"], date: "2026-11-01", author: "Neha Singh", featured: false, image: img("habits"),     excerpt: "Forget willpower. Use environment design and tiny steps to make good routines automatic.", content: para("Habit building") },
  { id: 5,  title: "CSS Grid vs Flexbox: When to Use Which", category: "Technology", tags: ["css", "layout", "web"], date: "2026-10-28", author: "Aarav Sharma", featured: false, image: img("cssgrid"),    excerpt: "Two powerful layout systems, one simple rule of thumb to choose between them.", content: para("CSS layout") },
  { id: 6,  title: "Color Theory for Developers", category: "Design", tags: ["color", "ui", "accessibility"], date: "2026-10-24", author: "Meera Kapoor", featured: false, image: img("colortheory"), excerpt: "Pick palettes that look great, meet contrast guidelines and survive dark mode.", content: para("Color theory") },
  { id: 7,  title: "Street Food Trails: Eating Your Way Through Delhi", category: "Travel", tags: ["food", "india", "city"], date: "2026-10-20", author: "Rohan Verma", featured: false, image: img("streetfood"), excerpt: "A hungry traveller's map of the best chaat, kebabs and sweets in the old city.", content: para("Street food") },
  { id: 8,  title: "Deep Work in a Distracted World", category: "Lifestyle", tags: ["focus", "productivity", "work"], date: "2026-10-16", author: "Neha Singh", featured: false, image: img("deepwork"),   excerpt: "Protect your attention with simple rituals that make hard problems feel manageable.", content: para("Deep work") },
  { id: 9,  title: "JavaScript Async Patterns Explained", category: "Technology", tags: ["javascript", "async", "web"], date: "2026-10-12", author: "Aarav Sharma", featured: false, image: img("jsasync"),    excerpt: "Callbacks, promises and async/await demystified with practical examples.", content: para("Asynchronous JavaScript") },
  { id: 10, title: "Designing for Accessibility from Day One", category: "Design", tags: ["accessibility", "ux", "web"], date: "2026-10-08", author: "Meera Kapoor", featured: false, image: img("a11y"),       excerpt: "Inclusive design is not an add-on. Here is how to bake it into your workflow.", content: para("Accessible design") },
  { id: 11, title: "Slow Travel: Why Fewer Places Means More", category: "Travel", tags: ["slow-travel", "mindful", "weekend"], date: "2026-10-04", author: "Rohan Verma", featured: false, image: img("slowtravel"), excerpt: "Staying longer in fewer places leads to richer stories and calmer trips.", content: para("Slow travel") },
  { id: 12, title: "Morning Routines of Calm, Productive People", category: "Lifestyle", tags: ["habits", "wellness", "morning"], date: "2026-09-30", author: "Neha Singh", featured: false, image: img("morning"),     excerpt: "No 4 a.m. wake-ups required. A realistic morning that sets up the whole day.", content: para("Morning routines") },
  { id: 13, title: "Getting Started with Git and GitHub", category: "Technology", tags: ["git", "tools", "beginners"], date: "2026-09-26", author: "Aarav Sharma", featured: false, image: img("gitgithub"),   excerpt: "A beginner-friendly tour of commits, branches and pull requests.", content: para("Version control") },
  { id: 14, title: "Typography Basics for Readable Interfaces", category: "Design", tags: ["typography", "ui", "readability"], date: "2026-09-22", author: "Meera Kapoor", featured: false, image: img("typography"), excerpt: "Font pairing, line length and spacing choices that make long reads effortless.", content: para("Typography") }
];
