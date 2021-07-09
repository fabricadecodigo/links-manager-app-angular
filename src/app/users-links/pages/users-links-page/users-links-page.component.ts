import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetLinksBySlugHandler } from '@users-links/business-rules/getlinksbyslug-userlinks.handler';
import { ICompanyLinkData } from '@users-links/models/icompany-link';

@Component({
  selector: 'app-users-links-page',
  templateUrl: './users-links-page.component.html',
  styleUrls: ['./users-links-page.component.scss'],
})
export class UsersLinksPageComponent implements OnInit {
  companyName = '';
  companyUrl = '';
  links: ICompanyLinkData[] = [];

  constructor(private activatedRoute: ActivatedRoute, private getLinksBySlugHandler: GetLinksBySlugHandler) {}

  async ngOnInit(): Promise<void> {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug');
    if (slug) {
      this.companyUrl = `@${slug}`;
      await this.loadLinks(slug);
    }
  }

  async loadLinks(slug: string): Promise<void> {
    const company = await this.getLinksBySlugHandler.execute(slug);
    if (company) {
      this.companyName = company.name;
      this.links = company.links;
    }
  }
}
