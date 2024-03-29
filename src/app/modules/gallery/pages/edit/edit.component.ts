import {Component, OnInit} from '@angular/core';
import {ImageModel} from "../../../../core/models/ImageModel";
import {FormControl, Validators} from "@angular/forms";
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {GalleryService} from "../../../../core/services/gallery.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {TagModel} from "../../../../core/models/TagModel";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  public id: number | undefined;
  public image: ImageModel = {
    id: null,
    imageData: null,
    imageThumbnail: null,
    name: null,
    description: null,
    uploadDate: null,
    tags: []
  };
  public tags: TagModel[] | undefined;
  public tagsStringArray: string[] = [];
  public loading: boolean = true;

  public errorMessage: string = "";

  public name = new FormControl('', Validators.required);

  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;

  constructor(private activatedRoute: ActivatedRoute,
              private galleryService: GalleryService,
              private router: Router) {
  }

  ngOnInit() {
    this.id = parseInt(<string>this.activatedRoute.snapshot.paramMap.get('id'));
    this.getImage(this.id);
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tagsStringArray.push(value);
    }

    event.chipInput!.clear();
  }

  public remove(tag: string) {
    const index = this.tagsStringArray.indexOf(tag);

    if (index >= 0) {
      this.tagsStringArray.splice(index, 1);
    }
  }

  public updateImage() {
    if (this.name.hasError('required') || !this.id) {
      // TODO: Ismest pranesima
      alert("No NAME");
      return;
    }

    this.parseTagsToTagModel();

    this.image.name = this.name.value;

    this.galleryService.updateImage(this.id, this.image).subscribe(
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

  private getImage(id: number) {
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

  private parseTags() {
    if (!this.tags) {
      return;
    }
    this.tagsStringArray = this.tags.map(tag => tag.tagName);
  }

  private parseTagsToTagModel() {
    if (!this.tags || !this.image) return;

    this.image.tags = this.tagsStringArray.map(tagName => ({tagName} as TagModel));
  }
}
