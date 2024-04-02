import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCard,
    MatCardContent,
    MatCardImage
  ]
})
export class SharedModule {
}
