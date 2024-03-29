import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gallery-frontend';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('lt');
    translate.use('lt');
  }
}
