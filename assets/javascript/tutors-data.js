/* =========================================================
   ST0501 CA2 FRONT-END WEB DEVELOPMENT
   TutorBridge Shared Tutor Data & Storage Helper
   ========================================================= */

const TUTORS_DATA = [
  {
    id: 1,
    name: "Amara Nkosi",
    subject: "Mathematics",
    level: "O/N-Level",
    country: "South Africa",
    rate: 14,
    rating: 4.9,
    reviews: 48,
    avatar: "AN",
    bio: "Specializing in E-Math and A-Math problem-solving techniques for Singapore Sec 1–5 students.",
    qualifications: "B.Sc Mathematics & Education, Cape Town. 6+ years O-Level prep experience.",
    availability: "Mon, Wed, Fri (4 PM - 9 PM SGT)"
  },
  {
    id: 2,
    name: "David Tan",
    subject: "Chemistry",
    level: "O-Level",
    country: "Malaysia",
    rate: 16,
    rating: 4.8,
    reviews: 32,
    avatar: "DT",
    bio: "Ex-MOE syllabus trained tutor focusing on organic chemistry concepts and exam paper drill.",
    qualifications: "M.Sc Chemical Engineering, University of Malaya. 8 years teaching experience.",
    availability: "Tue, Thu (5 PM - 9.30 PM SGT), Sat (All Day)"
  },
  {
    id: 3,
    name: "Priya Santos",
    subject: "English",
    level: "O/N-Level",
    country: "Philippines",
    rate: 12,
    rating: 5.0,
    reviews: 61,
    avatar: "PS",
    bio: "Helping students master essay structure, comprehension, and oral exam confidence.",
    qualifications: "First Class BA English Literature, Ateneo. Certified TESOL Educator.",
    availability: "Weekdays 3 PM - 8 PM SGT"
  },
  {
    id: 4,
    name: "Rahul Sharma",
    subject: "Physics",
    level: "O-Level",
    country: "India",
    rate: 15,
    rating: 4.9,
    reviews: 54,
    avatar: "RS",
    bio: "Simplifying mechanics, waves, and electricity through interactive virtual simulations.",
    qualifications: "B.Tech Mechanical Engineering, IIT Delhi. 5+ years SG physics tuition.",
    availability: "Sat & Sun (9 AM - 6 PM SGT)"
  },
  {
    id: 5,
    name: "Siti Rahmah",
    subject: "Biology",
    level: "O/N-Level",
    country: "Malaysia",
    rate: 13,
    rating: 4.7,
    reviews: 29,
    avatar: "SR",
    bio: "Structured cell biology and human physiology notes tailored to Cambridge GCE Syllabus.",
    qualifications: "B.Sc Biotechnology, Universiti Sains Malaysia.",
    availability: "Mon to Fri (6 PM - 9.30 PM SGT)"
  },
  {
    id: 6,
    name: "Ethan Lee",
    subject: "Mathematics",
    level: "N-Level",
    country: "Philippines",
    rate: 11,
    rating: 4.8,
    reviews: 41,
    avatar: "EL",
    bio: "Patient and encouraging foundation math specialist for Sec 1-3 students.",
    qualifications: "B.S. Math Education. Specialist in step-by-step foundation building.",
    availability: "Weekdays 4 PM - 8 PM SGT"
  }
];

// LocalStorage Helper for Shortlist Management
const ShortlistStorage = {
  KEY: "tutorbridge_shortlist",
  getIds: function () {
    const data = localStorage.getItem(this.KEY);
    return data ? JSON.parse(data) : [1, 3]; // Default demo items
  },
  add: function (id) {
    const ids = this.getIds();
    if (!ids.includes(id)) {
      ids.push(id);
      localStorage.setItem(this.KEY, JSON.stringify(ids));
    }
  },
  remove: function (id) {
    let ids = this.getIds();
    ids = ids.filter(item => item !== id);
    localStorage.setItem(this.KEY, JSON.stringify(ids));
  },
  has: function (id) {
    return this.getIds().includes(id);
  }
};
