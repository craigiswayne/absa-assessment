import {NgModule} from '@angular/core';
import {MaskNumberDirective} from './directives/mask-number/mask-number.directive';
import {WithdrawButtonComponent} from './components/withdraw-button/withdraw-button.component';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {CommonModule} from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NotificationModule} from './modules/notification/notification.module';

@NgModule({
  declarations: [
    MaskNumberDirective,
    WithdrawButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    NotificationModule
  ],
  exports: [
    CommonModule,
    MaskNumberDirective,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    WithdrawButtonComponent
  ]
})
export class SharedModule {
}
