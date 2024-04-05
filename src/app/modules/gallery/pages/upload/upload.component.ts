import {Component} from '@angular/core';
import {GalleryService} from "../../../../core/services/gallery.service";
import {ImageModel} from "../../../../core/models/ImageModel";
import {TagModel} from "../../../../core/models/TagModel";
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  previewImage: string | ArrayBuffer | null | undefined;
  image: ImageModel = {
    id: null,
    imageData: null,
    imageThumbnail: null,
    name: null,
    description: null,
    uploadDate: null,
    tags: []
  };
  tags: string[] = [];
  uploadDisabled: boolean = true;
  name = new FormControl('', Validators.required);
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  selectedImage: File | undefined;

  constructor(private galleryService: GalleryService, private router: Router) {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear();
  }

  remove(tag: string) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onChange(event: any) {
    this.selectedImage = event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.previewImage = reader.result;

    reader.readAsDataURL(event.target.files[0]);

    this.uploadDisabled = false;
  }

  uploadFile() {
    if (!this.selectedImage || this.name.hasError('required')) {
      return;
    }

    this.parseTags();

    this.image.name = this.name.value;

    this.galleryService.uploadImage(this.image, this.selectedImage).subscribe(
      (response: string) => {
        this.router.navigate(['/']).then().catch(err => {
          alert(err)
        });
    });
  }

  parseTags() {
    if (!this.tags || !this.image) return;

    this.image.tags = this.tags.map(tagName => ({tagName} as TagModel));
  }
}
