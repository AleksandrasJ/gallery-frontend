import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RouterLink} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterLink,
    SharedModule
  ]
})
export class CoreModule {
}
