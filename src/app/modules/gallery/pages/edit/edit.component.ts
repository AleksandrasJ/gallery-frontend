import {Component, OnInit} from '@angular/core';
import {ImageModel} from "../../../../core/models/ImageModel";
import {FormControl, Validators} from "@angular/forms";
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {GalleryService} from "../../../../core/services/gallery.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {TagModel} from "../../../../core/models/TagModel";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  id: number | undefined;
  image: ImageModel = {
    id: null,
    imageData: null,
    imageThumbnail: null,
    name: null,
    description: null,
    uploadDate: null,
    tags: []
  };
  tags: TagModel[] | undefined;
  tagsStringArray: string[] = [];
  loading: boolean = true;

  errorMessage: string = "";

  name = new FormControl('', Validators.required);

  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;

  constructor(private activatedRoute: ActivatedRoute,
              private galleryService: GalleryService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.id = parseInt(<string>this.activatedRoute.snapshot.paramMap.get('id'));
    this.getImage(this.id);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tagsStringArray.push(value);
    }

    event.chipInput!.clear();
  }

  remove(tag: string) {
    const index = this.tagsStringArray.indexOf(tag);

    if (index >= 0) {
      this.tagsStringArray.splice(index, 1);
    }
  }

  updateImage() {
    if (this.name.hasError('required') || !this.id) {
      return;
    }

    this.parseTagsToTagModel();

    this.image.name = this.name.value;

    this.galleryService.updateImage(this.id, this.image).subscribe(
      (response: string) => {
        this.router.navigate([`/gallery/view/${this.id}`]).then().catch(err => {
          alert(err)
        });
        this.snackBar.open("Image updated successfully!", "✅",  {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 500
        });
      }
    );
  }

  updateErrorMessage() {
    if (this.name.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else {
      this.errorMessage = '';
    }
  }

  getImage(id: number) {
    this.galleryService.getImage(id).subscribe(
      (data: ImageModel) => {
        this.image = data;
        this.name.patchValue(data.name);
        this.tags = this.image.tags;
        this.parseTags();
        this.loading = false;
      }
    );
  }

  parseTags() {
    if (!this.tags) {
      return;
    }
    this.tagsStringArray = this.tags.map(tag => tag.tagName);
  }

  parseTagsToTagModel() {
    if (!this.tags || !this.image) return;

    this.image.tags = this.tagsStringArray.map(tagName => ({tagName} as TagModel));
  }
}
