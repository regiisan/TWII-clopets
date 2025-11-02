import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html'
})
export class Footer {
  year = new Date().getFullYear(); // 👈 usar esta propiedad en el HTML
}
