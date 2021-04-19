import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding-finished-page',
  templateUrl: './onboarding-finished-page.component.html',
  styleUrls: ['./onboarding-finished-page.component.scss'],
})
export class OnboardingFinishedPageComponent implements OnInit {
  title = '';
  message = '';
  messageType = 'success';
  buttonTitle = '';

  constructor() {}

  ngOnInit(): void {
    this.title = 'Tudo pronto';
    this.message = 'O cadastro foi concluído com sucesso';
    this.messageType = 'success';
    this.buttonTitle = 'Visualizar a dashboard';

    // this.title = 'Ação necessária';
    // this.message = 'Você ainda não criou uma empresa, por favor clique no botão abaixo e crie a empresa';
    // this.messageType = 'error';
    // this.buttonTitle = 'Criar empresa';
  }
}
