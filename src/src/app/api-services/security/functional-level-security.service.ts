import { Injectable } from '@angular/core';
import { NgbToastType } from 'ngb-toast';
import { MessageMasterDtlService } from '..';
import { MessageMasterDtl } from '../../api-models/message-master-dtl.model';
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message';
import { ToastService } from '../../shared/services/toast.service';



@Injectable({
  providedIn: 'root'
})
export class FunctionalLevelSecurityService {

  public alertMessage: AlertMessage;
  constructor(private toastService: ToastService,
    private alertMessageService: AlertMessageService,
    private messageMasterDtlService: MessageMasterDtlService
  ) { }


  isFunctionIdExist(prefix: string, suffix: string): boolean {
    let functionId = prefix + suffix;
    let status = false;
    let functions: string[] = [];
    let isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
    if (isSuperUser) {
      status = true;
    } else {
      functions = JSON.parse(sessionStorage.getItem("functionIds"));
      if (functions.length > 0) {
        if (functions.indexOf(functionId) > -1) {
          status = true;
        } else {
          status = false;
        }
      } else {
        status = false;
      }
    }
    return status;
  }


  isFunctionIdNameExist(functionIdName: string): boolean {
    let functionId = functionIdName;
    let status = false;
    let functions: string[] = [];
    let isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
    if (isSuperUser === null) {
      isSuperUser = false;
    }
    if (isSuperUser) {
      status = true;
    } else {
      functions = JSON.parse(sessionStorage.getItem("functionIds"));
      if (functions !== null) {
        if (functions.length > 0) {
          if (functions.indexOf(functionId) > -1) {
            status = true;
          } else {
            status = false;
          }
        } else {
          status = false;
        }
      } else {
        status = false;
      }

    }
    return status;
  }

  //this.isValid(functionId, status);


  isValid(functionId: any, status: boolean) {
    if (status) {
      //alert("Permission Granted:" + functionId);
    } else {
      this.toastService.showToast('11073 (User does not have authorization to execute this function.)', NgbToastType.Danger);
    }

  }


  getMessageById(messageId: any): string {
    let message: string;
    this.messageMasterDtlService.findByMessageId(messageId).subscribe(response => {
      message = response[0].messageText;
    });
    return message;
  }

}
