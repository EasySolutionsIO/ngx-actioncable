# NgxActioncable
Library for real-time communication over websockets with Rails ActionCable.

## Install

```bash
npm install ngx-actioncable --save
```

Import NgxActionCableModule and also create your configuration in your app.module.ts like:
```bash
import { NgxActionCableModule, NgxActionCableConfiguration } from 'ngx-actioncable';

export function getNgxActionCableConfig(): NgxActionCableConfiguration {
  let config = new NgxActionCableConfiguration('ws-id', 'wss://.../cable');
  config.addUrl('another-ws-id', 'wss://.../cable'); // optional
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
    let broadcaster = this.cable.subscribe('ws-id', 'ExampleChannel');
    broadcaster.on<any>('CreateExample').subscribe(
	message => {
	    ...
	}
    );
}
```


Subscribe to Channel with parameters:
```bash
register() {
    let params = { id: x }; // you can use any parameters you want
    let broadcaster = this.cable.subscribe('ws-id', 'ExampleChannel', params);
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
    this.cable.unsubscribe('ws-id', 'ExampleChannel');
}
```


Unsubscribe from Channel with parameters:
```bash
unregister() {
    let params = { id: x }; // use parameters of subscription
    this.cable.unsubscribe('ws-id', 'ExampleChannel', params);
}
```


## License
ngx-actioncable is released under the [MIT License](https://opensource.org/licenses/MIT). See the included LICENSE file for details.
