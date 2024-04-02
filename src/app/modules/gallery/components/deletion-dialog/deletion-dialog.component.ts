import {Component, Inject} from '@angular/core';
import {GalleryService} from "../../../../core/services/gallery.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-deletion-dialog',
  templateUrl: './deletion-dialog.component.html',
  styleUrl: './deletion-dialog.component.css'
})
export class DeletionDialogComponent {

  constructor(private galleryService: GalleryService,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private router: Router) {
  }

  deleteImage(): void {
    this.galleryService.deleteImage(<number>this.data.id).subscribe((response: string) => {
      this.router.navigate(['/gallery/explore']).then().catch(err => {
        alert(err)
      });
    });
  }
}
