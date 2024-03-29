import {Component, OnInit} from '@angular/core';
import {ImageDisplayModel} from "../../../../core/models/ImageDisplayModel";
import {GalleryService} from "../../../../core/services/gallery.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiResponse} from "../../../../core/models/ApiResponse";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {FilterModel} from "../../../../core/models/FilterModel";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit {
  public keyword: string | null | undefined;
  public images: ImageDisplayModel[] | undefined;
  public page: ApiResponse | undefined;
  public filter: FilterModel | undefined;
  public pageNumber: number = 0;

  public tagString: string = "";

  public nextDisabled: boolean = false;
  public previousDisabled: boolean = true;
  public range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null)
  });
  private loading: boolean = false;

  constructor(private imageService: GalleryService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.keyword = params['keyword'];
      this.pageNumber = 0;
      this.getImages();
    })
  }

  public nextPage(): void {
    if (!this.page?.last && !this.loading) {
      ++this.pageNumber;
      this.loading = true;
      if (this.filter) {
        this.imageService.filterImages(this.pageNumber, this.filter).subscribe(
          (data: ApiResponse) => {
            this.page = data;
            this.images = data.content;
            this.previousDisabled = false;
            if (this.page.last) {
              this.previousDisabled = false;
              this.nextDisabled = true;
            }
            this.loading = false;
          }
        );
      } else if (!this.keyword) {
        this.imageService.getAllImages(this.pageNumber).subscribe(
          (data: ApiResponse) => {
            this.page = data;
            this.images = data.content;
            this.previousDisabled = false;
            if (this.page.last) {
              this.previousDisabled = false;
              this.nextDisabled = true;
            }
            this.loading = false;
          }
        );
      } else {
        this.imageService.searchImages(this.pageNumber, this.keyword).subscribe(
          (data: ApiResponse) => {
            this.page = data;
            this.images = data.content;
            this.previousDisabled = false;
            if (this.page.last) {
              this.previousDisabled = false;
              this.nextDisabled = true;
            }
            this.loading = false;
          }
        );
      }
    }
  }

  public previousPage(): void {
    if (!this.page?.first && !this.loading) {
      --this.pageNumber;
      this.loading = true;
      if (this.filter) {
        this.imageService.filterImages(this.pageNumber, this.filter).subscribe(
          (data: ApiResponse) => {
            this.page = data;
            this.images = data.content;
            this.nextDisabled = false;
            if (this.page.first) {
              this.nextDisabled = false;
              this.previousDisabled = true;
            }
            this.loading = false;
          }
        );
      } else if (!this.keyword) {
        this.imageService.getAllImages(this.pageNumber).subscribe(
          (data: ApiResponse) => {
            this.page = data;
            this.images = data.content;
            this.nextDisabled = false;
            if (this.page.first) {
              this.nextDisabled = false;
              this.previousDisabled = true;
            }
            this.loading = false;
          }
        );
      } else {
        this.imageService.searchImages(this.pageNumber, this.keyword).subscribe(
          (data: ApiResponse) => {
            this.page = data;
            this.images = data.content;
            this.nextDisabled = false;
            if (this.page.first) {
              this.nextDisabled = false;
              this.previousDisabled = true;
            }
            this.loading = false;
          }
        );
      }
    }
  }

  public redirectToView(id: number): void {
    this.router.navigate([`/gallery/view/${id}`]).then().catch(err => {
      alert(err);
    });
  }

  private getImages(): void {
    this.loading = true;
    if (!this.keyword) {
      this.imageService.getAllImages(this.pageNumber).subscribe(
        (data: ApiResponse) => {
          this.page = data;
          this.images = data.content;
          this.loading = false;
        }
      );
    } else {
      this.imageService.searchImages(this.pageNumber, this.keyword).subscribe(
        (data: ApiResponse) => {
          this.page = data;
          this.images = data.content;
          this.loading = false;
        }
      );
    }
  }

  public async filterImages(): Promise<void> {
    console.log(this.range.controls.start.value?.toJSON())
    this.loading = true;
    this.pageNumber = 0;
    let tagIds: number[] = [];

    this.filter = {tagsIds: [], dateFrom: null, dateTo: null};

    let tags: string[] = [];
    if (this.tagString !== "") {
      tags = this.tagString.split(',').map(tag => tag.trim());
    }

    for (const tag of tags) {
      try {
        const tagId = await this.imageService.getTagId(tag).toPromise();
        if (tagId != null) {
          tagIds.push(tagId);
        }
      } catch (e) {
      }
    }

    this.filter.tagsIds = tagIds;
    this.filter.dateFrom = this.range.controls.start.value;
    this.filter.dateTo = this.range.controls.end.value;

    this.imageService.filterImages(this.pageNumber, this.filter).subscribe((data: ApiResponse) => {
      this.page = data;
      this.images = data.content;
      this.loading = false;
    })
  }
}
