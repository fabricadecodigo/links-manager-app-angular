import { NgModule } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationModule } from '@authentication/authentication.module';
import { SharedComponentModule } from '@core/components/shared-component.module';
import { AngularMaterialModule } from '@core/modules';
import { PageLayoutModule } from '@core/pages-layouts/page-layout.module';
import { AppErrorStateMatcher } from '@core/validations/app-error-state.matcher';
import { LinkModule } from '@links/link.module';
import { OnboardingModule } from '@onboarding/onboarding.module';
import { UserModule } from '@users/user.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    PageLayoutModule,
    SharedComponentModule,
    AuthenticationModule,
    OnboardingModule,
    LinkModule,
    UserModule,
  ],
  providers: [{ provide: ErrorStateMatcher, useClass: AppErrorStateMatcher }],
  bootstrap: [AppComponent],
})
export class AppModule {}
