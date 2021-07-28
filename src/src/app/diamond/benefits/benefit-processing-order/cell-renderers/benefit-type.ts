import { Component, Input, OnInit } from "@angular/core";
import { ICellRendererParams } from "ag-grid-community";

@Component({
	selector: 'app-benefit-type',
	template: `
	  <select (change)="onChange($event)" [disabled]="isDisabled">
		<option [value]="null" [selected]="!benefitType" hidden>
		</option>
		<option *ngFor="let bt of benefitTypes" [value]="bt.value" [selected]="benefitType ? bt.value == benefitType: false">
			{{bt.name}}
        </option>
      </select>
    `
})
export class BenefitType implements OnInit {

	private params: ICellRendererParams;
	public benefitType: string;
	public benefitTypes: any = [
		{ value: '00', name: 'Copay' },
		{ value: '10', name: 'Coinsurance' },
		{ value: '20', name: 'Limit' },
		{ value: '30', name: 'Deductible' },
		{ value: '40', name: 'Out of Pocket Maximum' },
		{ value: '50', name: 'Message and Hold' },
		{ value: '60', name: 'Exclusions' },
		{ value: '70', name: 'Utilization Review' },
		{ value: '80', name: 'Full Coverage' }
	]
	constructor() {
	}

	ngOnInit() {
	}

	agInit(params: ICellRendererParams): void {
		this.params = params;
		this.benefitType = params.value;
	}

	get isDisabled(): boolean {
		return false;
	}

	public onChange(event: any) {
		this.params.context.componentParent.onChangeBenefitType(this.params.rowIndex, event.target.value, this.params.data.benefitType);
		this.params.data.benefitType = event.target.value;
	}
}
