import { SiteCompComponent } from './siteComp/siteComp.component';
import { BlankCompComponent } from './blankComp/blankComp.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { LogoutComponent } from './components/logout/logout.component';
import { TicketEditComponent } from './components/ticket-edit/ticket-edit.component';

const routes: Routes = [
  { 
    path: '',
    component: BlankCompComponent, 
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    ]
  },
  { 
    path: '',
    component: SiteCompComponent, 
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'ticketDetail/:id', component: TicketDetailComponent },
      { path: 'ticketEdit/:id', component: TicketEditComponent }
    ]
  }  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule
 ],
exports: [RouterModule]
})
export class AppRoutingModule { }
