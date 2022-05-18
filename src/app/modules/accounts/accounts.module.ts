import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountsComponent} from './accounts.component';
import {AccountsTableComponent} from './accounts-table/accounts-table.component';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../shared.module';

@NgModule({
  declarations: [
    AccountsComponent,
    AccountsTableComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
  ],
  providers: []
})
export class AccountsModule { }
