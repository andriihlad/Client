import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from '../models/alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<Alert>();
    private defaultId = 'default-alert';

    onAlert(id = this.defaultId): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    success(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType[0], message }));
    }

    error(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType[1], message }));
    }

    info(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType[2], message }));
    }

    warn(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType[3], message }));
    }
  
    alert(alert: Alert) {
        
        alert.id = alert.id || this.defaultId;
        this.subject.next(alert);
    }

    clear(id = this.defaultId) {
        this.subject.next(new Alert({ id }));
    }
}