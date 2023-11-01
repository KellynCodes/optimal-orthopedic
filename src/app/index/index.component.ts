import { Physicians } from '../data/providers/providers';
import { Component } from '@angular/core';
import PureCounter from '@srexi/purecounterjs';
import * as Aos from 'aos';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  ngOnInit(): void {
    new PureCounter();

    Aos.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }
}
