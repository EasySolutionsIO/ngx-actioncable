import { Observable, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

interface BroadcastEvent {
  key: any;
  data?: any;
}

export class NgxActionCableBroadcaster {
  private _eventBus = new Subject<BroadcastEvent>();

  broadcast(key: any, data?: any) {
    this._eventBus.next({key, data});
  }

  on<T>(key: any): Observable<T> {
    return this._eventBus.asObservable()
      .pipe(
        filter(event => event.key === key),
        map(event => <T>event.data)
      );
  }
}
