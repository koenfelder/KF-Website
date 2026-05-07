/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CaseStudyContent {
  title: string;
  subtitle: string;
  overview: string;
  objective: string;
  process: string[];
  results: string[];
}

export const CASE_STUDIES: Record<string, CaseStudyContent> = {
  technova: {
    title: "TechNova Luxury Electronics Analysis",
    subtitle: "Project Overview",
    overview: "This project represents a comprehensive e commerce solution engineered for high end consumer electronics, prioritizing brand authority and technical precision throughout the user journey.",
    objective: "The primary objective was to engineer a \"Trust First\" digital architecture for TechNova. This required a sophisticated balance between technical complexity and user experience. I focused on providing detailed specifications for premium hardware while maintaining a polished high end interface designed to convert discerning consumers in a highly competitive market.",
    process: [
      "I engineered a robust clean architecture utilizing HTML5 and CSS3 while strategically implementing CSS Grid for complex layouts and Flexbox for modular component alignment.",
      "I optimized the asset management pipeline through SVG integration and high bitrate responsive imaging to ensure a premium visual experience without compromising site performance.",
      "I audited the site's mobile ergonomics to refine touch target fidelity and ensure the multi layered filter systems and slide out shopping cart interfaces are fully accessible."
    ],
    results: [
      "Interactive Product Carousel",
      "Integrated Shopping Cart",
      "Dark/Light Mode Systems",
      "Mobile-Responsive Design",
      "Interactive Guessing Game",
      "Direct Contact Infrastructure"
    ]
  },
  magazine: {
    title: "SkinWalker Society Vol 1, No. 5: Subculture Editorial Analysis",
    subtitle: "Editorial Project",
    overview: "A collaborative interactive magazine engineered to explore and archive the cultural significance of Navajo legends within modern cryptozoology.",
    objective: "The objective was to collaboratively engineer a niche subculture publication exploring the intersection of traditional Navajo folklore and modern cryptozoology. The primary goal was to bridge the significant cultural divide between mainstream American narratives and Indigenous traditions through authentic storytelling, historical context, and investigative art.",
    process: [
      "Mapped out an extensive content aggregation phase which included gathering oral histories, Navajo ideologies, and modern cryptozoological data from diverse media streams.",
      "The team immersed itself in traditional folklore to ensure the layout and editorial direction respected old Navajo traditions and ideologies during the design phase.",
      "Focused on building a high fidelity digital reader that captures the niche subculture of Skinwalkers, providing users with a guide to understanding the unknown through an interactive format."
    ],
    results: [
      "Commercial Print Asset",
      "High Definition Page Archive",
      "Commercialized Magazine",
      "Cultural Metadata Integration",
      "Navajo Folklore Documentation",
      "Cryptozoology Resource Guide"
    ]
  },
  lumina: {
    title: "Lumina Architects: Single Page Architectural Experience",
    subtitle: "Full Stack Frontend Development",
    overview: "A high performance single page architectural portfolio designed to meet rigorous academic and professional technical standards, featuring advanced JavaScript integrations and semantic architecture.",
    objective: "The objective was to engineer a professional, standalone single page website that validates to industry standards. The project required the implementation of semantic HTML, error free CSS, and a specialized JavaScript suite including jQuery widgets, AJAX API integrations, Web Storage systems, and interactive slideshow components.",
    process: [
      "I constructed the foundation using semantic HTML5 and validated CSS3, ensuring the layout remained optimized for a 1280px viewport while maintaining high accessibility standards.",
      "I integrated a jQuery based UI framework to manage complex interactive components such as accordion style project details and dynamic tabbed navigation.",
      "I engineered an asynchronous content pipeline using AJAX to fetch architectural project data from a custom JSON API, allowing for modular content updates without page reloads.",
      "I implemented a persistent user experience layer using Web Storage to track visitor preferences and custom form data, ensuring state retention across sessions.",
      "I developed a custom JavaScript carousel using a lightweight library to showcase high resolution architectural photography with smooth transition logic."
    ],
    results: [
      "Single Page Portfolio Architecture",
      "jQuery Accordion Integration",
      "AJAX Powered Content Loading",
      "localStorage Data Persistence",
      "Dynamic Image Carousel",
      "Validated HTML & CSS Suite"
    ]
  }
};
