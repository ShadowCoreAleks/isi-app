import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { CREATE_USER_PARAM } from './app.constants';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: CREATE_USER_PARAM,
        loadComponent: () => import('./components/user-form/user-form.component').then(c => c.UserFormComponent)
      },
      {
        path: ':username',
        loadComponent: () => import('./components/user-form/user-form.component').then(c => c.UserFormComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
