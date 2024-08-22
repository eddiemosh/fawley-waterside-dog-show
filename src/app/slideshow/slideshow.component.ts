import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-slideshow',
  standalone: true,
  templateUrl: './slideshow.component.html',
  imports: [
    NgClass,
    NgForOf
  ],
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {
  images: string[] = [
    'images/dog_show.png',
    'images/image2.png',
    'images/image3.png'
  ];
  currentIndex = 0;

  constructor() { }

  ngOnInit(): void {
    this.startSlideshow();
  }

  startSlideshow(): void {
    setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  previousSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  setSlide(index: number): void {
    this.currentIndex = index;
  }
}
