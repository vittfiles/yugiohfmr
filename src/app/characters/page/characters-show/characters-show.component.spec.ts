import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersShowComponent } from './characters-show.component';

describe('CharactersShowComponent', () => {
  let component: CharactersShowComponent;
  let fixture: ComponentFixture<CharactersShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharactersShowComponent]
    });
    fixture = TestBed.createComponent(CharactersShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
