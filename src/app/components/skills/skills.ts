import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills {
  techSkills = [
    { name: 'Angular / TypeScript / JavaScript / NgRx / RxJS / Unit Test', level: 88, color: 'linear-gradient(90deg, #7c3aed, #a78bfa)' },
    { name: 'ASP.NET Core / C# / ADO.NET / Dependency Injection /  JWT Authentication / Xunit', level: 90, color: 'linear-gradient(90deg, #0369a1, #38bdf8)' },
    { name: 'SQL Server / EF Core / LINQ / Redis Cache', level: 85, color: 'linear-gradient(90deg, #d97706, #f59e0b)' },
    { name: 'REST API / Web API', level: 88, color: 'linear-gradient(90deg, #059669, #10b981)' },
    { name: 'Azure / Cloud Services', level: 72, color: 'linear-gradient(90deg, #0284c7, #06b6d4)' },
    { name: 'HTML / CSS / Bootstrap / Angular Material', level: 85, color: 'linear-gradient(90deg, #b45309, #fbbf24)' },
    { name: 'Agile / Scrum / SDLC / Code Review / SonarQube', level: 88, color: 'linear-gradient(90deg, #7c3aed, #a78bfa)' },

  ];

  tools = [
    { name: 'Visual Studio', icon: '💻' },
    { name: 'VS Code', icon: '🖊️' },
    { name: 'Git / GitHub', icon: '🔀' },
    { name: 'SQL Server SSMS', icon: '🗄️' },
    { name: 'Postman', icon: '📡' },
    { name: 'Azure DevOps', icon: '⚙️' },
    { name: 'IIS / Windows Server', icon: '🖥️' },
    { name: 'Swagger / OpenAPI', icon: '📄' },
    { name: 'LINQ / Lambda', icon: '🔗' },
    { name: 'SignalR', icon: '⚡' },
  ];

  stats = [
    { value: '3', label: 'Years Exp.' },
    { value: '15+', label: 'Projects' },
    // { value: '10+', label: 'Clients' },
    { value: '100%', label: 'Dedication' },
  ];
}
