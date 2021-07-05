import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { GetAllLinkHandler } from '@links/business-rules/getall-link.handler';
import { ILink } from '@links/models/ilink';

@Component({
  selector: 'app-links-list-page',
  templateUrl: './links-list-page.component.html',
  styleUrls: ['./links-list-page.component.scss'],
})
export class LinksListPageComponent implements OnInit {
  links: ILink[] = [];

  form = this.formBuild.group({
    title: [''],
  });

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  constructor(private formBuild: FormBuilder, private getAllLinkHandler: GetAllLinkHandler) {}

  async ngOnInit(): Promise<void> {
    await this.getAllLinks();
  }

  async getAllLinks(title: string = ''): Promise<void> {
    const links = await this.getAllLinkHandler.execute(title);
    if (links) {
      this.links = links;
    } else {
      this.links = [];
    }
  }

  async onSubmit(): Promise<void> {
    await this.getAllLinks(this.title.value);
  }
}
