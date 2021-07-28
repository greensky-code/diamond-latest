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
       {userId:'sample data', fname:'sample data', mi:'sample data', lname:'sample data', initials:'sample data', tel:'sample data', ext:'sample data', fax:'sample data', loginMenu:'sample data', claimLimit:1234, pendClaimOvr:'sample data', grpAffil:'sample data', ipaAffil:'sample data', provAffil:'sample data', suPriv:'sample data', secId:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', dfltTemplate:'sample data', userType:'sample data', description:'sample data', curUsrDept:'sample data', usrLocation:'sample data', templateFlg:'sample data', usrSecurityLevel:'sample data', noteSecurityLevel:'sample data', languageId:1234, sfldlId:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', resetPwdInd:'sample data', usePwdProfInd:'sample data', qSupervisorPriv:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data'},
       {userId:'sample data', fname:'sample data', mi:'sample data', lname:'sample data', initials:'sample data', tel:'sample data', ext:'sample data', fax:'sample data', loginMenu:'sample data', claimLimit:1234, pendClaimOvr:'sample data', grpAffil:'sample data', ipaAffil:'sample data', provAffil:'sample data', suPriv:'sample data', secId:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', dfltTemplate:'sample data', userType:'sample data', description:'sample data', curUsrDept:'sample data', usrLocation:'sample data', templateFlg:'sample data', usrSecurityLevel:'sample data', noteSecurityLevel:'sample data', languageId:1234, sfldlId:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', resetPwdInd:'sample data', usePwdProfInd:'sample data', qSupervisorPriv:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data'},
       {userId:'sample data', fname:'sample data', mi:'sample data', lname:'sample data', initials:'sample data', tel:'sample data', ext:'sample data', fax:'sample data', loginMenu:'sample data', claimLimit:1234, pendClaimOvr:'sample data', grpAffil:'sample data', ipaAffil:'sample data', provAffil:'sample data', suPriv:'sample data', secId:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', dfltTemplate:'sample data', userType:'sample data', description:'sample data', curUsrDept:'sample data', usrLocation:'sample data', templateFlg:'sample data', usrSecurityLevel:'sample data', noteSecurityLevel:'sample data', languageId:1234, sfldlId:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', resetPwdInd:'sample data', usePwdProfInd:'sample data', qSupervisorPriv:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data'}

      ];
      service.getSecUsers().subscribe(users => {
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
      const secUser: SecUser = {userId:'sample data', fname:'sample data', mi:'sample data', lname:'sample data', initials:'sample data', tel:'sample data', ext:'sample data', fax:'sample data', loginMenu:'sample data', claimLimit:1234, pendClaimOvr:'sample data', grpAffil:'sample data', ipaAffil:'sample data', provAffil:'sample data', suPriv:'sample data', secId:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', dfltTemplate:'sample data', userType:'sample data', description:'sample data', curUsrDept:'sample data', usrLocation:'sample data', templateFlg:'sample data', usrSecurityLevel:'sample data', noteSecurityLevel:'sample data', languageId:1234, sfldlId:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', resetPwdInd:'sample data', usePwdProfInd:'sample data', qSupervisorPriv:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data'};
      service.createSecUser(secUser).subscribe(response => {
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
      const secUser: SecUser = {userId:'sample data', fname:'sample data', mi:'sample data', lname:'sample data', initials:'sample data', tel:'sample data', ext:'sample data', fax:'sample data', loginMenu:'sample data', claimLimit:1234, pendClaimOvr:'sample data', grpAffil:'sample data', ipaAffil:'sample data', provAffil:'sample data', suPriv:'sample data', secId:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', dfltTemplate:'sample data', userType:'sample data', description:'sample data', curUsrDept:'sample data', usrLocation:'sample data', templateFlg:'sample data', usrSecurityLevel:'sample data', noteSecurityLevel:'sample data', languageId:1234, sfldlId:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', resetPwdInd:'sample data', usePwdProfInd:'sample data', qSupervisorPriv:'sample data', effDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data'};
      service.updateSecUser(secUser, id).subscribe(response => {
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
      service.deleteSecUser(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secusers/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});