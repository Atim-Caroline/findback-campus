export const ugandaUniversities = [
  "Makerere University (MAK)",
  "Kyambogo University (KYU)",
  "Mbarara University of Science and Technology (MUST)",
  "Gulu University",
  "Busitema University",
  "Muni University",
  "Kabale University",
  "Lira University",
  "Soroti University",
  "Uganda Christian University (UCU)",
  "Uganda Martyrs University (UMU)",
  "Islamic University in Uganda (IUIU)",
  "Kampala International University (KIU)",
  "Ndejje University",
  "Bugema University",
  "Nkumba University",
  "Kumi University",
  "Bishop Stuart University",
  "Mountains of the Moon University",
  "All Saints University Lango",
  "Ankole Western University",
  "Ibanda University",
  "Metropolitan International University",
  "Valley University of Science and Technology",
  "Victoria University Kampala",
  "Cavendish University Uganda",
  "International University of East Africa (IUEA)",
  "St. Lawrence University",
  "ISBAT University",
  "Clarke International University",
  "Kampala University",
  "Team University",
  "UTAMU (Uganda Technology and Management University)",
];

export const universityDepartments = [
  "Faculty of Arts and Social Sciences",
  "Faculty of Science",
  "Faculty of Education",
  "Faculty of Engineering",
  "Faculty of Medicine / Health Sciences",
  "Faculty of Business and Management",
  "Faculty of Computing and Information Technology",
  "Faculty of Law",
  "Faculty of Agriculture",
  "School of Psychology",
  "School of Statistics and Planning",
  "Department of Veterinary Medicine",
];

export interface LocationCategory {
  category: string;
  locations: string[];
}

export const universityLocations: LocationCategory[] = [
  {
    category: "Academic & Research",
    locations: [
      "University Library",
      "Lecture Halls",
      "Science Laboratories",
      "Computer Labs",
      "Conference Hall",
      "Research Centers",
    ],
  },
  {
    category: "Administrative & Support",
    locations: [
      "Administration Block",
      "Senate Building",
      "Finance Office",
      "Registry Office",
      "Human Resources",
      "IT Support Desk",
    ],
  },
  {
    category: "Residential & Hostels",
    locations: [
      "Main Campus Hostels",
      "Kiganda Campus Hostels",
      "North Hall",
      "South Hall",
      "Off-Campus Accommodations",
      "Guest House",
    ],
  },
  {
    category: "Social & Common Areas",
    locations: [
      "Student Center",
      "Guild Canteen",
      "Sports Grounds",
      "Main Square / Green Area",
      "University Mosque/Chapel",
      "Medical School Campus",
    ],
  },
  {
    category: "Campus Perimeter & Entrances",
    locations: [
      "Main Gate",
      "Small Gate",
      "Parking Lots",
      "University Perimeter Road",
      "Bus Stop / Taxi Stage",
    ],
  },
];
