import { IOnboardingResult } from './../../business-rules/onboarding.handler';
import { OnboardingHandler } from '@onboarding/business-rules/onboarding.handler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-onboarding-finished-page',
  templateUrl: './onboarding-finished-page.component.html',
  styleUrls: ['./onboarding-finished-page.component.scss'],
})
export class OnboardingFinishedPageComponent implements OnInit, OnDestroy {
  onboardingResult: IOnboardingResult | undefined;
  onboadingSubscription: Subscription | undefined;

  constructor(private onboardingHandler: OnboardingHandler) {}

  ngOnInit(): void {
    this.onboadingSubscription = this.onboardingHandler.getOnboardingResult().subscribe((result) => {
      this.onboardingResult = result;
    });
  }

  ngOnDestroy(): void {
    if (this.onboadingSubscription) {
      this.onboadingSubscription.unsubscribe();
    }
  }
}
