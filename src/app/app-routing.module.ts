import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import  {LoginComponent} from './vistas/login/login.component';
import  {NuevoComponent} from './vistas/nuevo/nuevo.component';
import  {DashboardComponent} from './vistas/dashboard/dashboard.component';
import { CovidCaseComponent } from './vistas/covid-case/covid-case.component';
import { CovidForStateComponent } from './vistas/covid-for-state/covid-for-state.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'nuevo', component:NuevoComponent},
  {path:'dashboard', component:DashboardComponent},
  {path: 'covidcase', component:CovidCaseComponent},
  {path: 'covidforstate', component:CovidForStateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,DashboardComponent,NuevoComponent,CovidCaseComponent,CovidForStateComponent]
