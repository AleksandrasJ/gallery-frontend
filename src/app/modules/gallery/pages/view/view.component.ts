import {Component, OnInit} from '@angular/core';
import {GalleryService} from "../../../../core/services/gallery.service";
import {ImageModel} from "../../../../core/models/ImageModel";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeletionDialogComponent} from "../../components/deletion-dialog/deletion-dialog.component";
import {TagModel} from "../../../../core/models/TagModel";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {
  id: number | undefined;
  url: string = '';
  image: ImageModel | undefined;
  tags: TagModel[] | undefined;
  tagsStringArray: string[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private galleryService: GalleryService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.id = parseInt(<string>this.activatedRoute.snapshot.paramMap.get('id'));
    this.url = `http://localhost:8080/api/gallery/image/photo/${this.id}`;
    this.getImage(this.id);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeletionDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {id: this.id},
      closeOnNavigation: true
    });
  }

  navigateToEditPage(id: number | undefined) {
    this.router.navigate([`/gallery/edit/${id}`]).then().catch(err => {
      alert(err);
    });
  }

  getImage(id: number) {
    this.galleryService.getImageDetails(id).subscribe(
      (result: ImageModel) => {
        this.image = result;
        this.tags = result.tags;
        this.parseTags();
      }
    );
  }

  parseTags() {
    if (!this.tags) {
      return;
    }
    this.tagsStringArray = this.tags.map(tag => tag.tagName);
  }
}
