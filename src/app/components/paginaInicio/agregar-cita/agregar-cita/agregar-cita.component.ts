import { Component } from '@angular/core';

@Component({
  selector: 'app-agregar-cita',
  templateUrl: './agregar-cita.component.html',
  styleUrls: ['./agregar-cita.component.scss']
})
export class AgregarCitaComponent {
  ngOnInit(): void {
    const dropdowns = document.querySelectorAll<HTMLElement>('.dropdown');

    dropdowns.forEach(dropdown => {
      const content = dropdown.querySelector('.dropdown-content') as HTMLElement;

      function positionDropdownContent() {
        const rect = dropdown.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        content.classList.toggle('above', spaceBelow < content.offsetHeight && spaceAbove >= content.offsetHeight);
      }

      dropdown.addEventListener('mouseenter', positionDropdownContent);
      dropdown.addEventListener('mouseleave', positionDropdownContent);
      window.addEventListener('resize', positionDropdownContent);

      // Initial positioning
      positionDropdownContent();
    });
  }
}
