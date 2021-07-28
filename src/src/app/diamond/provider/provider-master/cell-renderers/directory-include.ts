import { Component, OnInit } from "@angular/core";
import { ICellRendererParams } from "ag-grid-community";
import { DddwDtl } from "../../../../api-models";

@Component({
  selector: 'app-directory-include',
  template: `
	  <select (change)="onChange($event)" [disabled]="isDisabled" style="width: -webkit-fill-available;">
		<option [value]="null" [selected]="!directoryInclude" hidden>
		</option>
		<option *ngFor="let di of directoryIncludes" [value]="di.dddwDtlPrimaryKey.dataVal" [selected]="directoryInclude ? di.dddwDtlPrimaryKey.dataVal == directoryInclude: false">
			{{di.dddwDtlPrimaryKey.displayVal}}
      </option>
    </select>
    `
})
export class DirectoryInclude implements OnInit {

  private params: ICellRendererParams;
  public directoryInclude: string;
  public directoryIncludes: DddwDtl[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.directoryInclude = params.value;
    this.directoryIncludes = this.params.context.componentParent.directoryIncludes;
  }

  get isDisabled(): boolean {
    return false;
  }

  public onChange(event: any) {
    this.params.data.directoryInclude = event.target.value;
  }
}
