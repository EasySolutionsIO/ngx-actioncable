import { NgxActionCableConfiguration } from './ngx-action-cable-configuration';
import { Injectable, Optional } from '@angular/core';
import { NgxActionCableBroadcaster } from './ngx-action-cable-broadcaster';
import * as ActionCable from 'actioncable';

@Injectable()
export class NgxActionCableService {

	cables = new Map<string, any>();
	channels = {};

	constructor(@Optional() public readonly configuration: NgxActionCableConfiguration) {

		// TODO: remove this workaround -> createWebSocketURL is undefined exception 
		// in action_cable.js
		let w: any = window;
		w.createWebSocketURL = ActionCable.createWebSocketURL;

		configuration.urls.forEach((url: string, key: string) => {
			this.connect(key, url);
		});
	}



	subscribe(key: string, channel: any, params = {}): NgxActionCableBroadcaster {
		let channelName = this.getChannelName(channel, params);

		let subscriptionParams = Object.assign({ channel: channel }, params);
		let broadcaster = new NgxActionCableBroadcaster();

		let cable = this.getCabel(key);
		let subscription = cable.subscriptions.create(subscriptionParams, {
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

	unsubscribe(key: string, channel: string, params = {}): void {
		let channelName = this.getChannelName(channel, params);

		let cable = this.getCabel(key);
		if (!this.channels[channelName]) {
			console.info(`No Subscription for Channel ${channelName} found!`);
		} else {
			let subscription = this.channels[channelName].subscription;
			cable.subscriptions.remove(subscription);
		}
	}

	perform(channel: string, params = {}, action: string, data: any): void {
		let channelName = this.getChannelName(channel, params);
		this.channels[channelName].subscription.perform(action, data);
	}

	connect(key, url: string): any {
		let cable = this.getCabel(key);
		cable = ActionCable.createConsumer(url);
		cable.connect();
		return cable;
	}

	disconnect(key: string): void {
		let cable = this.getCabel(key);
		cable.disconnect();
	}

	private getChannelName(channel: string, params = {}): string {
		let channelName = (typeof (channel) === 'object') ? channel['channel'] : channel;
		channelName += `_${JSON.stringify(params)}`; // also add params to unique channel name
		return channelName;
	}

	private getCabel(key: string): any {
		let cable = this.cables.get(key);
		if (!cable) {
			throw Error(`No cable instance for key ${key} found!`);
		}
		return cable;
	}

}
