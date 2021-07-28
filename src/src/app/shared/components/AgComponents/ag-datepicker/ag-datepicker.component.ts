import { Component, ViewChild, ViewContainerRef } from "@angular/core";
import { ICellEditorAngularComp } from "ag-grid-angular";
import { DatePipe } from "@angular/common";
import { DatePickerConfig } from "../../../config";

@Component({
  selector: "app-ag-datepicker",
  templateUrl: "./ag-datepicker.component.html",
})
export class AgDatepickerComponent implements ICellEditorAngularComp {
  public datePickerConfig = DatePickerConfig;

  private params: any;
  public value: any;

  constructor(private datePipe: DatePipe) {}

  @ViewChild("input", { read: ViewContainerRef }) public input;

  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;
  }

  getValue(): any {
    return this.value;
  }
  onDateChanged(event: any) {
    this.value = this.datePipe.transform(event.singleDate.jsDate, "yyyy-dd-MM");
  }

  isPopup(): boolean {
    return true;
  }

  ngAfterViewInit() {
  }
}
