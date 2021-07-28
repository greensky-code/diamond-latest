import { Component, OnInit } from "@angular/core";
import { ICellRendererParams } from "ag-grid-community";

@Component({
    selector: 'app-processing-order',
    template: `
        <select (change)="onChange($event)" [disabled]="isDisabled">
            <option [value]="null" [selected]="!benefitOrder" hidden>
            </option>
            <option *ngFor="let po of benefitOrders" [value]="po.value" [selected]="benefitOrder ? po.value == benefitOrder: false">
                {{po.name}}
            </option>
        </select>
    `
})
export class ProcessingOrder implements OnInit {

    private params: ICellRendererParams;
    public benefitOrder: string;
    public benefitOrders: any = [
        { value: '10', name: '10' },
        { value: '20', name: '20' },
        { value: '30', name: '30' },
        { value: '40', name: '40' },
        { value: '50', name: '50' },
        { value: '60', name: '60' },
        { value: '70', name: '70' },
        { value: '80', name: '80' },
        { value: '90', name: '90' }
    ]
    constructor() {
    }

    ngOnInit() {

    }

    agInit(params: ICellRendererParams): void {
        this.params = params;
        this.benefitOrder = params.value;
    }

    get isDisabled(): boolean {
        return false;
    }

    public onChange(event: any) {
		this.params.context.componentParent.onChangeProcessingOrder(this.params.rowIndex, event.target.value, this.params.data.processingOrder);
		this.params.data.processingOrder = event.target.value;
	}
}
