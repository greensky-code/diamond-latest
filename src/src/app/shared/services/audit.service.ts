import {DatePipe} from "@angular/common";
import { Injectable } from "@angular/core";
import { OPERATIONS } from "../models/models";
import * as moment from 'moment';
import 'moment-timezone';

@Injectable({
  providedIn: "root",
})
export class AuditService {
  constructor(public datepipe: DatePipe) {}

  public setAuditFields(
      model: any,
      user: string,
      process: string,
      operation: string,
  ) {
    if (operation == OPERATIONS.ADD) {
      model.insertUser = user;
      model.insertProcess = process;
      model.updateUser = user;
      model.updateProcess = process;
    } else {
      model.updateUser = user;
      model.updateProcess = process;
    }
    model.insertDatetime = null;
    model.updateDatetime = null;
  }
  //As Client Want to see timestamp without refreshing screen when he add new or update data.
  public setAuditFieldsAfterSaving(
    oldModel:any,
    model: any, //Passing model here which we are passing to WhowTimeStamp Window
    user: string,
    process: string,
    operation: string
  ) {
 
    let format = "yyyy-MM-dd HH:mm:ss";
    if (operation == OPERATIONS.ADD) {
      model.insertDatetimeDisplay = this.datepipe.transform(new Date(), format);
      model.insertUser = user;
      model.insertProcess = process;

      model.updateDatetimeDisplay = this.datepipe.transform(new Date(), format);
      model.updateUser = user;
      model.updateProcess = process;
    } else {
      model.updateDatetimeDisplay = this.datepipe.transform(new Date(), format);
      model.updateUser = user;
      model.updateProcess = process;
    }
  }

  public setInsertFields(
      model: any,
      selectedData,
      operation,
  ) {
    if (operation == OPERATIONS.ADD) {
    } else {
      model.insertUser = selectedData.insertUser?selectedData.insertUser:'';
      model.insertProcess = selectedData.insertProcess?selectedData.insertProcess:'';
      if (selectedData.insertDatetime || selectedData.insertDatetimeDisplay) {
        let date =  new Date(selectedData.insertDatetimeDisplay?selectedData.insertDatetimeDisplay:selectedData.insertDatetime);
        date.setHours(date.getDate() - 2)
        model.insertDatetime =  date.toISOString().replace('T', ' ').split('.')[0]
      } else {
        model.insertDatetime = ''
      }
    }
  }

  public timestampView (
      timeView,
  ) {
    if (timeView) {
      return (moment(new Date(timeView))).format('MM/DD/YYYY HH:mm').toString();
    }
  }

  public intakeDateTime (
      dateTime
  ) {
    return (moment(new Date(dateTime))).format('MM/DD/YYYY HH:mm:ss').toString();
  }
}
