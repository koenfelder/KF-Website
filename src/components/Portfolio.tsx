/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Portfolio() {
  const magazineBaseUrl = localStorage.getItem('magazine_base_url') || "https://raw.githubusercontent.com/koenfelder/KF-Website/main/Untitled/images/";
  const magazineCover = `${magazineBaseUrl}${encodeURIComponent("SCM Final Version _Page_01.png")}`;

  const projects = [
    {
      title: "README Generator",
      description: "A tool to generate and preview polished GitHub profile READMEs.",
      link: "/readme",
      isInternal: true,
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
      tags: ["React", "Tailwind", "Markdown"]
    },
    {
      title: "TechNova",
      description: "A high-end retail electronics website with a focus on luxury and performance.",
      link: "https://koenfelder.github.io/TechNova-Website/",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
      tags: ["E-commerce", "UI/UX", "Responsive"]
    },
    {
      title: "Nexus CRM",
      description: "A streamlined client management system for modern creative agencies.",
      link: "/nexus",
      isInternal: true,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
      tags: ["React", "Firebase", "Analytics"]
    },
    {
      title: "SkinWalker Society Vol. 1, No. 5",
      description: "A collaborative subculture magazine exploring cryptozoology and the history of Skinwalkers.",
      link: "/magazine",
      isInternal: true,
      image: magazineCover,
      tags: ["Editorial Design", "Digital Publishing", "Collaboration"]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-brand selection:text-white">
      {/* Navigation */}
      <nav className="max-w-4xl mx-auto px-6 py-12 flex justify-between items-center">
        <Link to="/" className="group">
          <Logo className="w-10 h-10 transition-transform group-hover:scale-110" />
        </Link>
        <div className="flex gap-8 text-sm font-medium text-neutral-500">
          <a href="#work" className="hover:text-brand transition-colors">Work</a>
          <a href="#about" className="hover:text-brand transition-colors">About</a>
          <a href="#contact" className="hover:text-brand transition-colors">Contact</a>
          <Link to="/readme" className="text-brand hover:text-brand-dark font-semibold">README Tool</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 pt-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8">
            Hi there, I'm Koen Felder. <br />
            <span className="text-brand">Full Stack Web Developer.</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl leading-relaxed mb-12">
            I blend logic with strategy to build intuitive, scalable web experiences. 
            Currently focused on creating tools that empower developers and users alike.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href="mailto:koenfelder@gmail.com" 
              className="inline-flex items-center gap-2 bg-brand text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-dark transition-all active:scale-95 shadow-lg shadow-brand/20"
            >
              Get in touch <Mail className="w-4 h-4" />
            </a>
            <div className="flex items-center gap-4 px-4">
              <a href="https://github.com/koenfelder" className="text-neutral-400 hover:text-brand transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/koen-felder-59682829a" className="text-neutral-400 hover:text-brand transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Work Section */}
        <section id="work" className="mt-32">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-12">Selected Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                {project.isInternal ? (
                  <Link to={project.link} className="block">
                    <div className="aspect-video bg-neutral-100 rounded-2xl mb-6 overflow-hidden relative">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-neutral-300 group-hover:scale-110 transition-transform duration-500">
                          <Github className="w-16 h-16" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      {project.title} <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-neutral-500 mb-4">{project.description}</p>
                    <div className="flex gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-neutral-100 px-2 py-1 rounded text-neutral-600">{tag}</span>
                      ))}
                    </div>
                  </Link>
                ) : (
                  <a href={project.link} className="block">
                    <div className="aspect-video bg-neutral-100 rounded-2xl mb-6 overflow-hidden relative">
                      {project.image ? (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-neutral-300 group-hover:scale-110 transition-transform duration-500">
                          <ExternalLink className="w-16 h-16" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      {project.title} <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-neutral-500 mb-4">{project.description}</p>
                    <div className="flex gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-neutral-100 px-2 py-1 rounded text-neutral-600">{tag}</span>
                      ))}
                    </div>
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mt-32 py-24 border-t border-neutral-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">About</h2>
            <div className="md:col-span-2 space-y-6 text-lg text-neutral-600 leading-relaxed">
              <p>
                I'm a developer who loves the intersection of design and engineering. 
                I believe that the best products are built with a deep understanding of 
                both the user's needs and the underlying technology.
              </p>
              <p>
                When I'm not coding, I'm likely exploring new tech trends, 
                strategizing my next build, or finding ways to make the web a 
                more intuitive place for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mt-32 py-24 bg-brand rounded-[2rem] text-white px-8 md:px-16 overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight">Let's build something <br />together.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <p className="text-white/60 text-sm uppercase tracking-widest">Contact Details</p>
                <a href="mailto:koenfelder@gmail.com" className="block text-xl hover:text-white/80 transition-colors">koenfelder@gmail.com</a>
                <a href="tel:6027966240" className="block text-xl hover:text-white/80 transition-colors">602-796-6240</a>
              </div>
              <div className="space-y-4">
                <p className="text-white/60 text-sm uppercase tracking-widest">Socials</p>
                <div className="flex gap-6">
                  <a href="https://www.linkedin.com/in/koen-felder-59682829a" className="text-xl hover:text-white/80 transition-colors">LinkedIn</a>
                  <a href="https://github.com/koenfelder" className="text-xl hover:text-white/80 transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        </section>
      </main>

      <footer className="max-w-4xl mx-auto px-6 py-12 text-neutral-400 text-sm flex justify-between items-center border-t border-neutral-50">
        <p>© 2026 Koen Felder</p>
        <p>Built with logic & strategy</p>
      </footer>
    </div>
  );
}
