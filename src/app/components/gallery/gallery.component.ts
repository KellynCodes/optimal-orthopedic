import { Component } from '@angular/core';
import { SwiperOptions } from 'swiper/types';

declare var GLightbox: any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  gallerySwiperConfig: SwiperOptions = {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.gallery-swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    },
  };

  private lightbox: any;

  ngAfterViewInit(): void {
    GLightbox({
      selector: '.gallery-lightbox',
    });
  }

  ngOnDestroy() {
    if (this.lightbox) {
      this.lightbox.close(); // Close the lightbox when component is destroyed
    }
  }
}
