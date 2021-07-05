import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialModule } from '@core/modules';
import { CreateLinkHandler } from '@links/business-rules/create-link.handler';
import { GetByIdLinkHandler } from '@links/business-rules/getbyid-link-handle';
import { UpdateLinkHandler } from '@links/business-rules/update-link.handler';
import { LinksFormPageComponent } from './links-form-page.component';

describe('LinksFormPageComponent', () => {
  let component: LinksFormPageComponent;
  let fixture: ComponentFixture<LinksFormPageComponent>;
  const createLinkHandlerSpy = jasmine.createSpyObj<CreateLinkHandler>('CreateLinkHandler', ['execute']);
  const updateLinkHandlerSpy = jasmine.createSpyObj<UpdateLinkHandler>('UpdateLinkHandler', ['execute']);
  const getByIdLinkHandlerSpy = jasmine.createSpyObj<GetByIdLinkHandler>('GetByIdLinkHandler', ['execute']);
  const activatedRouteStub = {
    get snapshot(): any {
      return {
        paramMap: {
          get(name: string): string | null {
            return null;
          },
        },
      };
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinksFormPageComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, AngularMaterialModule, NoopAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: CreateLinkHandler, useValue: createLinkHandlerSpy },
        { provide: UpdateLinkHandler, useValue: updateLinkHandlerSpy },
        { provide: GetByIdLinkHandler, useValue: getByIdLinkHandlerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinksFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Dado que eu quero cadastrar um link Quando a tela abrir Então valores default serão exibidos', () => {
    expect(component.pageTitle).toBe('Novo link');
    expect(component.enable.value).toBeFalse();
    expect(component.title.value).toBe('');
    expect(component.url.value).toBe('');
    expect(component.linkId).toBe(-1);
  });

  it('Dado que eu quero editar um link Quando recebo o id por parametro Então o link é carregado da api', async () => {
    spyOnProperty(activatedRouteStub, 'snapshot').and.returnValue({
      paramMap: {
        get(name: string): string | null {
          if (name === 'id') {
            return '1';
          }

          return null;
        },
      },
    });

    getByIdLinkHandlerSpy.execute.and.returnValue(
      Promise.resolve({
        id: '1',
        title: 'Teste',
        url: 'http://teste.com',
        ativo: true,
      })
    );

    await component.ngOnInit();

    expect(component.pageTitle).toBe('Editando link');
    expect(component.enable.value).toBeTrue();
    expect(component.title.value).toBe('Teste');
    expect(component.url.value).toBe('http://teste.com');
    expect(component.linkId).toBe(1);
  });

  it('Dado que eu quero criar um link Quando clico em salvar Então o link é criado com sucesso', async () => {
    createLinkHandlerSpy.execute.and.returnValue(
      Promise.resolve({
        id: '1',
        title: 'Teste',
        url: 'http://teste.com',
        ativo: true,
      })
    );

    component.linkId = -1;
    component.form.patchValue({
      title: 'Teste',
      url: 'http://teste.com',
      enable: true,
    });

    await component.onSubmit();

    expect(createLinkHandlerSpy.execute).toHaveBeenCalledWith({
      id: undefined,
      title: 'Teste',
      url: 'http://teste.com',
      ativo: true,
    });
    expect(component.linkId).toBe(1);
  });

  it('Dado que eu quero alterar um link Quando clico em salvar Então o link é alterado com sucesso', async () => {
    updateLinkHandlerSpy.execute.and.returnValue(
      Promise.resolve({
        id: '1',
        title: 'Teste 2',
        url: 'http://teste.com.br',
        ativo: true,
      })
    );

    component.linkId = 1;
    component.form.patchValue({
      title: 'Teste',
      url: 'http://teste.com',
      enable: false,
    });

    await component.onSubmit();

    expect(updateLinkHandlerSpy.execute).toHaveBeenCalledWith({
      id: '1',
      title: 'Teste',
      url: 'http://teste.com',
      ativo: false,
    });
    expect(component.linkId).toBe(1);
  });
});
