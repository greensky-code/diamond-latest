import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import { ICellRendererParams } from "ag-grid-community";
import { ProvTypeMaster } from "../../../../api-models";

@Component({
	selector: 'app-speciality-type',
	template: `
	  <select (change)="onChange($event)" [disabled]="isDisabled" style="width: -webkit-fill-available;">
		<option [value]="null" [selected]="!transactionType" hidden>
		</option>
		<option *ngFor="let tt of transactionTypes" [value]="tt.dddwDtlPrimaryKey.dataVal" [selected]="transactionType ? tt.dddwDtlPrimaryKey.dataVal == transactionType: false">
			{{tt.dddwDtlPrimaryKey.displayVal}}
        </option>
      </select>
    `
})
export class TransactionTypeComponent implements OnInit {

	private params: ICellRendererParams;
	public transactionType: string;
	public transactionTypes: any[] = [];

	constructor() {
	}

	ngOnInit() {
	}

	agInit(params: ICellRendererParams): void {
		this.params = params;
		this.transactionType = params.value;
		this.transactionTypes = this.params.context.componentParent.transactionTypes;
	}

	get isDisabled(): boolean {
		return false;
	}

	public onChange(event: any) {
		this.params.context.componentParent.onChangeTransactionType(this.params.rowIndex, event.target.value, this.params.data.authTypeDetailPrimaryKey.authScreen);
		this.params.data.authTypeDetailPrimaryKey.authScreen = event.target.value;
	}
}
