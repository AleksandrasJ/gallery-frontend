import {Component} from '@angular/core';
import {GalleryService} from "../../../../core/services/gallery.service";
import {ImageModel} from "../../../../core/models/ImageModel";
import {TagModel} from "../../../../core/models/TagModel";
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent {
  public previewImage: string | ArrayBuffer | null | undefined;
  public image: ImageModel = {
    id: null,
    imageData: null,
    imageThumbnail: null,
    name: null,
    description: null,
    uploadDate: null,
    tags: []
  };
  public tags: string[] = [];
  public errorMessage: string = "";
  public uploadDisabled: boolean = true;
  public name = new FormControl('', Validators.required);
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  private selectedImage: File | undefined;

  constructor(private galleryService: GalleryService) {
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push(value);
    }

    event.chipInput!.clear();
  }

  public remove(tag: string) {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  public onChange(event: any) {
    this.selectedImage = event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.previewImage = reader.result;

    reader.readAsDataURL(event.target.files[0]);

    this.uploadDisabled = false;
  }

  public uploadFile() {
    if (!this.selectedImage || this.name.hasError('required')) {
      console.error('No file selected');
      // TODO: Ismest pranesima
      alert("No NAME No FILE");
      return;
    }

    this.parseTags();

    this.image.name = this.name.value;

    this.galleryService.uploadImage(this.image, this.selectedImage).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  public updateErrorMessage() {
    if (this.name.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else {
      this.errorMessage = '';
    }
  }

  private parseTags() {
    if (!this.tags || !this.image) return;

    this.image.tags = this.tags.map(tagName => ({tagName} as TagModel));
  }
}
