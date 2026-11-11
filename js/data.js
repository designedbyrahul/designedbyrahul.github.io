/* ------------------------------------------------------------------
   Project data — sourced from behance.net/rahulkanda26
   images live in assets/covers (<id>.webp) and assets/work (<id>_<n>.webp)
------------------------------------------------------------------- */
const BEHANCE = "https://www.behance.net/gallery/";
const ccv = (id) => `https://www-ccv.adobe.io/v1/player/ccv/${id}/embed?api_key=behance1&bgcolor=%230c0c0e`;

window.CATEGORIES = [
  { key: "all", label: "All Work" },
  { key: "social", label: "Social Media" },
  { key: "event", label: "Events & Posters" },
  { key: "ui", label: "UI / UX" },
  { key: "motion", label: "Motion & Video" },
  { key: "art", label: "Illustration" },
];

window.PROJECTS = [
  {
    id: "228188073",
    brief: "Promo creatives for Zambia's biggest motor & mining shows — they had to feel as powerful as the machines on display.",
    idea: "A dark, cinematic look — hard light on chrome, oversized type and a strict grid so dates, venue and sponsors stay readable at a glance.",
    outcome: "A consistent kit of posters and social posts the organisers could roll out across the campaign, from teasers to on-ground announcements.", slug: "Motor-Show-2025", title: "Motor Show", client: "Zambia Motor Show",
    cat: "event", year: 2025, imgs: 5, tools: ["Photoshop"], featured: true, color: "#ff5b1f",
    desc: "Speed. Power. Design. Event branding for a motor show — a dark, cinematic theme with bold typography built to match the energy of the machines. The kind of design that stops the scroll.",
  },
  {
    id: "228187849",
    brief: "A Holi festival needed a look loud enough to sell tickets for a day of DJs, colours, dhol and pool parties.",
    idea: "Hand-drawn doodles, bunting and colour splashes around one fixed frame, so every act and activity got its own poster in the same family.",
    outcome: "A nine-piece series covering line-up, schedule and activities — one recognisable festival identity across the whole feed.", slug: "GULAAL-CARNIVAL", title: "Gulaal Carnival", client: "Festival Branding",
    cat: "event", year: 2025, imgs: 9, tools: ["Photoshop", "Illustrator"], featured: true, color: "#ff4fa3",
    desc: "Colors. Energy. Celebration. Event creatives for Gulaal Carnival — a festival branding project played out in the most vibrant palette of my career. Sometimes the brief is simply: make it joyful.",
  },
  {
    id: "228187611",
    brief: "A restaurant & bar wanted its weekly offers to feel premium — not like discount flyers.",
    idea: "Moody, low-key food and drink photography with elegant serif type, so the offer sits inside the mood instead of shouting over it.",
    outcome: "A reusable poster style for nights, offers and events that keeps the brand looking upscale week after week.", slug: "Restaurant-Posters", title: "Restaurant Posters", client: "F&B Social Campaign",
    cat: "social", year: 2025, imgs: 4, tools: ["Photoshop"], featured: true, color: "#c5f04a",
    desc: "Good food deserves great design. Social media posters for a restaurant brand — bold visuals, appetite-driven colour and typography that makes you hungry just looking at it.",
  },
  {
    id: "230459357", slug: "Motion-Poster", title: "Motion Posters", client: "Animated Social",
    cat: "motion", year: 2025, imgs: 0, tools: ["Photoshop", "Premiere Pro"],
    videos: ["SVbzYf-MHBo", "VtwGTLo_2AK", "2CGP3bRanDn"],
    desc: "Static posters brought to life — subtle motion, timed reveals and kinetic type that turn a feed post into a moment.",
  },
  {
    id: "214856783",
    brief: "A hillside resort needed social posts that sell calm, comfort and a reason to book a weekend away.",
    idea: "Photography-first layouts, generous whitespace and soft serif headlines — the place does the talking, the design stays out of the way.",
    outcome: "A six-post set with one calm visual language the resort can keep extending across its feed.", slug: "Resort-Creatives", title: "Resort Creatives", client: "Pushkara Resort",
    cat: "social", year: 2024, imgs: 6, tools: ["Photoshop"], featured: true, color: "#b9a7ff",
    desc: "A calm, premium social language for a hillside resort — serif headlines, generous whitespace and photography-first layouts that sell comfort and luxury.",
  },
  {
    id: "214856223",
    brief: "A study-abroad & immigration consultancy wanted ads that turn big dreams into real enquiries.",
    idea: "Destination-led visuals, a friendly tone and a clear hierarchy: dream → offer → call to action.",
    outcome: "Seven ad creatives built on one system, so new countries and offers can be swapped in quickly.", slug: "Immigration-Creatives", title: "Immigration Creatives", client: "ESS Global · Kingsway",
    cat: "social", year: 2024, imgs: 7, tools: ["Photoshop"], featured: true, color: "#f3f0ea",
    desc: "Advertising creatives for a study-abroad & immigration consultancy — clear hierarchy, friendly tone and destination-led visuals designed to turn dreams into enquiries.",
  },
  {
    id: "230459969", slug: "Zambias-Event-Videos", title: "Zambia's Event Videos", client: "Copperbelt Motor & Mining Show",
    cat: "motion", year: 2025, imgs: 0, tools: ["Premiere Pro", "Photoshop"],
    videos: ["CBhGPsg-J2b", "KmwAc2HAyRD", "PsqbpHpGTpo", "EXT4i5jgFrE"],
    desc: "Promo and event videos for Zambia's biggest motor and mining shows — punchy edits, motion graphics and on-brand titles for social and on-ground screens.",
  },
  {
    id: "191971109", slug: "Live-Concert-Poster-For-Shreya-Ghosal", title: "Shreya Ghoshal Live", client: "Concert Poster",
    cat: "event", year: 2023, imgs: 1, tools: ["Photoshop"],
    desc: "A live-concert poster with a warm, theatrical mood — layered light, elegant script and a strong focal portrait.",
  },
  {
    id: "199126711", slug: "IPL-Creatives", title: "IPL Creatives", client: "Brand × Cricket",
    cat: "social", year: 2024, imgs: 2, tools: ["Photoshop"],
    desc: "High-energy cricket-season creatives — a ‘Free IPL Ticket’ campaign that blends product, stadium and team colours into one loud, clickable frame.",
  },
  {
    id: "199402059", slug: "Credit-Card-Benefits-Creative-Post(Axis-Bank)", title: "Axis Bank — Card Benefits", client: "MyZone Credit Card",
    cat: "social", year: 2024, imgs: 1, tools: ["Photoshop"],
    desc: "A benefit-led credit card post — offer-first hierarchy and icon-driven cards that make a feature list scannable in a second.",
  },
  {
    id: "197826869", slug: "Carousel-Poster-Post-Design-for-Cookies-brand-", title: "Cookies Carousel", client: "Fruit n Nut Cookies",
    cat: "social", year: 2024, imgs: 3, tools: ["Photoshop", "Illustrator"],
    desc: "A swipeable carousel for a healthy cookies brand — warm tones, indulgent product shots and a story that unfolds slide by slide.",
  },
  {
    id: "198317843", slug: "Infographics-for-Cookies-Brand", title: "Cookies Infographics", client: "Fruit n Nut Cookies",
    cat: "social", year: 2024, imgs: 4, tools: ["Illustrator", "Photoshop"],
    desc: "Playful infographics explaining why people love the product — icons, badges and friendly type to turn benefits into shareable content.",
  },
  {
    id: "198943651", slug: "MediSyrup-Crafting-Creative-Solutions-for-Medical", title: "MediSyrup", client: "Afroliv-4G",
    cat: "social", year: 2024, imgs: 2, tools: ["Photoshop"],
    desc: "Conceptual medical advertising — a liver-tree visual metaphor that makes the benefits of a health syrup instantly memorable.",
  },
  {
    id: "199126381", slug: "AC-Creattives-For-LIQO", title: "AC Creatives for LIQO", client: "LIQO / Gree",
    cat: "social", year: 2024, imgs: 2, tools: ["Photoshop"],
    desc: "E-commerce product creatives for air conditioners — price-first layouts with marketplace cues designed for quick conversions.",
  },
  {
    id: "199125211", slug: "Thumbnail-Masterpieces-YouTube-Visuals-", title: "YouTube Thumbnails", client: "Creators",
    cat: "social", year: 2024, imgs: 1, tools: ["Photoshop"],
    desc: "Click-worthy YouTube thumbnails — big contrast, bigger type and a single idea per frame.",
  },
  {
    id: "199127241", slug: "Student-Special-Offer-Standee", title: "Student Offer Standee", client: "Retail Print",
    cat: "event", year: 2024, imgs: 1, tools: ["Photoshop"],
    desc: "A large-format print standee for a student offer — readable from across the room, with a QR-led call to action.",
  },
  {
    id: "179877497", slug: "Amazon-App-Re-Design-Case-Study", title: "Amazon App Redesign", client: "UX Case Study",
    cat: "ui", year: 2023, imgs: 1, tools: ["Figma", "Photoshop"],
    desc: "A redesign case study of the Amazon shopping app — research, pain points, user flows and a cleaner, faster interface.",
  },
  {
    id: "185600481", slug: "TASK-MASTER", title: "Task Master", client: "Productivity App",
    cat: "ui", year: 2023, imgs: 1, tools: ["Figma"],
    desc: "A to-do and productivity app — onboarding, task lists and progress screens designed around clarity and calm.",
  },
  {
    id: "186741001", slug: "Houseful-website", title: "Houseful Website", client: "Real Estate",
    cat: "ui", year: 2023, imgs: 1, tools: ["Figma"],
    desc: "A real-estate website concept — search-led hero, listing cards and a browsing flow that helps people find their future home.",
  },
  {
    id: "214857045", slug: "HRMS-(-Human-Resource-Management-System-)", title: "HRMS Website", client: "ChainCode",
    cat: "ui", year: 2024, imgs: 1, tools: ["Figma", "Photoshop"],
    desc: "Landing page for a Human Resource Management System — structured service blocks, trust stats and a clear path to demo.",
  },
  {
    id: "192526783", slug: "Vector-Art-for-Virat-Kohli", title: "Virat Kohli Vector Art", client: "Personal",
    cat: "art", year: 2023, imgs: 1, tools: ["Illustrator"],
    desc: "A bold vector portrait — flat shapes, confident line and a lot of attitude.",
  },
];

window.PROJECTS.forEach((p) => {
  p.cover = `assets/covers/${p.id}.webp`;
  p.gallery = Array.from({ length: p.imgs }, (_, i) => `assets/work/${p.id}_${i}.webp`);
  p.url = BEHANCE + p.id + "/" + p.slug;
  p.embeds = (p.videos || []).map(ccv);
});

/* ------------------------------------------------------------------
   Video work — hosted on Google Drive ("Video Editing Portfolio")
   thumbnails live in assets/reels/<id>.jpg
------------------------------------------------------------------- */
window.VIDEO_TYPES = [
  { key: "all", label: "All films" },
  { key: "event", label: "Event promos" },
  { key: "talk", label: "Talking head" },
  { key: "info", label: "Explainers" },
  { key: "behance", label: "Motion posters" },
];

window.VIDEOS = [
  { id: "1x9wFTt5aCqvvu8LnqIEUJEiJeHjoG2SB", title: "Mkushi Agri Expo", client: "Lusaka Happening", type: "event", label: "Event reel", year: 2026 },
  { id: "1qea4nGfYBpC6jo-Tq4d3vqHQO77WzNUV", title: "Mazabuka Agri Expo", client: "Lusaka Happening", type: "event", label: "Event promo", year: 2025 },
  { id: "1uMumMWsyJ51HX-b6BnhBHFb_wSLDaTHl", title: "Talking Head — Ep. 01", client: "Brandure", type: "talk", label: "Talking head", year: 2026 },
  { id: "1yf-ITz7pV7LfZQEv0wBTqxqmXmZu7qge", title: "Solwezi MMA Expo", client: "Lusaka Happening", type: "event", label: "Event reel", year: 2026 },
  { id: "1pd9wd5Cb20fFyAXG4FPU9TCHSyyATQxg", title: "MMA Expo — TV Advert", client: "Lusaka Happening", type: "event", label: "TV commercial", year: 2026, wide: true },
  { id: "1nwODYBPJoLhmhwU7N-Ql6iZO3jBYkijP", title: "Talking Head — Ep. 02", client: "Brandure", type: "talk", label: "Talking head", year: 2026 },
  { id: "1KdLO0R2urZx78bckogUdF1gjtycAEwLG", title: "Skating Classes", client: "Informative reel", type: "info", label: "Explainer", year: 2026 },
  { id: "1GjCxuyBxH7wJhYACjfaD1ctVXt5sFFhA", title: "Prarambh", client: "Event film", type: "event", label: "Event film", year: 2026 },
  { id: "160bNtnBzI8FWzUEV-9XFdQPfX02xYnwU", title: "Talking Head — Ep. 03", client: "Brandure", type: "talk", label: "Talking head", year: 2026 },
  { id: "14ahYnQaFEgAEGUYGWdE0jw3ojvzzOaKQ", title: "Lusaka Event Reel", client: "Zambia events", type: "event", label: "Event reel", year: 2025 },
  { id: "1oNaQXnO-GRK8b8BF6RT0qjhvEbBPtVqv", title: "Talking Head — Ep. 04", client: "Brandure", type: "talk", label: "Talking head", year: 2026 },
  { id: "1sTRAWrcGuR4LBJBNQN3YOlVlFNr_w6nz", title: "Talking Head — Ep. 05", client: "Brandure", type: "talk", label: "Talking head", year: 2026 },
];
window.VIDEOS.forEach((v) => {
  v.source = "drive";
  v.thumb = v.thumb || `assets/reels/${v.id}.jpg`;
  v.preview = `assets/reels/${v.id}.mp4`; // 7s muted loop cut from the original
  v.embed = `https://drive.google.com/file/d/${v.id}/preview`;
  v.url = `https://drive.google.com/file/d/${v.id}/view`;
});

// Behance-hosted clips (Adobe player). Previews + posters live in assets/motion/
[
  { id: "SVbzYf-MHBo", title: "Ladies Night — Wednesday", client: "Czardom", type: "behance", label: "Motion poster", project: "230459357" },
  { id: "VtwGTLo_2AK", title: "Ladies Night", client: "Czardom", type: "behance", label: "Motion poster", project: "230459357" },
  { id: "2CGP3bRanDn", title: "Saadgi — Live Night", client: "Czardom", type: "behance", label: "Motion poster", project: "230459357" },
  { id: "CBhGPsg-J2b", title: "Lusaka Motor Show — Promo", client: "Lusaka Happening", type: "event", label: "Event promo", project: "230459969" },
  { id: "KmwAc2HAyRD", title: "Copperbelt Motor & Mining Show", client: "Lusaka Happening", type: "event", label: "Event promo", project: "230459969" },
  { id: "EXT4i5jgFrE", title: "Mkushi Agri Expo — Teaser", client: "Lusaka Happening", type: "event", label: "Event promo", project: "230459969" },
  { id: "PsqbpHpGTpo", title: "Mkushi Agri Expo — Promo", client: "Lusaka Happening", type: "event", label: "Event promo", project: "230459969" },
].forEach((v) => {
  const p = window.PROJECTS.find((x) => x.id === v.project);
  window.VIDEOS.push({
    ...v,
    source: "behance",
    thumb: `assets/motion/${v.id}.jpg`,
    preview: `assets/motion/${v.id}.mp4`,
    embed: `https://www-ccv.adobe.io/v1/player/ccv/${v.id}/embed?api_key=behance1&bgcolor=%230c0c0e`,
    url: p ? p.url : "https://www.behance.net/rahulkanda26",
  });
});
window.DRIVE_FOLDER = "https://drive.google.com/drive/folders/1RQSSFZZNh5KsO5Wq_0aJE923z0CRwhDk";

/* ------------------------------------------------------------------
   Contact shortcuts
------------------------------------------------------------------- */
window.WHATSAPP = {
  number: "918837710867",
  text: "Hi Rahul! I saw your portfolio and I'd like to talk about a project.",
};
window.RESUME = "assets/Rahul-Kanda-Resume.pdf";

/* ------------------------------------------------------------------
   Testimonials
   ⚠ SAMPLE QUOTES — written as placeholders for the layout.
   While TESTIMONIALS_ARE_SAMPLES is true the section only shows on
   localhost, never on the live site. Replace with real client words
   (and real names/roles), then set it to false.
------------------------------------------------------------------- */
window.TESTIMONIALS_ARE_SAMPLES = true;
window.TESTIMONIALS = [
  { quote: "Rahul took our rough brief and came back with a festival look everyone instantly loved. Fast, patient with changes, and the posters worked just as well in print as on Instagram.", name: "Event organiser", role: "Festival client", color: "yellow" },
  { quote: "Our weekly offers finally look premium. He gets mood, type and food photography better than most designers we've worked with.", name: "Owner", role: "Restaurant & bar", color: "pink" },
  { quote: "The event promos he edited had real energy — tight cuts, clean titles, and always delivered on time.", name: "Marketing lead", role: "Events company", color: "lime" },
  { quote: "Clear communication, quick turnarounds and designs that actually match our brand. Easy to work with.", name: "Founder", role: "Consultancy", color: "lilac" },
];
