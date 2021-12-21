import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SchedulesModule } from './pages/schedules/schedules.module';
import { CardComponent } from './components/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskModule, IConfig } from 'ngx-mask'

export const options: Partial<IConfig> | null | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SchedulesModule,
    MatCardModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
