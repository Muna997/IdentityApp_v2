import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfile } from './edit-profile';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { HttpTestingController } from '@angular/common/http/testing';

describe('EditProfile', () => {
  let component: EditProfile;
  let fixture: ComponentFixture<EditProfile>;
  let httpMock: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfile],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfile);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    httpMock
      .expectOne((req) => req.url.includes('MyProfile'))
      .flush({ name: 'nana', email: 'nana@example.com' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
