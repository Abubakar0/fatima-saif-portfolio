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

  videoPosts: VideoPost[] = [
    {
      videoLink: 'assets/vid/video-9.mp4',
      brandName: 'Paper Dope',
      description: 'Description goes here.',
      imageLink: 'assets/img/post-9.jpg',
      brandWork: 'Bags Brand',
    },
    {
      videoLink: 'assets/vid/video-1.mp4',
      brandName: 'Rapheu Store',
      description: 'Description goes here.',
      imageLink: 'assets/img/post-11.jpg',
      brandWork: 'Clothing Brand',
    },
    {
      videoLink: 'assets/vid/video-2.mp4',
      brandName: 'TV Parlour Cosmetics',
      description: 'Description goes here.',
      imageLink: 'assets/img/post-7.jpg',
      brandWork: 'Cosmetics Brand',
    },
    {
      videoLink: 'assets/vid/video-3.mp4',
      brandName: 'Sabraaapa Cosmetics',
      description: 'Description goes here.',
      imageLink: 'assets/img/post-6.jpg',
      brandWork: 'Cosmetics Brand',
    },
    {
      videoLink: 'assets/vid/video-4.mp4',
      brandName: 'Twin Tech Studio',
      description: 'Description goes here.',
      imageLink: 'assets/img/post-12.jpg',
      brandWork: 'Tech Brand',
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
    const scrollHandler = (event: WheelEvent) => {
      const container = this.el.nativeElement.querySelector('.container');
      if (container) {
        // Prevent default vertical scrolling
        event.preventDefault();

        // Scroll horizontally based on vertical scroll amount
        const scrollAmount = event.deltaY; // Get vertical scroll amount
        container.scrollLeft += scrollAmount; // Move horizontally
      }
    };

    // Add the scroll event listener manually with passive set to false
    window.addEventListener('wheel', scrollHandler, { passive: false });

    // Clean up the event listener when the component is destroyed
    return () => {
      window.removeEventListener('wheel', scrollHandler);
    };
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
