import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';

import { UserAddEdit } from './user-add-edit';

describe('UserAddEdit', () => {
  let component: UserAddEdit;
  let fixture: ComponentFixture<UserAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddEdit],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({}) },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
