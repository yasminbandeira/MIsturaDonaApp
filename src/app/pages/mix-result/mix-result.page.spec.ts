import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MixResultPage } from './mix-result.page';

describe('MixResultPage', () => {
  let component: MixResultPage;
  let fixture: ComponentFixture<MixResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MixResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
