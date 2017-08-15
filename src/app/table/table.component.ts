import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SafeStyle } from '@angular/platform-browser';

export interface Column {
	id: string;
	label: string;
	text: string;
	style?: SafeStyle;
	ellipsis: boolean;
	grow: number;
	shrink: number;
	basis: string;
	minWidth: string;
	maxWidth: string;
}

@Component({
	selector: 'mdtl-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnDestroy, OnChanges {
	@Input() columns: Column[] = [];
	dataSource = null;
	database = new StringDatabase(this.columns);
	@Input() displayedColumns: string[] = [];
	
	constructor() {
		this.dataSource = new StringDataSource(this.database);
	}
	
	ngOnChanges(changes: SimpleChanges) {
		if (changes.columns && changes.columns.currentValue !== changes.columns.previousValue) {
			this.database.setColumns(changes.columns.currentValue);
		}
	}
	
	ngOnDestroy() {
	}
}

export class StringDatabase {
	dataChange: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>([]);
	get data(): string[][] { return this.dataChange.value; }
	
	constructor(columns: Column[]) {
		this.setColumns(columns);
	}
	
	setColumns(columns: Column[]) {
		this.dataChange.next([columns.map(column => column.text)]);
	}
}

export class StringDataSource extends DataSource<string[]> {
	constructor(private _exampleDatabase: StringDatabase) {
		super();
	}
	
	connect(): Observable<string[][]> {
		return this._exampleDatabase.dataChange;
	}
	
	disconnect() {}
}
