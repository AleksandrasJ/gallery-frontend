import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    FormsModule
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
