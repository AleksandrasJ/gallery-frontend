import {Component, OnInit} from '@angular/core';
import {ImageDisplayModel} from "../../../../core/models/ImageDisplayModel";
import {GalleryService} from "../../../../core/services/gallery.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiResponse} from "../../../../core/models/ApiResponse";
import {FormControl, FormGroup} from "@angular/forms";
import {FilterModel} from "../../../../core/models/FilterModel";
import {Observable} from "rxjs";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit {
  keyword: string | null | undefined;
  images: ImageDisplayModel[] | undefined;
  page: ApiResponse | undefined;
  filter: FilterModel | undefined;
  pageNumber: number = 0;
  totalElements: number | undefined;

  tagString: string = "";

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null)
  });

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

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  redirectToView(id: number): void {
    this.router.navigate([`/gallery/view/${id}`]).then().catch(err => {
      alert(err);
    });
  }

  async filterImages(): Promise<void> {
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
      this.totalElements = data.totalElements;
    });
  }

  getImages(): void {
    let serviceCall: Observable<ApiResponse>;

    if (!this.keyword) {
      serviceCall = this.imageService.getAllImages(this.pageNumber);
    } else {
      serviceCall = this.imageService.searchImages(this.pageNumber, this.keyword);
    }

    serviceCall.subscribe(
      (data: ApiResponse) => {
        this.page = data;
        this.images = data.content;
        this.totalElements = data.totalElements;
      }
    );
  }

  changePage(event: PageEvent) {
    this.pageNumber = event.pageIndex;

    let serviceCall: Observable<ApiResponse>;

    if (this.filter) {
      serviceCall = this.imageService.filterImages(this.pageNumber, this.filter);
    } else if (!this.keyword) {
      serviceCall = this.imageService.getAllImages(this.pageNumber);
    } else {
      serviceCall = this.imageService.searchImages(this.pageNumber, this.keyword);
    }

    serviceCall.subscribe(
      (data: ApiResponse) => {
        this.page = data;
        this.images = data.content;
        this.scrollToTop();
      }
    );
  }
}
