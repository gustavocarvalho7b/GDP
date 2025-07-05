import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeBarComponent } from './home-bar/home-bar.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CardPublicidadeComponent } from './card-publicidade/card-publicidade.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalNovaPublicidadeComponent } from './modal-nova-publicidade/modal-nova-publicidade.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RemoverCaracteresEspeciaisPipe } from './pipes/remover-caracteres-especiais.pipe';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    AppComponent,
    HomeBarComponent,
    CardPublicidadeComponent,
    HomeComponent,
    ModalNovaPublicidadeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    DropdownModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    HttpClientModule,
    MultiSelectModule,
    InputTextModule,
    CalendarModule,
    FileUploadModule,
    FormsModule,
    BrowserAnimationsModule,
    InputTextareaModule,
  ],
  providers: [RemoverCaracteresEspeciaisPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
