import { Component } from '@angular/core';
import { Column } from './table/table.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialog } from '@angular/material';
import { CssOutputComponent } from './css-output/css-output.component';
import { ImportComponent } from './json/import/import.component';
import { ExportComponent } from './json/export/export.component';

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
		this.setColumns(localStorage.getItem('columns'));
	}
	
	static getSize(size: string) {
		if (/^(\d*\.\d+|\d+)$/.test(size)) { return size + 'px'; }
		if (/^(\d*\.\d+|\d+)(%|rem|em|px)$/.test(size)) { return size; }
		return '';
	}
	
	setColumns(columns: string) {
		try {
			this.columns = JSON.parse(columns) || [];
			this.columns.forEach(column => column.style = this.getColumnStyle(column));
			this.displayedColumns = this.columns.map(column => column.id);
		} catch (e) {
			this.columns = [];
			this.displayedColumns = [];
		}
	}
	
	getColumnStyle(col: Column) {
		const basisSize = AppComponent.getSize(col.basis);
		const basis = basisSize ? basisSize : 'auto';
		const flex = `flex: ${col.grow || 0} ${col.shrink || 0} ${basis}`;
		const minWidthSize = AppComponent.getSize(col.minWidth);
		const maxWidthSize = AppComponent.getSize(col.maxWidth);
		const minWidth = minWidthSize && !(minWidthSize === basisSize && !col.shrink) ? `; min-width: ${minWidthSize}` : '';
		const maxWidth = maxWidthSize && !(maxWidthSize === basisSize && !col.grow) ? `; max-width: ${maxWidthSize}` : '';
		return this.sanitizer.bypassSecurityTrustStyle(flex + minWidth + maxWidth);
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
			minWidth: '',
			maxWidth: ''
		}];
		this.setColumn(null, null);
	}
	
	generateCSS() {
		this.dialog.open(CssOutputComponent, {data: {columns: this.columns}});
	}
	exportJSON() {
		this.dialog.open(ExportComponent, {data: {columns: this.columns}});
	}
	importJSON() {
		this.dialog
			.open(ImportComponent)
			.afterClosed()
			.subscribe(json => {
				if (json) {
					this.setColumns(json);
					localStorage.setItem('columns', json);
				}
			});
	}
}
