import HabitImg from "../assets/Habit.png";
import FintracImg from "../assets/Fintrac.jpeg";
import VersionControlSystemImg from "../assets/VCS.png";

const handle = "rajamrit4a09";

export async function getCodeforcesRating() {
  const response = await fetch(
    `https://codeforces.com/api/user.info?handles=${handle}`,
  );

  const data = await response.json();

  return data.result[0];
}

export const personal = {
  name: "Amrit Raj Yadav",
  taglines: ["Web Developer", "IT Engineer", "Volleyball Player"],
  bio: `I'm a Second Year Information Technology Engineering student. I love building and trying out new things.`,
};

export const navItems = [
  { id: "hero", label: "Home", icon: "H" },
  { id: "projects", label: "Projects", icon: "P" },
  { id: "about", label: "About", icon: "A" },
  { id: "skills", label: "Skills", icon: "S" },
  { id: "contact", label: "Contact", icon: "C" },
  {
    id: "blogs",
    label: "Blogs",
    icon: "B",
    external: "https://your-blog-link.com",
  },
];

export const projects = [
  {
    id: 1,
    title: "FinTrac",
    subtitle: "Personal Finance Manager",
    screenshot: FintracImg,
    problem:
      "Managing personal finances is messy — scattered spreadsheets, no insights, and zero visibility into spending patterns.",
    approach:
      "Built a full-stack app with JWT-based auth, transaction tracking, budget categories, and Chart.js visualisations. Designed a glass-morphism dark UI with multi-currency support.",
    tech: [
      "React",
      "TypeScript",
      "Express",
      "Node.js",
      "MySQL",
      "JWT",
      "Chart.js",
    ],
    github: "https://github.com/amrit-11022007/FinanceApp",
    live: null,
  },
  {
    id: 2,
    title: "VCS",
    subtitle: "Version Control System in Python",
    screenshot: VersionControlSystemImg,
    problem:
      "Understanding Git internals by re-implementing core features from scratch — init, add, commit, log.",
    approach:
      "Used Python's os and hashlib modules to replicate Git's object model. Stored blobs, trees, and commits as hashed objects in a .myvcs directory. Planning a C++ rewrite.",
    tech: ["Python", "File I/O", "SHA-1 Hashing", "CLI"],
    github: "",
    live: null,
  },
  {
    id: 3,
    title: "Habit Tracker",
    subtitle: "An app that tracks habits",
    screenshot: HabitImg,
    problem: "People can't keep up with habits and procastinate",
    approach:
      "Used React and typescript to make a streak based app. People keep doing it because of fear of losing habits",
    tech: ["React", "TypeScript", "Tailwind"],
    github: "",
    live: null,
  },
];

export const skills = [
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Express",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "Redis",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Postman",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  },
];

export const contact = [
  {
    label: "GitHub",
    icon: "GH",
    href: "https://github.com/amrit-11022007",
    color: "#24292e",
  },
  {
    label: "LinkedIn",
    icon: "LI",
    href: "https://www.linkedin.com/in/amrit-raj-yadav-b07293378/",
    color: "#0077b5",
  },
  {
    label: "Email",
    icon: "EM",
    href: "mailto:rajamrit4a09@gmail.com",
    color: "#2979ff",
  },
  {
    label: "Instagram",
    icon: "IG",
    href: "https://www.instagram.com/a.r.yadav2007?igsh=MTBqdGppNHU0dHp0NQ==",
    color: "#e1306c",
  },
  {
    label: "Discord",
    icon: "DC",
    href: "https://discord.com/users/1269743734505865353",
    color: "#5865f2",
  },
  {
    label: "Codeforces",
    icon: "CF",
    href: `https://codeforces.com/profile/${handle}`,
    color: "#f2aa00",
  },
];

export const about = {
  education: [
    {
      degree: "B.Tech — Information Technology",
      institution: "Maharaja Agrasen Institute of Technology",
      year: "2025 - 2029",
      detail: "SGPA: 8.5 / 10",
    },
    {
      degree: "Class XII - PCM + CS",
      institution: "Ludlow Castle 4",
      year: "2024",
      detail: "Percentage: 86.6%",
    },
  ],
  achievements: [
    "Passed NDA and JEE",
    "Top 10 — College Ideathon 2026",
    "Completed React, Node.js, MySQL full-stack track",
  ],
};
