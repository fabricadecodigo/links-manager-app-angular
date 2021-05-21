import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-links-form-page',
  templateUrl: './links-form-page.component.html',
  styleUrls: ['./links-form-page.component.scss']
})
export class LinksFormPageComponent implements OnInit {
  pageTitle = 'Novo link';

  form = this.formBuild.group({
    title: ['', [Validators.required]],
    url: ['', Validators.required],
    enable: [false]
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

  constructor(private formBuild: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
