import { Router } from '@angular/router';
import {
  Doctors,
  Physicians,
  ProviderDto,
} from '../../data/providers/providers';
import { Component } from '@angular/core';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css'],
})
export class ProvidersComponent {
  public providers: ProviderDto[] = Doctors;
  public physicians: ProviderDto[] = Physicians;

  constructor(private router: Router) {}

  openModal(provider: string, name: string): void {
    this.router.navigateByUrl(`/${provider}/${name}`);
  }
}
