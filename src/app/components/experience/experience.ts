import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface WorkExperience {
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string[];
  tags: string[];
  color: string;
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  grade: string;
  icon: string;
}

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class Experience {
  activeTab: 'experience' | 'education' = 'experience';

  experiences: WorkExperience[] = [
    {
      role: 'Associate .NET Full Stack Developer',
      company: 'Tech Anand Rathi Pvt. Ltd.',
      period: 'May 2023 – April 2026',
      location: 'Jodhpur, Rajasthan, India (On-site)',
      type: 'Full-time',
      description: [
'Worked on enterprise insurance platforms including GIA and Benefit Plus for policy management, insurance comparison, and claim tracking. Key Responsibilities',
'Developed RESTful APIs using ASP.NET Core Web API for insurance policy management systems.',
'Built responsive Angular-based user interfaces for policy tracking and document management workflows.',
'Implemented Redis caching, improving API response time and reducing database load for frequently accessed data.',
'Developed backend business logic for loan-linked insurance coverage calculations based on loan amount and policy rules.',
'Integrated third-party APIs for insurance data processing and policy services.',
'Maintained high code quality by implementing unit tests using xUnit, NUnit, and Jest, improving application reliability.',
'Participated in Agile development cycles, including sprint planning, code reviews, and cross-team collaboration.',
'Troubleshot production issues and optimized backend queries to improve system performance'
      ],
      tags: ['.NET Core', 'Angular', 'SQL Server', 'EF Core', 'ADO.NET', 'Azure', 'JWT'],
      color: '#7c3aed',
    }
  ];

  education: Education[] = [
    {
      degree: 'Bachelor of Engineering ',
      institution: 'Rajasthan Technical University',
      period: '2016 – 2020',
      grade: 'First Class',
      icon: '🎓',
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Board Of Secondary Education,Rajasthan',
      period: '2014 – 2016',
      grade: 'Second',
      icon: '📚',
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Board Of Secondary Education,Rajasthan',
      period: '2014',
      grade: 'first',
      icon: '🏫',
    },
  ];

  certifications = [
    { name: 'TCS NQT - tata Consultancy Services', issuer: 'TCS', icon: '☁️', color: '#06b6d4' },
    { name: 'Foundational C# With Microsoft', issuer: 'Free Code Camp', icon: '🔷', color: '#7c3aed' },
    { name: 'TCS MAsterCraft DevPlus Scrum Managemant Edition', issuer: 'MasterCraft Academy', icon: '🔴', color: '#ef4444' },
    { name: 'Angular Material basics', issuer: 'Udemy', icon: '🗄️', color: '#f59e0b' },
  ];
}
