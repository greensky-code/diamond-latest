import { Component, OnInit } from "@angular/core";
import { ICellRendererParams } from "ag-grid-community";
import { ProvTypeMaster } from "../../../../api-models";

@Component({
	selector: 'app-speciality-type',
	template: `
	  <select (change)="onChange($event)" [disabled]="isDisabled" style="width: -webkit-fill-available;">
		<option [value]="null" [selected]="!specialtyType" hidden>
		</option>
		<option *ngFor="let st of specialtyTypes" [value]="st.typeOrSpecCode" [selected]="specialtyType ? st.typeOrSpecCode == specialtyType: false">
			{{st.typeOrSpecCode}} {{st.description}}
        </option>
      </select>
    `
})
export class SpecialtyType implements OnInit {

	private params: ICellRendererParams;
	public specialtyType: string;
	public specialtyTypes: ProvTypeMaster[] = [];

	constructor() {
	}

	ngOnInit() {
	}

	agInit(params: ICellRendererParams): void {
		this.params = params;
		this.specialtyType = params.value;
		this.specialtyTypes = this.params.context.componentParent.provTypeMasters;
	}

	get isDisabled(): boolean {
		return false;
	}

	public onChange(event: any) {
		this.params.context.componentParent.onChangeSpecialtyType(this.params.rowIndex, event.target.value, this.params.data.specialtyType);
		this.params.data.specialtyType = event.target.value;
	}
}
