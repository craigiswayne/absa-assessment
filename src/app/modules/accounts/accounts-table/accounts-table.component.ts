import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {BehaviorSubject, merge, of as observableOf} from 'rxjs';
import {catchError, delay, map, startWith, switchMap, tap} from 'rxjs/operators';
import {Account} from 'src/app/interfaces/account.interface';
import {AccountsService} from 'src/app/services/accounts/accounts.service';

@Component({
  selector: 'app-accounts-table',
  templateUrl: './accounts-table.component.html',
  styleUrls: ['./accounts-table.component.scss']
})
export class AccountsTableComponent implements AfterViewInit, OnDestroy {

  public columnsToShow: string[] = ['number', 'account_number', 'account_type', 'balance', 'cta'];
  public data: Account[] = [];
  public total$ = new BehaviorSubject(0);
  public resultsLength = 0;
  public isLoadingResults = true;

  private sortStatus: Sort;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private readonly accountsService: AccountsService) {
  }

  ngOnDestroy() {
    if (this.sort?.sortChange) {
      this.sort.sortChange.unsubscribe();
    }

    if (this.paginator?.page) {
      this.paginator.page.unsubscribe();
    }
  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe((sortEvent: Sort) => {
      this.sortStatus = sortEvent;
    });

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith([]),
        switchMap(() => {
          this.data = [];
          this.isLoadingResults = true;
          return this.accountsService.getAccounts().pipe(catchError(() => observableOf(null)));
        }),
        /**
         * This is just to ensure the loader shows for a decent amount of time
         */
        delay(1000),
        map(data => data === null ? [] : data),
        tap((response: Account[]) => {

          /**
           * Handle any sorting settings
           */
          if(this.sortStatus){
            const numericColumns = ['account_number', 'balance'];
            if(numericColumns.includes(this.sortStatus.active)){
              response = response.sort((a: Account,b: Account) => {
                let firstItem = a, secondItem = b;
                if(this.sortStatus.direction === 'desc') {
                  firstItem = b; secondItem = a;
                }

                // @ts-ignore
                return (+firstItem[this.sortStatus.active]) - +(secondItem[this.sortStatus.active]);
              })
            } else {
              response = response.sort((a: Account,b: Account) => {
                let firstItem = a, secondItem = b;
                if(this.sortStatus.direction === 'desc') {
                  firstItem = b; secondItem = a;
                }

                // @ts-ignore
                return firstItem[this.sortStatus.active] < secondItem[this.sortStatus.active] ? -1 : 1;
              })
            }
          }
          console.log(this.sortStatus);
          // response = response.sort( (a, b) => (+b.balance) - (+a.balance));

          this.resultsLength = response.length;
          this.isLoadingResults = false;

          const totalBalance = response.reduce((accumulator, item) => {
            let accountBalance = +item.balance;
            accountBalance = isNaN(accountBalance) ? 0 : accountBalance;
            return accumulator + accountBalance;
          }, 0);

          this.total$.next(totalBalance);
        })
      )
      .subscribe(data => (this.data = data));
  }
}
