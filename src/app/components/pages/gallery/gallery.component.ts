import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  selectedimageURL: string;
  @Input() images: string[];
  constructor() {}

  ngOnInit(): void {
    if (this.havImages) {
      this.selectedimageURL = this.images[0];
    }
  }
  changeSelectedImage(imageURL: string) {
    this.selectedimageURL = imageURL;
  }
  get havImages() {
    return this.images?.length > 0;
  }
}
