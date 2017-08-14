import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CssOutputComponent } from './css-output.component';

describe('CssOutputComponent', () => {
	let component: CssOutputComponent;
	let fixture: ComponentFixture<CssOutputComponent>;
	
	beforeEach(async(() => {
		TestBed.configureTestingModule({
				declarations: [ CssOutputComponent ]
			})
			.compileComponents();
	}));
	
	beforeEach(() => {
		fixture = TestBed.createComponent(CssOutputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
