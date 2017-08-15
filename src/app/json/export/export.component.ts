import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { Column } from '../../table/table.component';

@Component({
	selector: 'mdtl-export',
	templateUrl: './export.component.html',
	styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {
	columns: Column[];
	
	constructor(@Inject(MD_DIALOG_DATA) options: {columns: Column[]}) {
		this.columns = options.columns.map(column => ({...column, style: undefined}));
	}
	
	ngOnInit() {
	}
}
