import { Component, OnInit } from "@angular/core";
import { ICellRendererParams } from "ag-grid-community";
import { DddwDtl } from "../../../../api-models";

@Component({
  selector: 'app-board-status',
  template: `
	  <select (change)="onChange($event)" [disabled]="isDisabled" style="width: -webkit-fill-available;">
		<option [value]="null" [selected]="!boardStatus" hidden>
		</option>
		<option *ngFor="let bs of boardStatuses" [value]="bs.dddwDtlPrimaryKey.dataVal" [selected]="boardStatus ? bs.dddwDtlPrimaryKey.dataVal == boardStatus: false">
			{{bs.dddwDtlPrimaryKey.displayVal}}
      </option>
    </select>
    `
})
export class BoardStatus implements OnInit {

  private params: ICellRendererParams;
  public boardStatus: string;
  public boardStatuses: DddwDtl[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.boardStatus = params.value;
    this.boardStatuses = this.params.context.componentParent.boardStatuses;
  }

  get isDisabled(): boolean {
    return false;
  }

  public onChange(event: any) {
    this.params.data.boardStatus = event.target.value;
  }
}
