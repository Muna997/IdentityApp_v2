import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccount } from './delete-account';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('DeleteAccount', () => {
  let component: DeleteAccount;
  let fixture: ComponentFixture<DeleteAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAccount],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
