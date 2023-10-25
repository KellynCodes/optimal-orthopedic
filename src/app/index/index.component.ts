import { Component, ElementRef, ViewChild } from '@angular/core';
import { SwiperContainer } from 'swiper/element';

import PureCounter from '@srexi/purecounterjs';
import * as Aos from 'aos';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent {
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>;

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
