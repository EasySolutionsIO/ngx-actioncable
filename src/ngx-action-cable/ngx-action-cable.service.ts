import { NgxActionCableConfiguration } from './ngx-action-cable-configuration';
import { Injectable, Optional } from '@angular/core';
import { NgxActionCableBroadcaster } from './ngx-action-cable-broadcaster';
import * as ActionCable from 'actioncable';

@Injectable()
export class NgxActionCableService {

  public cable: any;
	public channels: any = {};

	constructor( @Optional() public readonly configuration: NgxActionCableConfiguration) {

		// TODO: remove this workaround -> createWebSocketURL is undefined exception 
		// in action_cable.js
		let w: any = window;
		w.createWebSocketURL = ActionCable.createWebSocketURL;

		this.connect(configuration.url);
	}

	subscribe(channel: any, params = {}): NgxActionCableBroadcaster {
		let channelName = (typeof (channel) === 'object') ? channel['channel'] : channel;
		let subscriptionParams = Object.assign({ channel: channel }, params);
		let broadcaster = new NgxActionCableBroadcaster();
		let subscription = this.cable.subscriptions.create(subscriptionParams, {
			received: (data) => {
				broadcaster.broadcast(data.action, data);
			}
		});


		this.channels[channelName] = {
			subscription: subscription,
			broadcaster: broadcaster
		};
		return broadcaster;
	}

	unsubscribe(channel: string): void {
		if (!this.channels[channel].subscription) {
			console.info(`No Subscription for Channel ${channel} found!`);
		} else {
			let subscription = this.channels[channel].subscription;
			this.cable.subscriptions.remove(subscription);
		}
	}

	perform(channel: string, action: string, data: any): void {
		this.channels[channel].subscription.perform(action, data);
	}

	connect(url: string): any {
		this.cable = ActionCable.createConsumer(url);
		this.cable.connect();
		return this.cable;
	}

	disconnect(): void {
		this.cable.disconnect();
	}

}
