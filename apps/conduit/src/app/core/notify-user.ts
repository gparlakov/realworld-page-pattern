import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

type CallBack = () => void;
type Reaction = CallBack | {
  title: string;
  cb: () => void;
};

export interface ActionableMessage {
  type: 'error' | 'info' | 'success';
  title: string;
  description?: string;
  primaryAction?: Reaction;
  secondaryAction?: Reaction;
}

@Injectable({ providedIn: 'root' })
export class NotifyUserAndMessages implements NotifyUser, NotificationMessages {
  _messages$ = new ReplaySubject<ActionableMessage>(1);
  messages$ = this._messages$.asObservable();

  error(
    title: string,
    description?: string,
    primaryAction?: Reaction,
    secondaryAction?: Reaction
  ) {
    this._messages$.next({
      type: 'error',
      title,
      description,
      primaryAction,
      secondaryAction,
    });
  }
  info(
    title: string,
    description?: string,
    primaryAction?: Reaction,
    secondaryAction?: Reaction
  ) {
    this._messages$.next({
      type: 'info',
      title,
      description,
      primaryAction,
      secondaryAction,
    });
  }
  success(
    title: string,
    description?: string,
    primaryAction?: Reaction,
    secondaryAction?: Reaction
  ) {
    this._messages$.next({
      type: 'success',
      title,
      description,
      primaryAction,
      secondaryAction,
    });
  }
}

@Injectable({ useExisting: NotifyUserAndMessages, providedIn: 'root' })
export abstract class NotificationMessages {
  abstract messages$: Observable<ActionableMessage>;
}

@Injectable({ useExisting: NotifyUserAndMessages, providedIn: 'root' })
export abstract class NotifyUser {
  abstract error(
    title: string,
    message?: string,
    primaryAction?: Reaction,
    secondaryAction?: Reaction
  );
  abstract info(
    title: string,
    message?: string,
    primaryAction?: Reaction,
    secondaryAction?: Reaction
  );
  abstract success(
    title: string,
    message?: string,
    primaryAction?: Reaction,
    secondaryAction?: Reaction
  );
}

function isActionable(a: ActionableMessage | Reaction): boolean {
  return a != null && 'primaryAction' in a
    ? isActionable(a.primaryAction)
    : a != null && 'secondaryAction' in a
    ? isActionable(a.secondaryAction)
    : a != null && (typeof a === 'function' || ('cb' in a && typeof a.cb === 'function'));
}

function titleOr(a: Reaction, or: string = 'Ok'): string {
  return a != null && 'title' in a ? a.title : or;
}

@Injectable({ providedIn: 'root' })
export class UglyTemporaryUserNotificationsImplementBetterOneWithAToast {
  constructor(notification: NotificationMessages) {
    // app lifetime running subscription
    notification.messages$.subscribe((m) => {
      const description = m.description || '';
      if (isActionable(m)) {
        const ok = titleOr(m.primaryAction, 'Ok');
        const response = prompt(
          `${m.type.toUpperCase()}: ${m.title} ${description}`,
          ok
        );
        if (response === ok) {
          if (isActionable(m.primaryAction)) {
            typeof m.primaryAction === 'function' ? m.primaryAction() : m.primaryAction.cb();
          }
        } else {
          if (isActionable(m.secondaryAction)) {
            typeof m.secondaryAction === 'function' ? m.secondaryAction() : m.secondaryAction.cb();
          }
        }
      } else {
        alert(`${m.type.toUpperCase()}: ${m.title} ${description}`);
      }
    });
  }
}
