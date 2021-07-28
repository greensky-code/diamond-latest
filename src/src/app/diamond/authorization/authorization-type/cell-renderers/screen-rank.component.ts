import {Component, OnInit} from '@angular/core';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
    selector: 'app-speciality-type',
    template: `
        <input type="text" (change)="onChange($event)" style="width: -webkit-fill-available;" [value]="screenType">
    `
})
export class ScreenRankComponent implements OnInit {

    public screenType: string;
    private params: ICellRendererParams;

    constructor() {
    }

    ngOnInit() {
    }

    agInit(params: ICellRendererParams): void {
        this.params = params;
        this.screenType = params.value;
    }


    public onChange(event: any) {
        this.params.context.componentParent.onChangeScreenType(this.params.rowIndex, event.target.value, this.params.data.screenRank);
        this.params.data.screenRank = event.target.value;
    }
}
