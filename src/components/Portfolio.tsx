/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ExternalLink, ArrowRight, Instagram, Copy, Check, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Logo from './Logo';

export default function Portfolio() {
  const [copiedType, setCopiedType] = React.useState<'email' | 'phone' | null>(null);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const magazineBaseUrl = `${import.meta.env.BASE_URL}images/`;
  const magazineCover = `${magazineBaseUrl}scm-page-01.png`;

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const triggerEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = 'mailto:' + 'koen' + 'felder' + '@' + 'gmail' + '.com';
  };

  const triggerSms = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = 'sms:' + '602' + '796' + '6240';
  };

  const technovaImage = `${import.meta.env.BASE_URL}images/technova-mockup.png`;
  const skinwalkerMockup = `${import.meta.env.BASE_URL}images/skinwalker-mockup.png`;
  const headshotImage = `${import.meta.env.BASE_URL}images/headshot.jpg`;

  const projects = [
    {
      title: "TechNova",
      description: "A high-end retail electronics website with a focus on luxury and performance.",
      link: "/technova",
      isInternal: true,
      image: technovaImage,
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
      description: "A collaborative editorial project exploring cryptozoology and Navajo legends. Features interviews, cultural analysis, and field research.",
      link: "/magazine",
      isInternal: true,
      image: skinwalkerMockup,
      tags: ["Editorial", "Digital Publishing", "UX/UI Mockup"]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-brand selection:text-white">
      {/* Navigation */}
      <div className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-neutral-50/50">
        <nav className="max-w-screen-2xl mx-auto px-6 py-6 flex justify-between items-center relative">
          <Link to="/" className="group" onClick={() => setIsMenuOpen(false)}>
            <Logo className="w-10 h-10 transition-transform group-hover:scale-110" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-500">
            <a href="#work" onClick={(e) => scrollToSection(e, 'work')} className="hover:text-brand transition-colors">Work</a>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-brand transition-colors">About</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-brand transition-colors">Contact</a>
          </div>
  
          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden text-neutral-950 p-2 hover:bg-neutral-100 rounded-xl transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
  
          {/* Mobile Navigation Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-6 right-6 mt-4 bg-white border border-neutral-100 shadow-2xl rounded-3xl p-8 flex flex-col gap-6 md:hidden z-[100]"
              >
                {[
                  { name: 'Work', id: 'work' },
                  { name: 'About', id: 'about' },
                  { name: 'Contact', id: 'contact' }
                ].map((link) => (
                  <a 
                    key={link.name} 
                    href={`#${link.id}`}
                    onClick={(e) => scrollToSection(e, link.id)}
                    className="text-2xl font-bold text-neutral-900 active:text-brand transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>

      {/* Hero Section */}
      <main className="max-w-screen-2xl mx-auto px-6 pt-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-8xl font-display font-extrabold tracking-tight leading-[1.1] mb-8">
            Hi there, I'm Koen Felder. <br />
            <span className="text-brand">Full Stack Web Developer.</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl leading-relaxed mb-12">
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
              <a href="https://www.instagram.com/kdubjr/" className="text-neutral-400 hover:text-brand transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Work Section */}
        <section id="work" className="mt-32 scroll-mt-24">
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
        <section id="about" className="mt-32 py-24 border-t border-neutral-100 scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">About</h2>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-1"
            >
              <div className="relative group mx-auto max-w-[280px] md:max-w-none">
                <div className="absolute -inset-4 bg-brand/5 rounded-[2.5rem] blur-2xl group-hover:bg-brand/10 transition-all duration-500"></div>
                <img 
                  src={headshotImage} 
                  alt="Koen Felder" 
                  className="relative w-full aspect-[4/5] object-cover rounded-3xl shadow-2xl border-4 border-white ring-1 ring-neutral-100"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
 
            <div className="md:col-span-2 space-y-6 text-lg text-neutral-600 leading-relaxed pt-2">
              <p>
                Hi my name is Koen Felder, I&apos;m a full-stack developer based in Phoenix, Arizona who loves the intersection of design and engineering. 
                I believe that the best products are built with a deep understanding of both the user&apos;s needs and the underlying technology.
              </p>
              <p>
                When I&apos;m not coding, I&apos;m likely researching new tech trends, 
                strategizing my next build, or finding ways to make the web a 
                more intuitive place for everyone.
              </p>
            </div>
          </div>
        </section>
 
        {/* Contact Section */}
        <section id="contact" className="mt-32 py-24 bg-neutral-950 rounded-[3rem] text-white px-8 md:px-20 overflow-hidden relative border border-white/5 scroll-mt-24">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/20 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>
          
          <div className="relative z-10">
            <div className="max-w-3xl mb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-8xl font-display font-bold mb-8 tracking-tight leading-[1.05]"
              >
                Let's bring your <br />
                <span className="text-brand">next big idea</span> <br />
                to life.
              </motion.h2>
              <p className="text-neutral-400 text-xl md:text-2xl leading-relaxed">
                Whether you're looking to build a complex web platform or a high-converting landing page, 
                I'm here to help you strategize and execute.
              </p>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mb-32"
            >
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Subject</label>
                  <input 
                    type="text" 
                    placeholder="How can I help you?"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand/50 focus:bg-white/10 transition-all placeholder:text-white/20"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-4">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-brand/50 focus:bg-white/10 transition-all placeholder:text-white/20 resize-none"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <button className="w-full md:w-auto px-12 py-5 bg-brand text-white rounded-2xl font-bold hover:bg-brand-dark transition-all active:scale-95 shadow-xl shadow-brand/20 flex items-center justify-center gap-3 group">
                    Send Message 
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Info Footer */}
            <div className="pt-20 border-t border-white/10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <div className="space-y-10">
                  <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Contact Information</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email Card */}
                    <button 
                      onClick={triggerEmail}
                      className="group flex flex-col items-center justify-center gap-4 bg-white/5 hover:bg-white/10 transition-all p-8 rounded-3xl border border-white/5 w-full text-center active:scale-95 cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all transform group-hover:rotate-6">
                        <Mail className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-lg font-bold mb-1">Email Me</p>
                        <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors">Direct message</p>
                      </div>
                    </button>

                    {/* Phone Card */}
                    <button 
                      onClick={triggerSms}
                      className="group flex flex-col items-center justify-center gap-4 bg-white/5 hover:bg-white/10 transition-all p-8 rounded-3xl border border-white/5 w-full text-center active:scale-95 cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all transform group-hover:-rotate-6">
                        <Phone className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-lg font-bold mb-1">Text Me</p>
                        <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors">SMS / Mobile</p>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="space-y-10">
                  <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">Connect</p>
                  <div className="flex flex-wrap gap-x-12 gap-y-6">
                    {[
                      { name: 'Instagram', url: 'https://www.instagram.com/kdubjr/', icon: Instagram },
                      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/koen-felder-59682829a', icon: Linkedin },
                      { name: 'GitHub', url: 'https://github.com/koenfelder', icon: Github },
                    ].map((social) => (
                      <a 
                        key={social.name}
                        href={social.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-lg font-medium hover:text-brand transition-colors relative group py-2"
                      >
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-brand/10 transition-colors">
                          <social.icon className="w-5 h-5" />
                        </div>
                        {social.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all group-hover:w-full"></span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-screen-2xl mx-auto px-6 py-12 text-neutral-400 text-sm flex justify-between items-center border-t border-neutral-50">
        <p>© 2026 Koen Felder</p>
      </footer>
    </div>
  );
}
