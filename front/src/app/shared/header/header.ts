import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  open = signal(false);
  toggle() { this.open.update(v => !v); }
  close()  { this.open.set(false); }
}
