/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Search, 
  Plus, 
  MoreVertical, 
  ArrowLeft,
  LayoutDashboard,
  Settings,
  Bell,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import Logo from './Logo';

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
];

const projectStatus = [
  { name: 'Completed', value: 400, color: '#C4996B' },
  { name: 'In Progress', value: 300, color: '#E5E7EB' },
  { name: 'Delayed', value: 100, color: '#171717' },
];

const clients = [
  { id: 1, name: 'NovaTech Solutions', industry: 'Technology', status: 'Active', revenue: '$12,400' },
  { id: 2, name: 'Vanguard Group', industry: 'Finance', status: 'Pending', revenue: '$8,200' },
  { id: 3, name: 'Stratos Media', industry: 'Marketing', status: 'Active', revenue: '$15,100' },
  { id: 4, name: 'EcoFlow Systems', industry: 'Energy', status: 'Inactive', revenue: '$4,500' },
];

export default function NexusCRM() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'clients':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Client Directory</h1>
                <p className="text-neutral-500 mt-1">Manage and track your agency's client relationships.</p>
              </div>
              <button className="flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20">
                <Plus className="w-4 h-4" /> Add Client
              </button>
            </div>
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-neutral-50 text-xs font-bold uppercase tracking-wider text-neutral-400">
                      <th className="px-8 py-4">Client</th>
                      <th className="px-8 py-4">Contact</th>
                      <th className="px-8 py-4">Industry</th>
                      <th className="px-8 py-4">Revenue</th>
                      <th className="px-8 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {clients.map((client) => (
                      <tr key={client.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand/10 text-brand rounded-full flex items-center justify-center font-bold">
                              {client.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold">{client.name}</p>
                              <p className="text-xs text-neutral-400">{client.status}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-neutral-500 text-sm">contact@nexus.com</td>
                        <td className="px-8 py-6 text-neutral-500 text-sm">{client.industry}</td>
                        <td className="px-8 py-6 font-mono text-sm">{client.revenue}</td>
                        <td className="px-8 py-6 text-right">
                          <button className="p-2 text-neutral-400 hover:text-brand transition-colors"><MoreVertical className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );
      case 'projects':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Active Projects</h1>
                <p className="text-neutral-500 mt-1">Strategic tracking of ongoing agency initiatives.</p>
              </div>
              <button className="flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20">
                <Plus className="w-4 h-4" /> New Project
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Brand Refresh', client: 'NovaTech', progress: 75, deadline: 'Apr 20' },
                { name: 'E-commerce Build', client: 'Vanguard', progress: 30, deadline: 'May 12' },
                { name: 'SEO Strategy', client: 'Stratos', progress: 90, deadline: 'Apr 15' },
              ].map((project, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:border-brand/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-lg">{project.name}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-neutral-100 px-2 py-1 rounded text-neutral-500">{project.deadline}</span>
                  </div>
                  <p className="text-sm text-neutral-500 mb-6">Client: {project.client}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-neutral-400">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-brand rounded-full transition-all duration-1000" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'settings':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-neutral-500 mt-1">Configure your Nexus CRM experience.</p>
            </div>
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm divide-y divide-neutral-100">
              <div className="p-8">
                <h3 className="text-lg font-bold mb-6">Profile Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Full Name</label>
                    <input type="text" defaultValue="Koen Felder" className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-brand outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Email Address</label>
                    <input type="email" defaultValue="koenfelder@gmail.com" className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-brand outline-none" />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-lg font-bold mb-6">Agency Preferences</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-10 h-6 bg-brand rounded-full relative transition-colors">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <span className="text-neutral-600 font-medium">Enable real-time revenue alerts</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-10 h-6 bg-neutral-200 rounded-full relative transition-colors">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <span className="text-neutral-600 font-medium">Weekly strategy reports</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Welcome Section */}
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Nexus Dashboard</h1>
                <p className="text-neutral-500 mt-1">Strategic overview of your agency's performance.</p>
              </div>
              <button className="flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-neutral-800 transition-all active:scale-95">
                <Plus className="w-4 h-4" /> New Project
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-brand/10 rounded-xl text-brand"><Users className="w-6 h-6" /></div>
                  <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                </div>
                <h3 className="text-neutral-500 text-sm font-medium">Total Clients</h3>
                <p className="text-3xl font-bold mt-1">1,284</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-brand/10 rounded-xl text-brand"><Briefcase className="w-6 h-6" /></div>
                  <span className="text-xs font-bold text-brand bg-brand/5 px-2 py-1 rounded-full">Active</span>
                </div>
                <h3 className="text-neutral-500 text-sm font-medium">Active Projects</h3>
                <p className="text-3xl font-bold mt-1">42</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-brand/10 rounded-xl text-brand"><TrendingUp className="w-6 h-6" /></div>
                  <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">+24%</span>
                </div>
                <h3 className="text-neutral-500 text-sm font-medium">Monthly Revenue</h3>
                <p className="text-3xl font-bold mt-1">$64,200</p>
              </motion.div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
                <h3 className="text-lg font-bold mb-6">Revenue Growth</h3>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#a3a3a3', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a3a3a3', fontSize: 12 }} />
                      <Tooltip cursor={{ fill: '#f5f5f5' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="revenue" fill="#C4996B" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm">
                <h3 className="text-lg font-bold mb-6">Project Distribution</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={projectStatus} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {projectStatus.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3 mt-4">
                  {projectStatus.map((status) => (
                    <div key={status.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                        <span className="text-neutral-600">{status.name}</span>
                      </div>
                      <span className="font-bold">{status.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Client Table */}
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                <h3 className="text-lg font-bold">Recent Clients</h3>
                <button onClick={() => setActiveTab('clients')} className="text-sm font-semibold text-brand hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-neutral-50 text-xs font-bold uppercase tracking-wider text-neutral-400">
                      <th className="px-8 py-4">Client Name</th>
                      <th className="px-8 py-4">Industry</th>
                      <th className="px-8 py-4">Status</th>
                      <th className="px-8 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {clients.slice(0, 3).map((client) => (
                      <tr key={client.id} className="hover:bg-neutral-50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-brand/10 text-brand rounded-lg flex items-center justify-center font-bold text-xs">{client.name.charAt(0)}</div>
                            <span className="font-bold">{client.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-neutral-500 text-sm">{client.industry}</td>
                        <td className="px-8 py-6">
                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${client.status === 'Active' ? 'bg-green-50 text-green-600' : client.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-neutral-100 text-neutral-500'}`}>
                            {client.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="p-2 text-neutral-400 hover:text-brand transition-colors"><MoreVertical className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Strategy Section */}
            <div className="bg-neutral-900 rounded-3xl p-12 text-white relative overflow-hidden">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl font-bold mb-6">The Logic Behind Nexus</h2>
                <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                  Nexus isn't just a database; it's a strategic engine. We built it to automate 
                  the friction points of agency management—client onboarding, project tracking, 
                  and revenue forecasting—so you can focus on high-level strategy.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex gap-4">
                    <div className="p-2 bg-white/10 rounded-lg h-fit">
                      <CheckCircle2 className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Automated Workflows</h4>
                      <p className="text-sm text-neutral-500">Trigger actions based on client behavior and project milestones.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-2 bg-white/10 rounded-lg h-fit">
                      <Clock className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Real-time Tracking</h4>
                      <p className="text-sm text-neutral-500">Instant visibility into team bandwidth and project health.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-2 bg-white/10 rounded-lg h-fit">
                      <AlertCircle className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Risk Mitigation</h4>
                      <p className="text-sm text-neutral-500">Predictive alerts for delayed projects or declining revenue.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-2 bg-white/10 rounded-lg h-fit">
                      <TrendingUp className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Strategic Growth</h4>
                      <p className="text-sm text-neutral-500">Data-driven insights to identify your most profitable client segments.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand/20 to-transparent pointer-events-none"></div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 hidden md:flex flex-col">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-2 group">
            <Logo className="w-8 h-8 transition-transform group-hover:scale-110" />
            <span className="font-bold text-xl tracking-tight">Nexus</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'dashboard' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-neutral-500 hover:bg-neutral-100'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('clients')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'clients' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-neutral-500 hover:bg-neutral-100'}`}
          >
            <Users className="w-5 h-5" /> Clients
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'projects' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-neutral-500 hover:bg-neutral-100'}`}
          >
            <Briefcase className="w-5 h-5" /> Projects
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'settings' ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-neutral-500 hover:bg-neutral-100'}`}
          >
            <Settings className="w-5 h-5" /> Settings
          </button>
        </nav>

        <div className="p-8 border-t border-neutral-100">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-brand transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="h-20 bg-white border-b border-neutral-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search clients, projects..." 
              className="w-full pl-10 pr-4 py-2 bg-neutral-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-brand outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-neutral-400 hover:text-brand transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 bg-neutral-100 rounded-full border border-neutral-200 overflow-hidden">
              <img src="https://picsum.photos/seed/koen/100/100" alt="Avatar" referrerPolicy="no-referrer" />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
