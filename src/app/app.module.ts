import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FooterComponent } from './modules/footer/footer.component';
import { MaterialModule } from './material/material.module';
import { IconsModule } from './icons/icons.module';
import { HeaderModule } from './modules/header/header.module';
import { AppRoutingModule } from './app-routing.module';
import { ScalesModule } from './components/scales/scales.module';

@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    IconsModule,
    HeaderModule,
    AppRoutingModule,
    ScalesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
