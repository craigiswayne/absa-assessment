import {DEFAULT_CURRENCY_CODE, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AccountsModule} from './modules/accounts/accounts.module';
import {SharedModule} from './shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    AccountsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    SharedModule
  ],
  providers: [
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'ZAR '}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
