import {
  Component,
  AfterViewInit,
  OnInit,
  ElementRef,
  Renderer2,
} from '@angular/core';
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
  private dampingFactor = 0.1; // Adjust for smoothness (lower values are smoother)
  private scrollVelocity = 0;
  private animationFrameId: any;
  private scrollSensitivity = 1.5; // Adjust for sensitivity

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

  constructor(private el: ElementRef, private renderer: Renderer2) {}

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

    // Smooth scrolling behavior for desktop
    const wheelScrollHandler = (event: WheelEvent) => {
      event.preventDefault();
      this.scrollVelocity = event.deltaY * this.scrollSensitivity;
      this.animateScroll(container);
    };

    // Touch events for smooth scroll on mobile
    const touchStartHandler = (event: TouchEvent) => {
      this.isTouching = true;
      this.startY = event.touches[0].pageY;
      this.scrollLeft = container.scrollLeft;
      this.scrollVelocity = 0;
    };

    const touchMoveHandler = (event: TouchEvent) => {
      if (!this.isTouching) return;

      event.preventDefault();
      const deltaY = event.touches[0].pageY - this.startY;
      this.scrollVelocity = deltaY * this.scrollSensitivity;
      container.scrollLeft = this.scrollLeft - deltaY;
    };

    const touchEndHandler = () => {
      this.isTouching = false;
      this.animateScroll(container);
    };

    // Adding listeners for desktop and mobile
    window.addEventListener('wheel', wheelScrollHandler, { passive: false });
    container.addEventListener('touchstart', touchStartHandler, {
      passive: true,
    });
    container.addEventListener('touchmove', touchMoveHandler, {
      passive: false,
    });
    container.addEventListener('touchend', touchEndHandler);
  }

  private animateScroll(container: HTMLElement) {
    const animate = () => {
      if (Math.abs(this.scrollVelocity) > 0.5) {
        container.scrollLeft += this.scrollVelocity;
        this.scrollVelocity *= 0.95; // Friction to smooth out scroll

        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(this.animationFrameId);
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
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
