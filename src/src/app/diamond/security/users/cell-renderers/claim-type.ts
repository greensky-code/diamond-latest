import { Component, Input, OnInit } from "@angular/core";
import { ICellRendererParams } from "ag-grid-community";
import { SystemCodesService } from "../../../../api-services";

@Component({
	selector: 'users',
	template: `
	  <select (change)="onChange($event)" [disabled]="isDisabled">
		<option [value]="null" [selected]="!claimType" hidden>
		</option>
		<option *ngFor="let ct of claimTypes" [value]="bt.value" [selected]="claimType ? ct.value == claimType: false">
			{{ct.name}}
        </option>
      </select>
    `
})
export class ClaimType implements OnInit {

	private params: ICellRendererParams;
	public claimType: string;
    claimTypes: any[] = [];
    
	constructor(
        private systemCodesService: SystemCodesService,
    ) {
    }
    
    getClaimTypes() {
        this.systemCodesService
            .getSystemCodesByLangAndtype("CLAIMTYPE", "0")
            .subscribe((data) => {
                this.claimTypes = data;
            });
    }

	ngOnInit() {
	}

	agInit(params: ICellRendererParams): void {
		this.params = params;
		this.claimType = params.value;
	}

	get isDisabled(): boolean {
		return false;
	}

	public onChange(event: any) {
		this.params.context.componentParent.onChangeClaimType(this.params.rowIndex, event.target.value, this.params.data.claimType);
		this.params.data.claimType = event.target.value;
	}
}
