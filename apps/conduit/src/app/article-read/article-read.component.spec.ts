import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleReadComponent } from './article-read.component';

describe('ArticleReadComponent', () => {
  let component: ArticleReadComponent;
  let fixture: ComponentFixture<ArticleReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
