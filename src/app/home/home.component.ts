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

    // Add smooth scrolling behavior for initial desktop support
    this.renderer.setStyle(container, 'scroll-behavior', 'smooth');

    const startTouchHandler = (event: TouchEvent) => {
      this.isTouching = true;
      this.startY = event.touches[0].pageY;
      this.scrollLeft = container.scrollLeft;
      this.scrollVelocity = 0; // Reset scroll velocity on new touch
    };

    const moveTouchHandler = (event: TouchEvent) => {
      if (!this.isTouching) return;

      event.preventDefault();
      const deltaY = event.touches[0].pageY - this.startY;
      this.scrollVelocity = deltaY * this.dampingFactor; // Add damping effect
      container.scrollLeft = this.scrollLeft - deltaY; // Adjust the scroll position directly
    };

    const endTouchHandler = () => {
      this.isTouching = false;
      this.animateInertiaScroll(container);
    };

    container.addEventListener('touchstart', startTouchHandler, {
      passive: true,
    });
    container.addEventListener('touchmove', moveTouchHandler, {
      passive: false,
    });
    container.addEventListener('touchend', endTouchHandler);
  }

  private animateInertiaScroll(container: HTMLElement) {
    const animate = () => {
      if (Math.abs(this.scrollVelocity) > 0.5) {
        container.scrollLeft += this.scrollVelocity;
        this.scrollVelocity *= 0.95; // Apply friction to slow down scroll

        this.animationFrameId = requestAnimationFrame(animate); // Continue animation until velocity slows
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
