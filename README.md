# NgxActioncable

## Install

```bash
npm install ngx-actioncable --save
```

Import NgxActionCableModule and also create your configuration in your app.module.ts like:
```bash
import { NgxActionCableModule, NgxActionCableConfiguration } from 'ngx-actioncable';

export function getNgxActionCableConfig(): NgxActionCableConfiguration {
  let config = new NgxActionCableConfiguration('wss://.../cable');
  return config;
}

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...,
    NgxActionCableModule.forConfig(getNgxActionCableConfig)
  ],
  providers: [
    ...
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


## Usage

Inject NgxActionCableService in your component or service like:
```bash
import { NgxActionCableBroadcaster, NgxActionCableService } from 'ngx-actioncable';
import { Component } from '@angular/core';

@Component({
    selector: 'app-example',
   templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss']
})
export class AppComponent {
    constructor(private cable: NgxActionCableService) { }
}
```

Subscribe to Channel:
```bash
register() {
    let broadcaster = this.cable.subscribe('ExampleChannel'
    broadcaster.on<any>('CreateExample').subscribe(
	message => {
	    ...
	}
    );
}
```

Unsubscribe from Channel:
```bash
unregister() {
    this.cable.unsubscribe('ExampleChannel');
}
```

## License
ngx-actioncable is released under the [MIT License](https://opensource.org/licenses/MIT). See the included LICENSE file for details.
