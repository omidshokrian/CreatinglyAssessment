import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-infinity-scroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infinity-scroll.component.html',
  styleUrl: './infinity-scroll.component.scss'
})

export class InfinityScrollComponent {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  posts: { item: string }[] = [];
  allPosts: { item: string }[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 10;
  threshold: number = 100;

  constructor() { }

  ngOnInit(): void {

    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    setTimeout(() => {
      for (let i = 0; i < this.pageSize; i++) {
        this.posts.push({ item: `Post ${this.posts.length + 1}` });
      }
      this.loading = false;
      this.updatePosts();
    }, 1000);
  }

  updatePosts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.allPosts = this.posts.slice(0, endIndex);
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const container = this.scrollContainer.nativeElement;
    const containerHeight = container.clientHeight;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;

    if (scrollHeight - scrollTop <= containerHeight + this.threshold && !this.loading) {
      this.currentPage++;
      this.loadPosts();
    }
  }
}
