import { Component, signal } from '@angular/core';

interface Project {
  title: string;
  description: string;
  points: string[];
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
  icon: string;
  iconBg: string;
}

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  filter = signal('All');
  filters = ['All', 'Angular', '.NET', 'SQL Server', 'Azure'];

  projects: Project[] = [
    {
      title: 'CricAuction Pro',
      description: 'CricAuction Pro is a real-time sports auction platform built using Angular, ASP.NET Core, SQL Server, SignalR, Azure. It enables live bidding, team management, player registration, tournament administration, analytics, and secure role-based access.',
      points: [
        'Angular 21 frontend with lazy-loaded modules and reactive forms',
        'ASP.NET Core 10 Web API with clean architecture (Repository + Unit of Work)',
        'SQL Server with stored procedures for complex reporting',
        'JWT authentication with role-based access (Admin, Team, Player,)',
        'Real-time auction using SignalR',
      ],
      tags: ['Angular', '.NET', 'SQL Server', 'SignalR', 'JWT' ,'Azure'],
      github: 'https://github.com/Moinu8663',
      demo: 'https://auctionapp.moinuddin.sbs',
      featured: true,
      icon: '🏆',
      iconBg: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))',
    },
    {
      title: 'Inventory & POS System',
      description: 'TicTacToe Game is an interactive multiplayer game developed using modern web technologies and SignalR for real-time communication. It supports online gameplay with friends, single-player mode against the computer (AI), and offline two-player mode on the same screen. The game includes win detection, draw validation, score tracking, responsive design, and a user-friendly interface, delivering a seamless gaming experience across desktop and mobile devices.',
      points: [
        'Angular 21 frontend with lazy-loaded modules and reactive forms',
        'ASP.NET Core 10 Web API with clean architecture (Repository + Unit of Work)',
        'Real-time online game with friend using SignalR',
      ],
      tags: ['.NET', 'SQL Server', 'EF Core', 'Bootstrap'],
      github: 'https://github.com/Moinu8663',
      demo: 'https://tictactoe.moinuddin.sbs',
      featured: true,
      icon: '❌',
      iconBg: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(6,182,212,0.05))',
    },
    {
      title: '3D Developer Portfolio',
      description: 'This portfolio — built with Angular 21, Canvas 2D animations, SSR with Angular Universal, and deployed on Azure for optimal performance.',
      points: [
        'Angular 21 with standalone components and lazy loading',
        'Canvas 2D API for web developer themed animations',
        'SSR with Angular Universal for SEO and performance',
        'Angular Material with custom dark theme',
        'Deployed on Azure Static Web Apps',
      ],
      tags: ['Angular', '.NET', 'Azure'],
      github: 'https://github.com/Moinu8663',
      demo: 'https://portfolio.moinuddin.sbs',
      featured: false,
      icon: '🌐',
      iconBg: 'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(167,139,250,0.05))',
    },
  ];

  get filteredProjects() {
    if (this.filter() === 'All') return this.projects;
    return this.projects.filter(p => p.tags.includes(this.filter()));
  }
}
