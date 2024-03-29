import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {ExploreComponent} from './pages/explore/explore.component';
import {GalleryRoutingModule} from "./gallery-routing.module";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {ViewComponent} from './pages/view/view.component';
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";
import {DeletionDialogComponent} from './components/deletion-dialog/deletion-dialog.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {UploadComponent} from './pages/upload/upload.component';
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatChip, MatChipGrid, MatChipInput, MatChipRow, MatChipSet, MatChipsModule} from "@angular/material/chips";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {EditComponent} from './pages/edit/edit.component';
import {
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatStartDate
} from "@angular/material/datepicker";
import {ReactiveFormsModule} from "@angular/forms";
import {provideNativeDateAdapter} from "@angular/material/core";


@NgModule({
  declarations: [
    ExploreComponent,
    ViewComponent,
    DeletionDialogComponent,
    UploadComponent,
    EditComponent
  ],
  imports: [
    SharedModule,
    GalleryRoutingModule,
    MatCard,
    MatCardContent,
    MatCardImage,
    MatCardHeader,
    MatCardTitle,
    MatDivider,
    MatButton,
    MatCardFooter,
    MatCardActions,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatDatepickerModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatProgressSpinner,
    MatChipGrid,
    MatChipRow,
    MatIcon,
    MatIconModule,
    MatChipInput,
    MatChipSet,
    MatChip,
    MatChipsModule,
    MatDateRangeInput,
    MatStartDate,
    MatDatepickerToggle,
    MatDateRangePicker,
    ReactiveFormsModule
  ],
  exports: [
    ExploreComponent,
    ViewComponent,
    DeletionDialogComponent,
    EditComponent,
    UploadComponent
  ],
  providers: [provideNativeDateAdapter()]
})
export class GalleryModule {
}
