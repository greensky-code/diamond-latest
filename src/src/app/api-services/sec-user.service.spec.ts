/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AlertMessageService, AlertMessage } from "../shared/alert-message/index";
import { Router } from '@angular/router'
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment'
import { RouterTestingModule } from '@angular/router/testing';

import { SecUserService } from './sec-user.service';
import { SecUser } from '../api-models/sec-user.model'
import { SecUsers } from "../api-models/testing/fake-sec-user.model"

describe('SecUserService', () => {
  let injector: TestBed;
  let service: SecUserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SecUserService]
    });
    injector = getTestBed();
    service = injector.get(SecUserService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSecUsers', () => {
    it('should return an Promise<SecUser[]>', () => {
      const secUser = [
       {termReason:'sample data', termDate:'2018-01-01', effDate:'2018-01-01', qSupervisorPriv:'sample data', usePwdProfInd:'sample data', resetPwdInd:'sample data', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined2:'sample data', userDefined1:'sample data', sfldlId:'sample data', languageId:1234, noteSecurityLevel:'sample data', usrSecurityLevel:'sample data', templateFlg:'sample data', usrLocation:'sample data', curUsrDept:'sample data', description:'sample data', userType:'sample data', dfltTemplate:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', secId:'sample data', suPriv:'sample data', provAffil:'sample data', ipaAffil:'sample data', grpAffil:'sample data', pendClaimOvr:'sample data', claimLimit:1234, loginMenu:'sample data', fax:'sample data', ext:'sample data', tel:'sample data', initials:'sample data', lname:'sample data', mi:'sample data', fname:'sample data', userId:'sample data'},
       {termReason:'sample data', termDate:'2018-01-01', effDate:'2018-01-01', qSupervisorPriv:'sample data', usePwdProfInd:'sample data', resetPwdInd:'sample data', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined2:'sample data', userDefined1:'sample data', sfldlId:'sample data', languageId:1234, noteSecurityLevel:'sample data', usrSecurityLevel:'sample data', templateFlg:'sample data', usrLocation:'sample data', curUsrDept:'sample data', description:'sample data', userType:'sample data', dfltTemplate:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', secId:'sample data', suPriv:'sample data', provAffil:'sample data', ipaAffil:'sample data', grpAffil:'sample data', pendClaimOvr:'sample data', claimLimit:1234, loginMenu:'sample data', fax:'sample data', ext:'sample data', tel:'sample data', initials:'sample data', lname:'sample data', mi:'sample data', fname:'sample data', userId:'sample data'},
       {termReason:'sample data', termDate:'2018-01-01', effDate:'2018-01-01', qSupervisorPriv:'sample data', usePwdProfInd:'sample data', resetPwdInd:'sample data', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined2:'sample data', userDefined1:'sample data', sfldlId:'sample data', languageId:1234, noteSecurityLevel:'sample data', usrSecurityLevel:'sample data', templateFlg:'sample data', usrLocation:'sample data', curUsrDept:'sample data', description:'sample data', userType:'sample data', dfltTemplate:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', secId:'sample data', suPriv:'sample data', provAffil:'sample data', ipaAffil:'sample data', grpAffil:'sample data', pendClaimOvr:'sample data', claimLimit:1234, loginMenu:'sample data', fax:'sample data', ext:'sample data', tel:'sample data', initials:'sample data', lname:'sample data', mi:'sample data', fname:'sample data', userId:'sample data'}

      ];
      service.getSecUsers().then(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/secusers/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(secUser);
    });
  });


  describe('#createSecUser', () => {
    var id = 1;
    it('should return an Promise<SecUser>', () => {
      const secUser: SecUser = {termReason:'sample data', termDate:'2018-01-01', effDate:'2018-01-01', qSupervisorPriv:'sample data', usePwdProfInd:'sample data', resetPwdInd:'sample data', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined2:'sample data', userDefined1:'sample data', sfldlId:'sample data', languageId:1234, noteSecurityLevel:'sample data', usrSecurityLevel:'sample data', templateFlg:'sample data', usrLocation:'sample data', curUsrDept:'sample data', description:'sample data', userType:'sample data', dfltTemplate:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', secId:'sample data', suPriv:'sample data', provAffil:'sample data', ipaAffil:'sample data', grpAffil:'sample data', pendClaimOvr:'sample data', claimLimit:1234, loginMenu:'sample data', fax:'sample data', ext:'sample data', tel:'sample data', initials:'sample data', lname:'sample data', mi:'sample data', fname:'sample data', userId:'sample data'};
      service.createSecUser(secUser).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secusers`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSecUser', () => {
    var id = 1;
    it('should return an Promise<SecUser>', () => {
      const secUser: SecUser = {termReason:'sample data', termDate:'2018-01-01', effDate:'2018-01-01', qSupervisorPriv:'sample data', usePwdProfInd:'sample data', resetPwdInd:'sample data', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined2:'sample data', userDefined1:'sample data', sfldlId:'sample data', languageId:1234, noteSecurityLevel:'sample data', usrSecurityLevel:'sample data', templateFlg:'sample data', usrLocation:'sample data', curUsrDept:'sample data', description:'sample data', userType:'sample data', dfltTemplate:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', secId:'sample data', suPriv:'sample data', provAffil:'sample data', ipaAffil:'sample data', grpAffil:'sample data', pendClaimOvr:'sample data', claimLimit:1234, loginMenu:'sample data', fax:'sample data', ext:'sample data', tel:'sample data', initials:'sample data', lname:'sample data', mi:'sample data', fname:'sample data', userId:'sample data'};
      service.updateSecUser(secUser, id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secusers/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSecUser', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSecUser(id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secusers/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});