import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, NgZone, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements AfterViewInit, OnDestroy {
  @ViewChild('canvas3d') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private animId!: number;
  private mouse = { x: 0, y: 0 };
  private w = 0;
  private h = 0;

  // Code rain
  private drops: { x: number; y: number; speed: number; opacity: number; char: string; color: string }[] = [];
  private codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]()=>;:.#@$%^&*!?|\\~`+-_';
  private dotnetChars = ['C#', '.NET', 'SQL', 'API', 'MVC', 'EF', 'JWT', 'DI', 'OOP', 'LINQ', 'async', 'await', 'var', 'class', 'void', 'int', 'bool', 'string', 'return', 'using', 'new', 'public', 'private', 'static', 'interface', 'abstract'];

  // Floating tech nodes
  private nodes: { x: number; y: number; vx: number; vy: number; label: string; color: string; size: number; pulse: number }[] = [];

  // Particles
  private particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string; size: number }[] = [];

  // Terminal lines
  private termLines: string[] = [];
  private termIndex = 0;
  private termCharIndex = 0;
  private termTimer: ReturnType<typeof setTimeout> | null = null;
  private allTermLines = [
    '> dotnet new webapi -n MyApp',
    '> Building solution...',
    '> [OK] ASP.NET Core 8.0',
    '> [OK] Entity Framework Core',
    '> [OK] Angular 17 Frontend',
    '> [OK] SQL Server Connected',
    '> Server running on :5000',
    '> Ready for requests ✓',
  ];

  // Typewriter
  private roles = ['.NET Full Stack Developer', 'Angular Developer', 'ASP.NET Core Expert', 'C# Engineer', 'SQL Server Developer'];
  private roleIndex = 0;
  private charIndex = 0;
  private typeDir: 'type' | 'erase' = 'type';
  private typeTimer: ReturnType<typeof setTimeout> | null = null;

  private time = 0;

  constructor(private ngZone: NgZone, @Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.startTypewriter();
    // Wait until canvas has real dimensions via ResizeObserver
    const canvas = this.canvasRef.nativeElement;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
        ro.disconnect();
        this.ngZone.runOutsideAngular(() => this.init());
      }
    });
    ro.observe(canvas);
  }

  private init() {
    const canvas = this.canvasRef.nativeElement;
    this.w = canvas.offsetWidth || 520;
    this.h = canvas.offsetHeight || 460;
    canvas.width = this.w * window.devicePixelRatio;
    canvas.height = this.h * window.devicePixelRatio;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    this.buildDrops();
    this.buildNodes();
    this.startTerminal();

    window.addEventListener('mousemove', this.onMouse);
    window.addEventListener('resize', this.onResize);
    this.animate();
  }

  private buildDrops() {
    this.drops = [];
    const cols = Math.floor(this.w / 18);
    const colors = ['#7c3aed', '#06b6d4', '#a78bfa', '#10b981', '#f59e0b'];
    for (let i = 0; i < cols; i++) {
      this.drops.push({
        x: i * 18 + Math.random() * 10,
        y: Math.random() * this.h * 2 - this.h,
        speed: 0.4 + Math.random() * 1.2,
        opacity: 0.08 + Math.random() * 0.25,
        char: this.randomChar(),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }

  private buildNodes() {
    this.nodes = [];
    const techs = [
      { label: 'C#', color: '#a78bfa' },
      { label: '.NET', color: '#7c3aed' },
      { label: 'Angular', color: '#ef4444' },
      { label: 'SQL', color: '#f59e0b' },
      { label: 'Azure', color: '#06b6d4' },
      { label: 'EF Core', color: '#10b981' },
      { label: 'REST API', color: '#a78bfa' },
      { label: 'TypeScript', color: '#3b82f6' },
      { label: 'MVC', color: '#7c3aed' },
      { label: 'JWT', color: '#06b6d4' },
    ];
    for (const t of techs) {
      this.nodes.push({
        x: 60 + Math.random() * (this.w - 120),
        y: 40 + Math.random() * (this.h - 80),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        label: t.label,
        color: t.color,
        size: 28 + Math.random() * 16,
        pulse: Math.random() * Math.PI * 2,
      });
    }
  }

  private startTerminal() {
    this.termLines = [];
    this.termIndex = 0;
    this.termCharIndex = 0;
    this.typeTermChar();
  }

  private typeTermChar() {
    if (this.termIndex >= this.allTermLines.length) {
      this.termTimer = setTimeout(() => this.startTerminal(), 3000);
      return;
    }
    const line = this.allTermLines[this.termIndex];
    if (this.termCharIndex <= line.length) {
      if (this.termLines.length <= this.termIndex) this.termLines.push('');
      this.termLines[this.termIndex] = line.slice(0, this.termCharIndex);
      this.termCharIndex++;
      this.termTimer = setTimeout(() => this.typeTermChar(), 35);
    } else {
      this.termIndex++;
      this.termCharIndex = 0;
      this.termTimer = setTimeout(() => this.typeTermChar(), 200);
    }
  }

  private randomChar() {
    if (Math.random() < 0.15) return this.dotnetChars[Math.floor(Math.random() * this.dotnetChars.length)];
    return this.codeChars[Math.floor(Math.random() * this.codeChars.length)];
  }

  private animate = () => {
    this.animId = requestAnimationFrame(this.animate);
    this.time += 0.016;
    const ctx = this.ctx;
    const w = this.w;
    const h = this.h;

    // Clear with dark bg
    ctx.fillStyle = 'rgba(5, 5, 15, 0.88)';
    ctx.fillRect(0, 0, w, h);

    this.drawGrid(ctx, w, h);
    this.drawCodeRain(ctx, w, h);
    this.drawConnections(ctx);
    this.drawNodes(ctx);
    this.drawTerminal(ctx, w, h);
    this.drawParticles(ctx);
    this.spawnParticles();
  };

  private drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.04)';
    ctx.lineWidth = 0.5;
    const step = 40;
    for (let x = 0; x < w; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
  }

  private drawCodeRain(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.font = '11px JetBrains Mono, monospace';
    for (const d of this.drops) {
      ctx.globalAlpha = d.opacity;
      ctx.fillStyle = d.color;
      ctx.fillText(d.char, d.x, d.y);
      ctx.globalAlpha = d.opacity * 0.3;
      ctx.fillText(d.char, d.x, d.y - 16);
      ctx.globalAlpha = 1;

      d.y += d.speed;
      if (d.y > h + 20) {
        d.y = -20;
        d.x = Math.random() * w;
        d.char = this.randomChar();
        d.opacity = 0.08 + Math.random() * 0.25;
      }
      if (Math.random() < 0.02) d.char = this.randomChar();
    }
  }

  private drawConnections(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const a = this.nodes[i];
        const b = this.nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const alpha = (1 - dist / 160) * 0.25;
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, a.color + Math.round(alpha * 255).toString(16).padStart(2, '0'));
          grad.addColorStop(1, b.color + Math.round(alpha * 255).toString(16).padStart(2, '0'));
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
  }

  private drawNodes(ctx: CanvasRenderingContext2D) {
    for (const n of this.nodes) {
      // Move
      n.x += n.vx;
      n.y += n.vy;
      n.pulse += 0.04;

      // Mouse repel
      const dx = n.x - this.mouse.x;
      const dy = n.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        n.vx += (dx / dist) * 0.15;
        n.vy += (dy / dist) * 0.15;
      }

      // Dampen & bounce
      n.vx *= 0.98;
      n.vy *= 0.98;
      if (n.x < 40 || n.x > this.w - 40) n.vx *= -1;
      if (n.y < 20 || n.y > this.h - 20) n.vy *= -1;
      n.x = Math.max(40, Math.min(this.w - 40, n.x));
      n.y = Math.max(20, Math.min(this.h - 20, n.y));

      const pulse = 1 + Math.sin(n.pulse) * 0.12;
      const r = (n.size / 2) * pulse;

      // Outer glow
      const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 2.5);
      grd.addColorStop(0, n.color + '30');
      grd.addColorStop(1, n.color + '00');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Node circle
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = n.color + '22';
      ctx.fill();
      ctx.strokeStyle = n.color + 'cc';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label
      ctx.font = `bold ${Math.round(n.size * 0.38)}px JetBrains Mono, monospace`;
      ctx.fillStyle = n.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.label, n.x, n.y);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
    }
  }

  private drawTerminal(ctx: CanvasRenderingContext2D, w: number, h: number) {
    const tw = 260;
    const th = 180;
    const tx = w - tw - 16;
    const ty = h - th - 16;

    // Terminal bg
    ctx.fillStyle = 'rgba(5, 5, 20, 0.85)';
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.5)';
    ctx.lineWidth = 1;
    this.roundRect(ctx, tx, ty, tw, th, 8);
    ctx.fill();
    ctx.stroke();

    // Title bar
    ctx.fillStyle = 'rgba(124, 58, 237, 0.2)';
    this.roundRect(ctx, tx, ty, tw, 22, { tl: 8, tr: 8, bl: 0, br: 0 });
    ctx.fill();

    // Traffic lights
    const dotColors = ['#ef4444', '#f59e0b', '#10b981'];
    dotColors.forEach((c, i) => {
      ctx.beginPath();
      ctx.arc(tx + 12 + i * 14, ty + 11, 4, 0, Math.PI * 2);
      ctx.fillStyle = c;
      ctx.fill();
    });

    // Title
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(167, 139, 250, 0.8)';
    ctx.textAlign = 'center';
    ctx.fillText('terminal', tx + tw / 2, ty + 15);
    ctx.textAlign = 'left';

    // Lines
    ctx.font = '10px JetBrains Mono, monospace';
    const visibleLines = this.termLines.slice(-7);
    visibleLines.forEach((line, i) => {
      const isLast = i === visibleLines.length - 1;
      const isOk = line.includes('[OK]');
      const isReady = line.includes('Ready');
      ctx.fillStyle = isOk ? '#10b981' : isReady ? '#a78bfa' : line.startsWith('>') ? '#06b6d4' : '#94a3b8';
      ctx.fillText(line + (isLast ? (Math.sin(this.time * 4) > 0 ? '█' : '') : ''), tx + 10, ty + 34 + i * 20);
    });
  }

  private drawParticles(ctx: CanvasRenderingContext2D) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      if (p.life <= 0) { this.particles.splice(i, 1); continue; }
      const alpha = p.life / p.maxLife;
      ctx.globalAlpha = alpha * 0.7;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  private spawnParticles() {
    if (this.particles.length < 60 && Math.random() < 0.3) {
      const colors = ['#7c3aed', '#06b6d4', '#a78bfa', '#10b981'];
      this.particles.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        life: 80 + Math.random() * 80,
        maxLife: 160,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 1.5 + Math.random() * 2,
      });
    }
  }

  private roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number | { tl: number; tr: number; bl: number; br: number }) {
    const rad = typeof r === 'number' ? { tl: r, tr: r, bl: r, br: r } : r;
    ctx.beginPath();
    ctx.moveTo(x + rad.tl, y);
    ctx.lineTo(x + w - rad.tr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + rad.tr);
    ctx.lineTo(x + w, y + h - rad.br);
    ctx.quadraticCurveTo(x + w, y + h, x + w - rad.br, y + h);
    ctx.lineTo(x + rad.bl, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - rad.bl);
    ctx.lineTo(x, y + rad.tl);
    ctx.quadraticCurveTo(x, y, x + rad.tl, y);
    ctx.closePath();
  }

  private startTypewriter() {
    const tick = () => {
      const el = document.querySelector('.typed-role') as HTMLElement;
      if (!el) { this.typeTimer = setTimeout(tick, 100); return; }
      const current = this.roles[this.roleIndex];
      if (this.typeDir === 'type') {
        this.charIndex++;
        el.textContent = current.slice(0, this.charIndex);
        if (this.charIndex === current.length) {
          this.typeDir = 'erase';
          this.typeTimer = setTimeout(tick, 2000);
        } else {
          this.typeTimer = setTimeout(tick, 75);
        }
      } else {
        this.charIndex--;
        el.textContent = current.slice(0, this.charIndex);
        if (this.charIndex === 0) {
          this.typeDir = 'type';
          this.roleIndex = (this.roleIndex + 1) % this.roles.length;
          this.typeTimer = setTimeout(tick, 400);
        } else {
          this.typeTimer = setTimeout(tick, 35);
        }
      }
    };
    this.typeTimer = setTimeout(tick, 800);
  }

  private onMouse = (e: MouseEvent) => {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  };

  private onResize = () => {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    this.w = canvas.offsetWidth || 520;
    this.h = canvas.offsetHeight || 460;
    canvas.width = this.w * window.devicePixelRatio;
    canvas.height = this.h * window.devicePixelRatio;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    this.buildDrops();
    this.buildNodes();
  };

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.typeTimer) clearTimeout(this.typeTimer);
    if (this.termTimer) clearTimeout(this.termTimer);
    if (typeof window !== 'undefined') {
      window.removeEventListener('mousemove', this.onMouse);
      window.removeEventListener('resize', this.onResize);
    }
  }
}
