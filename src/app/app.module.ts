import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule ,routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadersComponent } from './plantillas/headers/headers.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS,HttpInterceptor} from '@angular/common/http'
import { ApiInterceptor } from './servicios/api/api.service';
import { ApiService } from './servicios/api/api.service';




@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    FooterComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
