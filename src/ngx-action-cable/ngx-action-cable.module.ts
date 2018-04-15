import { NgxActionCableConfiguration } from './ngx-action-cable-configuration';
import { NgxActionCableService } from './ngx-action-cable.service';
import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
  imports: [ ],
  providers: [
    NgxActionCableService
  ]
})
export class NgxActionCableModule {
	public static forConfig(configurationFactory: () => NgxActionCableConfiguration): ModuleWithProviders {
		return {
			ngModule: NgxActionCableModule,
			providers: [{ provide: NgxActionCableConfiguration, useFactory: configurationFactory }]
		};
	}
}
