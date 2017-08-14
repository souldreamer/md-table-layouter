import { Component, Inject, OnInit, SecurityContext } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { Column } from '../table/table.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'mdtl-css-output',
	templateUrl: './css-output.component.html',
	styleUrls: ['./css-output.component.scss']
})
export class CssOutputComponent implements OnInit {
	readonly ellipsisCSS = `
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;`;
	
	constructor(@Inject(MD_DIALOG_DATA) private options: {columns: Column[]}, private sanitizer: DomSanitizer) {}
	
	ngOnInit() {
	}
	
	getCSS() {
		return this.sanitizer.bypassSecurityTrustHtml(
			this.options.columns.map(column => `/* ${column.label} */
.cdk-column-columnId${+column.id + 1} {
	${this.sanitizer.sanitize(SecurityContext.STYLE, column.style).replace('; ', ';\n\t')};${column.ellipsis ? this.ellipsisCSS : ''}
}
`).join('\n')
		);
	}
}
