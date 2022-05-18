import {Component, Input} from '@angular/core';
import {Account} from 'src/app/interfaces/account.interface';
import {BehaviorSubject} from 'rxjs';
import {NotificationService} from '../../modules/notification/notification.service';

@Component({
  selector: 'app-withdraw-button',
  styles: [
    'button.mat-raised-button.mat-primary {background-color: #4caf50;}'
  ],
  templateUrl: './withdraw-button.component.html'
})
export class WithdrawButtonComponent {

  constructor(private readonly notification: NotificationService) {}

  @Input() set account(value: Account){
    this._account = value;
    this.isAllowedToWithdraw(this._account);
  }

  private readonly defaultReason = 'No account provided';

  public allowedTo$ = new BehaviorSubject<{result: boolean, reason?: string}>({
    result: false, reason: this.defaultReason
  });

  private _account: Account;

  private isAllowedToWithdraw(account: Account): void {

    if(!account){
      return this.allowedTo$.next({
        result: false,
        reason: this.defaultReason
      });
    }

    const balance = +account?.balance;

    if(isNaN(balance)){
      return this.allowedTo$.next({
        result: false,
        reason: 'Could not determine balance'
      });
    }

    if(account?.account_type === 'savings' && balance <= 0){
      return this.allowedTo$.next({
        result: false,
        reason: 'Balance is too low'
      });
    }

    if(account.account_type === 'cheque' && balance < -500){
      return this.allowedTo$.next({
        result: false,
        reason: 'Balance is too low'
      });
    }

    return this.allowedTo$.next({
      result: true
    });
  }

  /**
   * I'm a fan of informing users of why an action is not allowed
   * @private
   */
  public blockAction(): void {
    const message = this.allowedTo$.value?.reason ?? 'Not allowed';
    this.notification.show(message);
  }

  public submit(): void {
    this.notification.show('Success');
  }

}
