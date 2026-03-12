import {
  Camera,
  Clock,
  PlaneLanding,
  PlaneTakeoff,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export const dataSite = {
  description:
    "Aviation services and curated aerial experiences for tourism destinations—scenic flights, aerial shows, and premium ground support.",
  name: "LagoPiedra",
  telephone: "+1 (555) 010-2048",
  subtitle: "Aviation services & aerial shows",
  createdAt: {
    seconds: 1769113826,
    nanoseconds: 658000000,
  },
  imagesHero: [
    "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=2000&q=80",
    "https://images.unsplash.com/photo-1522661067900-ab829854a57f?auto=format&fit=crop&w=2000&q=80",
  ],
  address: "Lago Piedra Airfield, Coastal Tourism District",
  logo: "",
  email: "hello@lagopiedra.aero",
  id: "GlJHu44uxwP97Xg8XaFu",
  products: [
    {
      id: 902184011,
      name: "Scenic Flight Tour (Coastline Loop)",
      price: 120,
      description:
        "A premium sightseeing experience designed for tourism hotspots, with flexible departure windows and curated routes.",
      image:
        "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1600&q=80",
      contentList: [
        "Route briefing and safety overview before departure.",
        "Photo-friendly flight path with altitude adjustments for the best views.",
        "Ideal for resorts, tour operators, and private groups.",
      ],
    },
    {
      id: 902184012,
      name: "Aerial Show Package (Tourism Events)",
      price: 250,
      description:
        "Coordinated aerial performances and flyovers tailored for festivals, beachfront events, and destination launches.",
      image:
        "https://images.unsplash.com/photo-1522661067900-ab829854a57f?auto=format&fit=crop&w=1600&q=80",
      contentList: [
        "Show concept design and choreography planning.",
        "Coordination with venue, local authorities, and safety teams.",
        "Optional smoke, music sync, and branded flyovers (where permitted).",
      ],
    },
    {
      id: 902184013,
      name: "Helicopter Transfer (Resort-to-Resort)",
      price: 180,
      description:
        "Fast, comfortable point-to-point transfers for guests, VIPs, and production teams.",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
      contentList: [
        "Scheduling and guest coordination with your team.",
        "Luggage guidance and streamlined check-in at departure.",
        "Suitable for destination weddings and premium tourism itineraries.",
      ],
    },
    {
      id: 902184014,
      name: "Aerial Photo & Film Support",
      price: 160,
      description:
        "Flight operations designed for content creation, including stabilized paths and timing for golden-hour capture.",
      image:
        "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1600&q=80",
      contentList: [
        "Coordination with your director/DP to match shot lists.",
        "Flexible route segments to capture multiple landmarks.",
        "Ideal for tourism boards, resorts, and brand campaigns.",
      ],
    },
    {
      id: 902184015,
      name: "Permit & Safety Coordination",
      price: 45,
      description:
        "Planning support for tourism activations, including timelines, documentation, and operational risk controls.",
      image:
        "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1600&q=80",
      contentList: [
        "Event-day coordination checklist and pre-flight briefing flow.",
        "Permit documentation assistance based on destination requirements.",
        "On-site operational coordination for timing and crowd safety.",
      ],
    },
    {
      id: 902184016,
      name: "Ground Support (Fuel, Handling & Scheduling)",
      price: 25,
      description:
        "Operational support services to keep flights on time and experiences seamless for guests and partners.",
      image:
        "https://images.unsplash.com/photo-1521727857535-28d2040c1c6e?auto=format&fit=crop&w=1600&q=80",
      contentList: [
        "Schedule coordination across multiple flight blocks.",
        "Basic ground handling coordination and turnaround planning.",
        "Guest-ready briefing and check-in support.",
      ],
    },
  ],
  services: [
    {
      id: 712304501,
      title: "Scenic Tours & Destination Flights",
      description:
        "Curated sightseeing routes designed for tourism destinations, with flexible departure windows and a guest-first experience.",
      image:
        "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1600&q=80",
      category: "Experiences",
    },
    {
      id: 712304502,
      title: "Aerial Shows, Flyovers & Event Support",
      description:
        "From brand activations to large tourism events, we plan and execute aerial performances with clear safety and timing.",
      image:
        "https://images.unsplash.com/photo-1522661067900-ab829854a57f?auto=format&fit=crop&w=1600&q=80",
      category: "Events",
    },
    {
      id: 712304503,
      title: "Helicopter Transfers & VIP Logistics",
      description:
        "Point-to-point transfers with guest coordination, on-time scheduling, and smooth arrivals at premium destinations.",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
      category: "Transfers",
    },
    {
      id: 712304504,
      title: "Aerial Photo & Film Operations",
      description:
        "Flight profiles optimized for content creation, including stabilized passes and timing aligned to your shot list.",
      image:
        "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=1600&q=80",
      category: "Production",
    },
    {
      id: 712304505,
      title: "Permits, Safety & Ground Support",
      description:
        "Operational planning and coordination support that helps tourism activations run smoothly and safely on schedule.",
      image:
        "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1600&q=80",
      category: "Operations",
    },
  ],
  shortName: "LagoPiedra",
  title: "LagoPiedra — Aviation Services & Aerial Shows",
  url: "https://lagopiedra.aero",
  iconImage: "",
  navLinks: [
    { href: "/services", label: "Services" },
    { href: "/products", label: "Experiences" },
    { href: "/case-studies", label: "Portfolio" },
  ],
};

export const testimonials = [
  {
    name: "James Wilson",
    role: "Resort Operations Lead",
    content:
      "LagoPiedra delivered a flawless guest experience—professional crew, perfect timing, and unforgettable views.",
    rating: 5,
    company: "Seabreeze Resort Group",
  },
  {
    name: "Emily Chen",
    role: "Event Producer",
    content:
      "The aerial show was the highlight of our festival weekend. Coordination and safety were exceptional.",
    rating: 5,
    company: "Harbor Lights Festival",
  },
  {
    name: "Michael Ross",
    role: "Tourism Board Director",
    content:
      "From permits to execution, LagoPiedra made our destination campaign look world-class from the air.",
    rating: 5,
    company: "Coastal Tourism Council",
  },
];

export const caseStudies = [
  {
    title: "Coastal Air Show Weekend",
    description:
      "A multi-act aerial showcase designed for a beachfront tourism festival with tight timing and premium crowd visibility.",
    icon: PlaneTakeoff,
    results: [
      { label: "Spectators", value: "18k" },
      { label: "Acts", value: "6" },
      { label: "Incidents", value: "0" },
    ],
  },
  {
    title: "Island Resort Helicopter Transfers",
    description:
      "Reliable point-to-point transfers for VIP guests and production crews across multiple properties.",
    icon: PlaneLanding,
    results: [
      { label: "Flights", value: "220" },
      { label: "Avg ETA", value: "12 min" },
      { label: "On-time", value: "99%" },
    ],
  },
  {
    title: "Cinematic Aerial Filming Support",
    description:
      "Flight operations optimized for landmark reveals, stabilized passes, and golden-hour capture.",
    icon: Camera,
    results: [
      { label: "Flight Hours", value: "42" },
      { label: "Locations", value: "9" },
      { label: "Permits", value: "Approved" },
    ],
  },
];

export const features = [
  {
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Clear operational controls, briefings, and coordination to keep guests and crews safe.",
    image: "",
  },
  {
    icon: Users,
    title: "Destination-Ready Teams",
    description:
      "Experienced crews who understand tourism timelines, guest experience, and event-day execution.",
    image: "",
  },
  {
    icon: Sparkles,
    title: "Show & Experience Design",
    description:
      "From scenic route curation to aerial show choreography, we craft moments people remember.",
    image: "",
  },
  {
    icon: Clock,
    title: "On-Time Operations",
    description:
      "Tight scheduling and reliable coordination for multi-flight days and high-visibility events.",
    image: "",
  },
];
