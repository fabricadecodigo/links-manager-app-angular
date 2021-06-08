import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-links-page',
  templateUrl: './users-links-page.component.html',
  styleUrls: ['./users-links-page.component.scss'],
})
export class UsersLinksPageComponent implements OnInit {
  companyName = 'Fábrica de Código';
  companyUrl = '';

  links = [
    {
      name: 'Vídeo Novo',
      url: 'https://www.youtube.com/watch?v=j6aOcANK22o',
    },
    {
      name: 'Fábrica de Código Academy',
      url: 'https://fabricadecodigo.com/',
    },
    {
      name: 'Clean Architecture',
      url: 'https://amzn.to/2Y8tjFi',
    },
    {
      name: 'Site',
      url: 'https://fabricadecodigo.com/',
    },
  ];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug');
    if (slug) {
      this.companyUrl = `@${slug}`;
    }
  }
}
