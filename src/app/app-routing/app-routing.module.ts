import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { CarsModelSelector } from '../components/pages/cars-model-selector/cars-model-selector';
import { AuthGuard } from '../guards/auth.guard';
import { AboutPageComponent } from '../components/pages/about-page/about-page.component';
import { PageTemplateComponent } from '../components/templates/page-template/page-template.component';
import { PageNotFoundComponent } from '../components/pages/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: 'login',
        component: PageTemplateComponent,
        children: [{path: '**', component: LoginComponent}]
    },
    {
        path: 'model-selector',
        component: PageTemplateComponent,
        canActivate: [AuthGuard],
        children: [{path: '**', component: CarsModelSelector}]
    },
    {
        path: 'about',
        component: PageTemplateComponent,
        canActivate: [AuthGuard],
        children: [{path: '**', component: AboutPageComponent}]
    },
    { path: '',   redirectTo: '/about', pathMatch: 'full' },
    {
        path: '**',
        component: PageTemplateComponent,
        canActivate: [AuthGuard],
        children: [{path: '**', component: PageNotFoundComponent}]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
