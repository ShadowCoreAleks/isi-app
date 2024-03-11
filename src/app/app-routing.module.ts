import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    {
      path: ':userId',
      loadComponent: () => import('./components/user-form/user-form.component').then(c => c.UserFormComponent)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
