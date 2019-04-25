
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxEditorModule } from 'ngx-editor';
import { MatSelectModule } from '@angular/material/select';
import { ModalModule } from 'ngx-bootstrap';
import { BlankCompComponent } from './blankComp/blankComp.component';
import { SiteCompComponent } from './siteComp/siteComp.component';
import { LogoutComponent } from './components/logout/logout.component';
import { TicketEditComponent } from './components/ticket-edit/ticket-edit.component';
import { DefinitionComponent } from './components/definition/definition.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ChartsModule } from 'ng2-charts';
import { SearchresultComponent } from './components/searchresult/searchresult.component';
import { GlobalService } from './services/global.service';
import { SearchFilterPipe } from './pipes/searchFilter.pipe';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      HeaderComponent,
      FooterComponent,
      LeftPanelComponent,
      RightPanelComponent,
      TicketDetailComponent,
      BlankCompComponent,
      SiteCompComponent,
      LogoutComponent,
      TicketEditComponent,
      DefinitionComponent,
      ReportsComponent,
      SearchresultComponent,
      SearchFilterPipe
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NgbModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      NgxEditorModule,
      MatSelectModule,
      ModalModule,
      ChartsModule
   ],
   providers: [
      GlobalService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
