import { NgxActionCableConfiguration } from './../ngx-action-cable/ngx-action-cable-configuration';
import { NgxActionCableModule } from './../ngx-action-cable/ngx-action-cable.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

export function getNgxActionCableConfig(): NgxActionCableConfiguration {
  let config = new NgxActionCableConfiguration('wss://.../cable');
  return config;
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxActionCableModule.forConfig(getNgxActionCableConfig)
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
