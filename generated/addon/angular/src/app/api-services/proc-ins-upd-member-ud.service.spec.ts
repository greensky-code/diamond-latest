/* Copyright (c) 2021 . All Rights Reserved. */

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

import { ProcInsUpdMemberUdService } from './proc-ins-upd-member-ud.service';
import { ProcInsUpdMemberUd } from '../api-models/proc-ins-upd-member-ud.model'
import { ProcInsUpdMemberUds } from "../api-models/testing/fake-proc-ins-upd-member-ud.model"

describe('ProcInsUpdMemberUdService', () => {
  let injector: TestBed;
  let service: ProcInsUpdMemberUdService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcInsUpdMemberUdService]
    });
    injector = getTestBed();
    service = injector.get(ProcInsUpdMemberUdService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcInsUpdMemberUds', () => {
    it('should return an Promise<ProcInsUpdMemberUd[]>', () => {
      const procInsUpdMemberUd = [
       {pEntityId:1234, pPassportNumber:'sample data', pPassportExpireDate:'sample data', pPassportIssueLoc:'sample data', pKsaNationality:'sample data', pEmirateIdNo:'sample data', pEmirateIdExpireDate:'sample data', pEmirateIdIssueLoc:'sample data', pGovernmentId:'sample data', pGovernmentIdExpireDate:'sample data', pGovernmentIdIssueLoc:'sample data', pGovernmentIdType:'sample data', pSponsorId:'sample data', pSponsorIdIssueLoc:'sample data', pSponsorIdType:'sample data', pKsaProfession:'sample data', pPreferredCurrency:'sample data', pProcRslt:'sample data', pUserDefined1:'sample data', pUserDefined2:'sample data', pUserDefined3:'sample data', pUserDefined4:'sample data', pUserDefined5:'sample data', pUserDefined6:'sample data', pUserDefined7:'sample data', pUserDefined8:'sample data', pUserDefined9:'sample data', pUserDefined10:'sample data', pUserDefined11:'sample data', pUserDefined12:'sample data', pUserDefined13:'sample data', pUserDefined14:'sample data', pUserDefined15:'sample data', pUserDefined16:'sample data', pUserDefined17:'sample data', pUserDefined18:'sample data', pUserDefined19:'sample data', pUserDefined20:'sample data', pUserDefined21:'sample data', pUserDefined22:'sample data', pUserDefined23:'sample data', pUserDefined24:'sample data', pUserDefined25:'sample data', pUserDate1:'sample data', pUserDate2:'sample data', pUserDate3:'sample data', pUserDate4:'sample data', pUserDate5:'sample data', pUserDate6:'sample data', pUserDate7:'sample data', pUserDate8:'sample data', pUserDate9:'sample data', pUserDate10:'sample data', pUserId:'sample data', pUaeVisaStartDate:'sample data', pDubaiWorkLocationCode:'sample data', pComments:'sample data'},
       {pEntityId:1234, pPassportNumber:'sample data', pPassportExpireDate:'sample data', pPassportIssueLoc:'sample data', pKsaNationality:'sample data', pEmirateIdNo:'sample data', pEmirateIdExpireDate:'sample data', pEmirateIdIssueLoc:'sample data', pGovernmentId:'sample data', pGovernmentIdExpireDate:'sample data', pGovernmentIdIssueLoc:'sample data', pGovernmentIdType:'sample data', pSponsorId:'sample data', pSponsorIdIssueLoc:'sample data', pSponsorIdType:'sample data', pKsaProfession:'sample data', pPreferredCurrency:'sample data', pProcRslt:'sample data', pUserDefined1:'sample data', pUserDefined2:'sample data', pUserDefined3:'sample data', pUserDefined4:'sample data', pUserDefined5:'sample data', pUserDefined6:'sample data', pUserDefined7:'sample data', pUserDefined8:'sample data', pUserDefined9:'sample data', pUserDefined10:'sample data', pUserDefined11:'sample data', pUserDefined12:'sample data', pUserDefined13:'sample data', pUserDefined14:'sample data', pUserDefined15:'sample data', pUserDefined16:'sample data', pUserDefined17:'sample data', pUserDefined18:'sample data', pUserDefined19:'sample data', pUserDefined20:'sample data', pUserDefined21:'sample data', pUserDefined22:'sample data', pUserDefined23:'sample data', pUserDefined24:'sample data', pUserDefined25:'sample data', pUserDate1:'sample data', pUserDate2:'sample data', pUserDate3:'sample data', pUserDate4:'sample data', pUserDate5:'sample data', pUserDate6:'sample data', pUserDate7:'sample data', pUserDate8:'sample data', pUserDate9:'sample data', pUserDate10:'sample data', pUserId:'sample data', pUaeVisaStartDate:'sample data', pDubaiWorkLocationCode:'sample data', pComments:'sample data'},
       {pEntityId:1234, pPassportNumber:'sample data', pPassportExpireDate:'sample data', pPassportIssueLoc:'sample data', pKsaNationality:'sample data', pEmirateIdNo:'sample data', pEmirateIdExpireDate:'sample data', pEmirateIdIssueLoc:'sample data', pGovernmentId:'sample data', pGovernmentIdExpireDate:'sample data', pGovernmentIdIssueLoc:'sample data', pGovernmentIdType:'sample data', pSponsorId:'sample data', pSponsorIdIssueLoc:'sample data', pSponsorIdType:'sample data', pKsaProfession:'sample data', pPreferredCurrency:'sample data', pProcRslt:'sample data', pUserDefined1:'sample data', pUserDefined2:'sample data', pUserDefined3:'sample data', pUserDefined4:'sample data', pUserDefined5:'sample data', pUserDefined6:'sample data', pUserDefined7:'sample data', pUserDefined8:'sample data', pUserDefined9:'sample data', pUserDefined10:'sample data', pUserDefined11:'sample data', pUserDefined12:'sample data', pUserDefined13:'sample data', pUserDefined14:'sample data', pUserDefined15:'sample data', pUserDefined16:'sample data', pUserDefined17:'sample data', pUserDefined18:'sample data', pUserDefined19:'sample data', pUserDefined20:'sample data', pUserDefined21:'sample data', pUserDefined22:'sample data', pUserDefined23:'sample data', pUserDefined24:'sample data', pUserDefined25:'sample data', pUserDate1:'sample data', pUserDate2:'sample data', pUserDate3:'sample data', pUserDate4:'sample data', pUserDate5:'sample data', pUserDate6:'sample data', pUserDate7:'sample data', pUserDate8:'sample data', pUserDate9:'sample data', pUserDate10:'sample data', pUserId:'sample data', pUaeVisaStartDate:'sample data', pDubaiWorkLocationCode:'sample data', pComments:'sample data'}

      ];
      service.getProcInsUpdMemberUds().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procinsupdmemberuds/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procInsUpdMemberUd);
    });
  });


  describe('#createProcInsUpdMemberUd', () => {
    var id = 1;
    it('should return an Promise<ProcInsUpdMemberUd>', () => {
      const procInsUpdMemberUd: ProcInsUpdMemberUd = {pEntityId:1234, pPassportNumber:'sample data', pPassportExpireDate:'sample data', pPassportIssueLoc:'sample data', pKsaNationality:'sample data', pEmirateIdNo:'sample data', pEmirateIdExpireDate:'sample data', pEmirateIdIssueLoc:'sample data', pGovernmentId:'sample data', pGovernmentIdExpireDate:'sample data', pGovernmentIdIssueLoc:'sample data', pGovernmentIdType:'sample data', pSponsorId:'sample data', pSponsorIdIssueLoc:'sample data', pSponsorIdType:'sample data', pKsaProfession:'sample data', pPreferredCurrency:'sample data', pProcRslt:'sample data', pUserDefined1:'sample data', pUserDefined2:'sample data', pUserDefined3:'sample data', pUserDefined4:'sample data', pUserDefined5:'sample data', pUserDefined6:'sample data', pUserDefined7:'sample data', pUserDefined8:'sample data', pUserDefined9:'sample data', pUserDefined10:'sample data', pUserDefined11:'sample data', pUserDefined12:'sample data', pUserDefined13:'sample data', pUserDefined14:'sample data', pUserDefined15:'sample data', pUserDefined16:'sample data', pUserDefined17:'sample data', pUserDefined18:'sample data', pUserDefined19:'sample data', pUserDefined20:'sample data', pUserDefined21:'sample data', pUserDefined22:'sample data', pUserDefined23:'sample data', pUserDefined24:'sample data', pUserDefined25:'sample data', pUserDate1:'sample data', pUserDate2:'sample data', pUserDate3:'sample data', pUserDate4:'sample data', pUserDate5:'sample data', pUserDate6:'sample data', pUserDate7:'sample data', pUserDate8:'sample data', pUserDate9:'sample data', pUserDate10:'sample data', pUserId:'sample data', pUaeVisaStartDate:'sample data', pDubaiWorkLocationCode:'sample data', pComments:'sample data'};
      service.createProcInsUpdMemberUd(procInsUpdMemberUd).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procinsupdmemberuds`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcInsUpdMemberUd', () => {
    var id = 1;
    it('should return an Promise<ProcInsUpdMemberUd>', () => {
      const procInsUpdMemberUd: ProcInsUpdMemberUd = {pEntityId:1234, pPassportNumber:'sample data', pPassportExpireDate:'sample data', pPassportIssueLoc:'sample data', pKsaNationality:'sample data', pEmirateIdNo:'sample data', pEmirateIdExpireDate:'sample data', pEmirateIdIssueLoc:'sample data', pGovernmentId:'sample data', pGovernmentIdExpireDate:'sample data', pGovernmentIdIssueLoc:'sample data', pGovernmentIdType:'sample data', pSponsorId:'sample data', pSponsorIdIssueLoc:'sample data', pSponsorIdType:'sample data', pKsaProfession:'sample data', pPreferredCurrency:'sample data', pProcRslt:'sample data', pUserDefined1:'sample data', pUserDefined2:'sample data', pUserDefined3:'sample data', pUserDefined4:'sample data', pUserDefined5:'sample data', pUserDefined6:'sample data', pUserDefined7:'sample data', pUserDefined8:'sample data', pUserDefined9:'sample data', pUserDefined10:'sample data', pUserDefined11:'sample data', pUserDefined12:'sample data', pUserDefined13:'sample data', pUserDefined14:'sample data', pUserDefined15:'sample data', pUserDefined16:'sample data', pUserDefined17:'sample data', pUserDefined18:'sample data', pUserDefined19:'sample data', pUserDefined20:'sample data', pUserDefined21:'sample data', pUserDefined22:'sample data', pUserDefined23:'sample data', pUserDefined24:'sample data', pUserDefined25:'sample data', pUserDate1:'sample data', pUserDate2:'sample data', pUserDate3:'sample data', pUserDate4:'sample data', pUserDate5:'sample data', pUserDate6:'sample data', pUserDate7:'sample data', pUserDate8:'sample data', pUserDate9:'sample data', pUserDate10:'sample data', pUserId:'sample data', pUaeVisaStartDate:'sample data', pDubaiWorkLocationCode:'sample data', pComments:'sample data'};
      service.updateProcInsUpdMemberUd(procInsUpdMemberUd, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procinsupdmemberuds/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcInsUpdMemberUd', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcInsUpdMemberUd(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procinsupdmemberuds/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});