import { Component, OnInit } from "@angular/core";
import { ICellRendererParams } from "ag-grid-community";
import { DddwDtl } from "../../../../api-models";

@Component({
  selector: 'app-primary-speciality',
  template: `
	  <select (change)="onChange($event)" [disabled]="isDisabled" style="width: -webkit-fill-available;">
		<option [value]="null" [selected]="!primarySpeciality" hidden>
		</option>
		<option *ngFor="let ps of primarySpecialitys" [value]="ps.dddwDtlPrimaryKey.dataVal" [selected]="primarySpeciality ? ps.dddwDtlPrimaryKey.dataVal == primarySpeciality: false">
			{{ps.dddwDtlPrimaryKey.displayVal}}
      </option>
    </select>
    `
})
export class PrimarySpeciality implements OnInit {

  private params: ICellRendererParams;
  public primarySpeciality: string;
  public primarySpecialitys: DddwDtl[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.primarySpeciality = params.value;
    this.primarySpecialitys = this.params.context.componentParent.primarySpecialities;
  }

  get isDisabled(): boolean {
    return false;
  }

  public onChange(event: any) {
    this.params.data.primarySpecialty = event.target.value;
  }
}
