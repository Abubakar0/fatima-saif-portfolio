import { Component, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { gsap } from 'gsap';

export interface VideoPost {
  videoLink: string;
  brandName: string;
  brandWork?: string;
  description: string;
  imageLink?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  private observer: IntersectionObserver | null = null;
  private startY = 0;
  private scrollLeft = 0;
  private isTouching = false;
  private scrollSensitivity = 3; // Adjust this factor for faster scrolling

  private cleanup: () => void = () => {};

  videoPosts: VideoPost[] = [
    {
      videoLink: 'assets/vid/video-9.mp4',
      brandName: 'Paper Dope',
      description: 'Description goes here.',
      imageLink: 'assets/img/post-9.jpg',
      brandWork: 'Brand',
    },
    {
      videoLink: 'assets/vid/video-1.mp4',
      brandName: 'Rapheu Store',
      description: 'Description goes here.',
      imageLink: 'assets/img/post-11.jpg',
      brandWork: 'Brand',
    },
    {
      videoLink: 'assets/vid/video-2.mp4',
      brandName: 'TV Parlour ',
      description: 'Description goes here.',
      imageLink: 'assets/img/post-7.jpg',
      brandWork: 'Brand',
    },
    {
      videoLink: 'assets/vid/video-3.mp4',
      brandName: 'Sabraaapa ',
      description: 'Description goes here.',
      imageLink: 'assets/img/post-6.jpg',
      brandWork: 'Brand',
    },
    {
      videoLink: 'assets/vid/video-4.mp4',
      brandName: 'Twin Tech Studio',
      description: 'Description goes here.',
      imageLink: 'assets/img/post-12.jpg',
      brandWork: 'Brand',
    },
    {
      videoLink: 'assets/vid/video-5.mp4',
      brandName: 'The House Of Things',
      description: 'Description goes here.',
      imageLink: 'assets/img/post-13.jpg',
      brandWork: 'Brand',
    },
    {
      videoLink: 'assets/vid/video-6.mp4',
      brandName: ' Aromatic Bliss Studio',
      description: 'Description goes here.',
      imageLink: 'assets/img/post-5.jpg',
      brandWork: 'Brand',
    },
  ];

  constructor(private el: ElementRef) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.observeBlocks();
    this.addScrollListener();
  }

  contactMe() {
    const mailtoLink = `mailto:fatimasaifinbox@gmail.com`;
    window.location.href = mailtoLink;
  }

  private addScrollListener() {
    const container = this.el.nativeElement.querySelector('.container');

    // Handle wheel event for desktop (scrolls horizontally on vertical scroll)
    const scrollHandler = (event: WheelEvent) => {
      event.preventDefault(); // Prevent default vertical scrolling
      const scrollAmount = event.deltaY * this.scrollSensitivity; // Increase sensitivity
      container.scrollLeft += scrollAmount; // Move container horizontally
    };

    // Handle touch event for mobile (scrolls horizontally on vertical swipe)
    const touchStartHandler = (event: TouchEvent) => {
      this.isTouching = true;
      this.startY = event.touches[0].pageY;
      this.scrollLeft = container.scrollLeft;
    };

    const touchMoveHandler = (event: TouchEvent) => {
      if (!this.isTouching) return;
      const y = event.touches[0].pageY;
      const walk = (y - this.startY) * this.scrollSensitivity; // Increase sensitivity
      container.scrollLeft = this.scrollLeft - walk; // Scroll horizontally based on vertical swipe

      // Prevent default only if there's movement
      if (Math.abs(walk) > 0) {
        event.preventDefault();
      }
    };

    const touchEndHandler = () => {
      this.isTouching = false;
    };

    // Add listeners
    window.addEventListener('wheel', scrollHandler, { passive: false }); // Desktop scroll
    container.addEventListener('touchstart', touchStartHandler, {
      passive: true,
    }); // Mobile touch start
    container.addEventListener('touchmove', touchMoveHandler, {
      passive: false,
    }); // Mobile touch move
    container.addEventListener('touchend', touchEndHandler); // Mobile touch end

    // Clean up listeners when component is destroyed
    this.cleanup = () => {
      window.removeEventListener('wheel', scrollHandler);
      container.removeEventListener('touchstart', touchStartHandler);
      container.removeEventListener('touchmove', touchMoveHandler);
      container.removeEventListener('touchend', touchEndHandler);
    };
  }

  ngOnDestroy() {
    this.cleanup();
  }

  private observeBlocks() {
    const blocks = document.querySelectorAll('.block');
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.1, // Trigger when 10% of the block is visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1,
            scale: 1.05,
            duration: 0.5,
            ease: 'power1.out',
            y: 0,
          });
        } else {
          gsap.to(entry.target, {
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            ease: 'power1.out',
            y: 50,
          });
        }
      });
    }, observerOptions);

    blocks.forEach((block) => {
      if (block) {
        gsap.set(block, { opacity: 0, scale: 0.95, y: 50 });
        this.observer?.observe(block);
      }
    });
  }
}
