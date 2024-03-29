import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExploreComponent} from "./pages/explore/explore.component";
import {ViewComponent} from "./pages/view/view.component";
import {UploadComponent} from "./pages/upload/upload.component";
import {EditComponent} from "./pages/edit/edit.component";


const routes: Routes = [
  {
    path: 'explore',
    component: ExploreComponent
  },
  {
    path: 'view/:id',
    component: ViewComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule {
}
