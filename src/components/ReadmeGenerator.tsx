/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { Copy, Check, Github, ExternalLink, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function ReadmeGenerator() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    githubUsername: '',
    fullName: '',
    role: '',
    phone: '',
    email: '',
    linkedin: '',
    portfolio: '',
    aboutMe: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // The website URL is the root of this application
  const websiteUrl = window.location.origin;

  const readmeContent = `# Hi there, I'm ${formData.fullName || formData.githubUsername || 'Please Provide Full Name'} 👋
### 🚀 ${formData.role || 'Please Provide Professional Role'} | Tech Enthusiast | Blending Logic With Strategy to Build Intuitive, Scalable Web Experiences

About me

- ${formData.aboutMe || 'Please Provide About Me'}

### 📞 Contact Information
- **Phone:** [${formData.phone || 'Please Provide Phone Number'}](tel:${formData.phone.replace(/\D/g, '')})
- **LinkedIn:** [${formData.linkedin || 'Please Provide LinkedIn Username'}](https://linkedin.com/in/${formData.linkedin || formData.githubUsername || 'yourprofile'})
- **Website:** [Your Website](${websiteUrl})
- **Email:** [${formData.email || 'Please Provide Email Address'}](mailto:${formData.email || 'youremail@example.com'})
- **Portfolio:** [View Portfolio](${formData.portfolio || 'Please Provide Portfolio URL'})

---

### 🛠️ Tech Stack & Tools

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Nodejs](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

---

### 📊 My GitHub Stats

| **GitHub Stats** | **Most Used Languages** |
| :--- | :--- |
| ![Stats Card](https://github-readme-stats.vercel.app/api?username=${formData.githubUsername || 'github-user'}&show_icons=true&theme=radical) | ![Langs Card](https://github-readme-stats.vercel.app/api/top-langs/?username=${formData.githubUsername || 'github-user'}&layout=compact&theme=radical) |

![Streak Card](https://streak-stats.demolab.com/?user=${formData.githubUsername || 'github-user'}&theme=radical)

---

![Footer](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=60&section=footer)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(readmeContent);
    setCopied(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Editor/Controls */}
        <div className="space-y-6">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo className="w-8 h-8" />
              <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                README Generator
              </h1>
            </div>
            <Link to="/" className="flex items-center gap-1 text-sm font-medium text-neutral-500 hover:text-brand transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>
          </header>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="githubUsername" className="text-xs font-bold uppercase tracking-wider text-neutral-500">GitHub Username</label>
                <input id="githubUsername" type="text" value={formData.githubUsername} onChange={handleInputChange} placeholder="Please Provide GitHub Username" className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-brand outline-none transition-all placeholder:text-neutral-400/60" />
              </div>
              <div className="space-y-1">
                <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-neutral-500">Full Name</label>
                <input id="fullName" type="text" value={formData.fullName} onChange={handleInputChange} placeholder="Please Provide Full Name" className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-brand outline-none transition-all placeholder:text-neutral-400/60" />
              </div>
              <div className="space-y-1">
                <label htmlFor="role" className="text-xs font-bold uppercase tracking-wider text-neutral-500">Professional Role</label>
                <input id="role" type="text" value={formData.role} onChange={handleInputChange} placeholder="Please Provide Professional Role" className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-brand outline-none transition-all placeholder:text-neutral-400/60" />
              </div>
              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-neutral-500">Email Address</label>
                <input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Please Provide Email Address" className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-brand outline-none transition-all placeholder:text-neutral-400/60" />
              </div>
              <div className="space-y-1">
                <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-neutral-500">Phone Number</label>
                <input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="Please Provide Phone Number" className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-brand outline-none transition-all placeholder:text-neutral-400/60" />
              </div>
              <div className="space-y-1">
                <label htmlFor="linkedin" className="text-xs font-bold uppercase tracking-wider text-neutral-500">LinkedIn Username</label>
                <input id="linkedin" type="text" value={formData.linkedin} onChange={handleInputChange} placeholder="Please Provide LinkedIn Username" className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-brand outline-none transition-all placeholder:text-neutral-400/60" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label htmlFor="portfolio" className="text-xs font-bold uppercase tracking-wider text-neutral-500">Portfolio URL</label>
                <input id="portfolio" type="text" value={formData.portfolio} onChange={handleInputChange} placeholder="Please Provide Portfolio URL" className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-brand outline-none transition-all placeholder:text-neutral-400/60" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label htmlFor="aboutMe" className="text-xs font-bold uppercase tracking-wider text-neutral-500">About Me (Short)</label>
                <textarea id="aboutMe" value={formData.aboutMe} onChange={handleInputChange} rows={2} placeholder="Please Provide About Me" className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-brand outline-none transition-all resize-none placeholder:text-neutral-400/60" />
              </div>
            </div>

            <button
              onClick={handleCopy}
              className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                copied 
                  ? 'bg-green-500 text-white' 
                  : 'bg-brand text-white hover:bg-brand-dark'
              } shadow-xl shadow-brand/20 active:scale-[0.98]`}
            >
              {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
              {copied ? 'Copied to Clipboard!' : 'Generate & Copy README'}
            </button>
          </div>

          <div className="bg-neutral-900 rounded-xl p-6 overflow-x-auto shadow-inner max-h-[300px]">
            <h2 className="text-neutral-400 text-xs font-mono uppercase tracking-widest mb-4">Markdown Source</h2>
            <pre className="text-neutral-100 font-mono text-xs leading-relaxed whitespace-pre-wrap">
              {readmeContent}
            </pre>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-neutral-400" />
              Live Preview
            </h2>
            <span className="text-xs font-medium bg-brand/10 text-brand px-2 py-1 rounded-full uppercase">
              Left Aligned
            </span>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 min-h-[600px]">
            <div className="prose prose-neutral max-w-none markdown-body">
              <Markdown>{readmeContent}</Markdown>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .markdown-body h1 { font-size: 2.25rem; font-weight: 800; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1rem; }
        .markdown-body h3 { font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; }
        .markdown-body p { margin-bottom: 1rem; line-height: 1.6; }
        .markdown-body ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .markdown-body hr { border: 0; border-top: 1px solid #e5e7eb; margin: 2rem 0; }
        .markdown-body img { max-width: 100%; display: inline-block; margin: 0.25rem; }
        .markdown-body table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
        .markdown-body th, .markdown-body td { border: 1px solid #e5e7eb; padding: 0.75rem; text-align: left; }
        .markdown-body th { background-color: #f9fafb; }
      `}</style>
    </div>
  );
}
