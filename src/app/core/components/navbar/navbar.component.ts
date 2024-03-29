import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ErrorModel} from "../../models/ErrorModel";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public keyword: string | undefined;
  public error: ErrorModel = {message: "", code: null};

  constructor(private router: Router) {
  }

  public navigateToExplorePage() {
    this.router.navigate(['/gallery/explore']).then().catch(err => {
      this.error.message = (err.message);
    });
  }

  public navigateToZkPage() {
    window.location.href = 'http://localhost:8080/index.zul';
  }

  public navigateToExplorePageWithSearch() {
    if (!this.keyword) {
      return;
    }
    this.router.navigate([`/gallery/explore`], {
      queryParams: {keyword: this.keyword},
      queryParamsHandling: "merge"
    }).then().catch(err => {
      this.error.message = err.message;
    });
  }

  public navigateToUploadPage() {
    this.router.navigate(['/gallery/upload']).then().catch(err => {
      this.error.message = (err.message);
    });
  }
}
