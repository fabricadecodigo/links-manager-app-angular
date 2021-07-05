import { ILink } from '@links/models/ilink';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { CreateLinkHandler } from '@links/business-rules/create-link.handler';
import { GetByIdLinkHandler } from '@links/business-rules/getbyid-link-handle';
import { UpdateLinkHandler } from '@links/business-rules/update-link.handler';

@Component({
  selector: 'app-links-form-page',
  templateUrl: './links-form-page.component.html',
  styleUrls: ['./links-form-page.component.scss'],
})
export class LinksFormPageComponent implements OnInit {
  pageTitle = 'Novo link';

  form = this.formBuild.group({
    title: ['', [Validators.required]],
    url: ['', Validators.required],
    enable: [false],
  });

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }
  get url(): FormControl {
    return this.form.get('url') as FormControl;
  }
  get enable(): FormControl {
    return this.form.get('enable') as FormControl;
  }

  linkId = -1;

  constructor(
    private formBuild: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private createLinkHandler: CreateLinkHandler,
    private updateLinkHandler: UpdateLinkHandler,
    private getByIdLinkHandle: GetByIdLinkHandler
  ) {}

  async ngOnInit(): Promise<void> {
    const paramId = this.activatedRouter.snapshot.paramMap.get('id');
    if (paramId) {
      this.linkId = Number(paramId);
      await this.loadLink();
    }
  }

  async loadLink(): Promise<void> {
    const response = await this.getByIdLinkHandle.execute(this.linkId);
    if (response) {
      this.pageTitle = 'Editando link';
      this.form.patchValue({
        title: response.title,
        url: response.url,
        enable: response.ativo,
      });
    }
  }

  resetForm(): void {
    this.pageTitle = 'Novo link';
    this.linkId = -1;
    this.form.reset();
  }

  async onSubmit(): Promise<void> {
    const linkToSave: ILink = {
      id: this.linkId > 0 ? this.linkId.toString() : undefined,
      title: this.title.value,
      url: this.url.value,
      ativo: this.enable.value || false,
    };
    let response: ILink | undefined;

    if (linkToSave.id) {
      response = await this.updateLinkHandler.execute(linkToSave);
    } else {
      response = await this.createLinkHandler.execute(linkToSave);
    }

    if (response) {
      this.linkId = Number(response.id);
    }

    // se quiser limpar os campos
    // this.resetForm();
  }
}
