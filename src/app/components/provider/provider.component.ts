import { ActivatedRoute, Router } from '@angular/router';
import * as Aos from 'aos';
import {
  Doctors,
  Physicians,
  ProviderDto,
} from '../../data/providers/providers';
import { Component } from '@angular/core';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css'],
})
export class ProviderComponent {
  public _providers = [...Doctors, ...Physicians];
  public _providerId!: string;

  constructor(private _activeRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    console.log(this._providers);
    this._providerId = this._activeRoute.snapshot.params['name'];
    console.log(this._providerId);

    Aos.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }

  public get providerDetail(): ProviderDto[] {
    const result = this._providers.filter(
      (d) => d.id == this._providerId ?? ''
    );
    console.log(result);
    return result;
  }

  closeModal(): void {
    this.router.navigateByUrl('/');
  }
}
