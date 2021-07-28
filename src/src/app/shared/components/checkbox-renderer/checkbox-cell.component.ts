import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
    selector: 'checkbox-cell',
    template: `<input type="checkbox" [checked]="params.value === 'Y'" (change)="onChange($event)">`,
})
export class CheckboxCellComponent implements ICellRendererAngularComp {

    @ViewChild('.checkbox') checkbox: ElementRef;

    public params: ICellRendererParams;

    constructor() { }

    agInit(params: ICellRendererParams): void {
        this.params = params;
    }

    public onChange(event) {
        this.params.data[this.params.colDef.field] = event.currentTarget.checked? 'Y': 'N';
        this.params.node.setSelected(true);
    }

    refresh(params: any): boolean {
        return params.value === 'Y';
    }
}
