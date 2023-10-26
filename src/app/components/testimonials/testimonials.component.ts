import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent {
  testimonialSwiperConfig: SwiperOptions = {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.testimonials-swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
    },
  };
}
