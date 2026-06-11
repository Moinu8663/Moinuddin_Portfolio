import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  downloadResume() {
    const link = document.createElement('a');
    link.href = '/Moinuddin_fullstack_developer.pdf';
    link.download = 'Moinuddin_fullstack_developer.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
