import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import {
	MdButtonModule, MdCardModule, MdCheckboxModule, MdDialogModule, MdIconModule, MdInputModule, MdSelectModule,
	MdTableModule, MdToolbarModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColumnComponent } from './column/column.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CssOutputComponent } from './css-output/css-output.component';

@NgModule({
	declarations: [
		AppComponent,
		TableComponent,
		ColumnComponent,
		CssOutputComponent
	],
	imports: [
		BrowserModule,
		CdkTableModule,
		MdTableModule,
		FormsModule,
		MdSelectModule,
		MdIconModule,
		MdButtonModule,
		MdInputModule,
		MdCheckboxModule,
		MdCardModule,
		MdToolbarModule,
		MdDialogModule,
		FlexLayoutModule,
		BrowserAnimationsModule
	],
	providers: [],
	bootstrap: [AppComponent],
	entryComponents: [CssOutputComponent]
})
export class AppModule { }
