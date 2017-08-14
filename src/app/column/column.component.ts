import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Column } from '../table/table.component';

@Component({
	selector: 'mdtl-column',
	templateUrl: './column.component.html',
	styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
	@Input() column: Column;
	@Output() columnChange = new EventEmitter<Column|null>();
	
	constructor() { }
	
	ngOnInit() {
	}
	
	setValue(prop: string, value: any) {
		this.column[prop] = value;
		this.columnChange.next(this.column);
	}
	
	delete() {
		this.columnChange.next(null);
	}
	
	getColumnId(column) {
		return +column.id + 1;
	}
}
