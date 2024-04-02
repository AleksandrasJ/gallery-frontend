import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ErrorModel} from "../../models/ErrorModel";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  keyword: string | undefined;
  error: ErrorModel = {message: "", code: null};

  constructor(private router: Router, private translate: TranslateService) {
    translate.setDefaultLang('lt');
  }

  switchLanguage(event: any) {
    const language = event.target.value
    this.translate.use(language);
  }

  navigateToExplorePage() {
    this.router.navigate(['/gallery/explore']).then().catch(err => {
      this.error.message = (err.message);
    });
  }

  navigateToZkPage() {
    window.location.href = 'http://localhost:8080/index.zul';
  }

  navigateToExplorePageWithSearch() {
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

  navigateToUploadPage() {
    this.router.navigate(['/gallery/upload']).then().catch(err => {
      this.error.message = (err.message);
    });
  }
}
