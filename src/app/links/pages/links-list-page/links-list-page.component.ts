import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-links-list-page',
  templateUrl: './links-list-page.component.html',
  styleUrls: ['./links-list-page.component.scss'],
})
export class LinksListPageComponent implements OnInit {
  links = [
    {
      id: 1,
      name: 'Fábrica de Código Academy',
      url: 'https://www.fabricadecodigo.com',
      enable: true,
    },
    {
      id: 2,
      name: 'Livro Clean Architecture',
      url: 'https://amzn.to/2Y8tjFi',
      enable: true,
    },
    {
      id: 3,
      name: 'Aula nova',
      url: 'https://www.youtube.com/watch?v=2pSFMyN7crY',
      enable: true,
    },
    {
      id: 4,
      name: 'Teste',
      url: 'https://www.youtube.com/watch?v=2pSFMyN7crY',
      enable: false,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
