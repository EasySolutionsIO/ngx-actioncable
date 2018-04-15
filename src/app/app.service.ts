import { NgxActionCableService } from './../ngx-action-cable/ngx-action-cable.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

  constructor(private cable: NgxActionCableService) { }

  public registerChannel(channel: string, model: string) {
    let broadcaster = this.cable.subscribe(channel);

    broadcaster.on<any>(`Create${model}`).subscribe(
			message => {
				console.log('message: ', message);
			}
		);
  }


  public unregisterChannel(channel: string) {
    this.cable.unsubscribe('channel');
  }

}
