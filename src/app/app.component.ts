import { Component } from '@angular/core';
import { Column } from './table/table.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialog } from '@angular/material';
import { CssOutputComponent } from './css-output/css-output.component';

@Component({
	selector: 'mdtl-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	widths = [
		'100%',
		'320px', '375px', '480px', '568px', '640px', '768px',
		'1024px', '1224px', '1600px', '1824px'
	];
	columns: Column[] = [];
	displayedColumns: string[] = [];
	
	constructor(private sanitizer: DomSanitizer, private dialog: MdDialog) {
		try {
			this.columns = JSON.parse(localStorage.getItem('columns')) || [];
			this.columns.forEach(column => column.style = this.getColumnStyle(column));
			this.displayedColumns = JSON.parse(localStorage.getItem('displayedColumns')) || [];
		} catch (e) {
			this.columns = [];
			this.displayedColumns = [];
		}
	}
	
	static getSize(size: string) {
		if (/^\d+$/.test(size)) { return size + 'px'; }
		if (/^\d+(%|rem|em|px)$/.test(size)) { return size; }
		return '';
	}
	
	getColumnStyle(col: Column) {
		const basis = /^\d+(%|rem|em|px)?$/.test(col.basis) ? AppComponent.getSize(col.basis) : 'auto';
		const flex = `flex: ${col.grow || 0} ${col.shrink || 0} ${basis}`;
		const minWidth = /^\d+(%|rem|em|px)?$/.test(col.minWidth) ? `; min-width: ${AppComponent.getSize(col.minWidth)}` : '';
		return this.sanitizer.bypassSecurityTrustStyle(flex + minWidth);
	}
	
	setColumn(oldColumn: Column, newColumn: Column|null) {
		if (newColumn == null) {
			this.columns = this.columns
				.filter(column => column !== oldColumn)
				.map((column, index) => ({...column, id: index.toString()}));
		} else {
			newColumn.style = this.getColumnStyle(newColumn);
			this.columns = this.columns.map(column => column === oldColumn ? newColumn : column);
		}
		this.displayedColumns = this.columns.map(column => column.id);
		
		localStorage.setItem('columns', JSON.stringify(this.columns));
		localStorage.setItem('displayedColumns', JSON.stringify(this.displayedColumns));
	}
	
	addColumn() {
		if (this.columns.length > 20) { return; }
		this.columns = [...this.columns, {
			id: this.columns.length.toString(),
			label: '',
			text: '',
			basis: '0',
			ellipsis: false,
			shrink: 1,
			grow: 1,
			minWidth: ''
		}];
		this.setColumn(null, null);
	}
	
	generateCSS() {
		this.dialog.open(CssOutputComponent, {data: {columns: this.columns}});
	}
}
