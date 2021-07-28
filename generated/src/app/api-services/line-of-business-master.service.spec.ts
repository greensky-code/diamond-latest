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

import { LineOfBusinessMasterService } from './line-of-business-master.service';
import { LineOfBusinessMaster } from '../api-models/line-of-business-master.model'
import { LinesOfBusinessMaster } from "../api-models/testing/fake-line-of-business-master.model"

describe('LineOfBusinessMasterService', () => {
  let injector: TestBed;
  let service: LineOfBusinessMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LineOfBusinessMasterService]
    });
    injector = getTestBed();
    service = injector.get(LineOfBusinessMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getLinesOfBusinessMaster', () => {
    it('should return an Promise<LineOfBusinessMaster[]>', () => {
      const lineOfBusinessMaster = [
       {lineOfBusiness:'sample data', description:'sample data', name:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', phoneNumber:'sample data', faxNumber:'sample data', pricePriorityRule:'sample data', providerDefault:1234, pcpRequired:'sample data', eobPrintFlag:'sample data', subDepEditSwitch:'sample data', claimDupRule:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', performAuthClaimMatch:'sample data', authClaimMatchDaysBefore:1234, authClaimMatchDaysAfter:1234, coveringProvInd:'sample data', country:'sample data', inclmSwitch:'sample data', performAuthWaive:'sample data', authLevel:'sample data', allowedGreaterThanBilled:'sample data', targetRevCodeEditFlg:'sample data', targetRevAction:'sample data', targetRevReason:'sample data', parReasonCode:'sample data', nonParReasonCode:'sample data', indPcpMaxEnrollLmt:1234, indPcpThreshold:1234, seqDefPcp:1234, seqFailPcp:1234, idcardReinstDays:1234, familyAffiliation:'sample data', useApcEditor:'sample data', editType:'sample data', useApcGrouper:'sample data', grouperAction:'sample data', grouperReasonCode:'sample data', useApcPricer:'sample data', pricerAction:'sample data', pricerReasonCode:'sample data', pricerNotCovReason:'sample data', interestDeterminant:'sample data', useResetDateFlag:'sample data', intDscntPaySub:'sample data', calcIntDscnt:'sample data', applyUncleanInd:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', waiveMatchOrder:'sample data', certifiedFlg:'sample data', ageFrom:1234, ageThrough:1234, siteFlg:'sample data', mcIndicator:'sample data', dateOfDeathRule:'sample data', penApplyUncleanInd:'sample data'},
       {lineOfBusiness:'sample data', description:'sample data', name:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', phoneNumber:'sample data', faxNumber:'sample data', pricePriorityRule:'sample data', providerDefault:1234, pcpRequired:'sample data', eobPrintFlag:'sample data', subDepEditSwitch:'sample data', claimDupRule:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', performAuthClaimMatch:'sample data', authClaimMatchDaysBefore:1234, authClaimMatchDaysAfter:1234, coveringProvInd:'sample data', country:'sample data', inclmSwitch:'sample data', performAuthWaive:'sample data', authLevel:'sample data', allowedGreaterThanBilled:'sample data', targetRevCodeEditFlg:'sample data', targetRevAction:'sample data', targetRevReason:'sample data', parReasonCode:'sample data', nonParReasonCode:'sample data', indPcpMaxEnrollLmt:1234, indPcpThreshold:1234, seqDefPcp:1234, seqFailPcp:1234, idcardReinstDays:1234, familyAffiliation:'sample data', useApcEditor:'sample data', editType:'sample data', useApcGrouper:'sample data', grouperAction:'sample data', grouperReasonCode:'sample data', useApcPricer:'sample data', pricerAction:'sample data', pricerReasonCode:'sample data', pricerNotCovReason:'sample data', interestDeterminant:'sample data', useResetDateFlag:'sample data', intDscntPaySub:'sample data', calcIntDscnt:'sample data', applyUncleanInd:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', waiveMatchOrder:'sample data', certifiedFlg:'sample data', ageFrom:1234, ageThrough:1234, siteFlg:'sample data', mcIndicator:'sample data', dateOfDeathRule:'sample data', penApplyUncleanInd:'sample data'},
       {lineOfBusiness:'sample data', description:'sample data', name:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', phoneNumber:'sample data', faxNumber:'sample data', pricePriorityRule:'sample data', providerDefault:1234, pcpRequired:'sample data', eobPrintFlag:'sample data', subDepEditSwitch:'sample data', claimDupRule:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', performAuthClaimMatch:'sample data', authClaimMatchDaysBefore:1234, authClaimMatchDaysAfter:1234, coveringProvInd:'sample data', country:'sample data', inclmSwitch:'sample data', performAuthWaive:'sample data', authLevel:'sample data', allowedGreaterThanBilled:'sample data', targetRevCodeEditFlg:'sample data', targetRevAction:'sample data', targetRevReason:'sample data', parReasonCode:'sample data', nonParReasonCode:'sample data', indPcpMaxEnrollLmt:1234, indPcpThreshold:1234, seqDefPcp:1234, seqFailPcp:1234, idcardReinstDays:1234, familyAffiliation:'sample data', useApcEditor:'sample data', editType:'sample data', useApcGrouper:'sample data', grouperAction:'sample data', grouperReasonCode:'sample data', useApcPricer:'sample data', pricerAction:'sample data', pricerReasonCode:'sample data', pricerNotCovReason:'sample data', interestDeterminant:'sample data', useResetDateFlag:'sample data', intDscntPaySub:'sample data', calcIntDscnt:'sample data', applyUncleanInd:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', waiveMatchOrder:'sample data', certifiedFlg:'sample data', ageFrom:1234, ageThrough:1234, siteFlg:'sample data', mcIndicator:'sample data', dateOfDeathRule:'sample data', penApplyUncleanInd:'sample data'}

      ];
      service.getLinesOfBusinessMaster().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/linesofbusinessmaster/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(lineOfBusinessMaster);
    });
  });


  describe('#createLineOfBusinessMaster', () => {
    var id = 1;
    it('should return an Promise<LineOfBusinessMaster>', () => {
      const lineOfBusinessMaster: LineOfBusinessMaster = {lineOfBusiness:'sample data', description:'sample data', name:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', phoneNumber:'sample data', faxNumber:'sample data', pricePriorityRule:'sample data', providerDefault:1234, pcpRequired:'sample data', eobPrintFlag:'sample data', subDepEditSwitch:'sample data', claimDupRule:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', performAuthClaimMatch:'sample data', authClaimMatchDaysBefore:1234, authClaimMatchDaysAfter:1234, coveringProvInd:'sample data', country:'sample data', inclmSwitch:'sample data', performAuthWaive:'sample data', authLevel:'sample data', allowedGreaterThanBilled:'sample data', targetRevCodeEditFlg:'sample data', targetRevAction:'sample data', targetRevReason:'sample data', parReasonCode:'sample data', nonParReasonCode:'sample data', indPcpMaxEnrollLmt:1234, indPcpThreshold:1234, seqDefPcp:1234, seqFailPcp:1234, idcardReinstDays:1234, familyAffiliation:'sample data', useApcEditor:'sample data', editType:'sample data', useApcGrouper:'sample data', grouperAction:'sample data', grouperReasonCode:'sample data', useApcPricer:'sample data', pricerAction:'sample data', pricerReasonCode:'sample data', pricerNotCovReason:'sample data', interestDeterminant:'sample data', useResetDateFlag:'sample data', intDscntPaySub:'sample data', calcIntDscnt:'sample data', applyUncleanInd:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', waiveMatchOrder:'sample data', certifiedFlg:'sample data', ageFrom:1234, ageThrough:1234, siteFlg:'sample data', mcIndicator:'sample data', dateOfDeathRule:'sample data', penApplyUncleanInd:'sample data'};
      service.createLineOfBusinessMaster(lineOfBusinessMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/linesofbusinessmaster`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateLineOfBusinessMaster', () => {
    var id = 1;
    it('should return an Promise<LineOfBusinessMaster>', () => {
      const lineOfBusinessMaster: LineOfBusinessMaster = {lineOfBusiness:'sample data', description:'sample data', name:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', phoneNumber:'sample data', faxNumber:'sample data', pricePriorityRule:'sample data', providerDefault:1234, pcpRequired:'sample data', eobPrintFlag:'sample data', subDepEditSwitch:'sample data', claimDupRule:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', performAuthClaimMatch:'sample data', authClaimMatchDaysBefore:1234, authClaimMatchDaysAfter:1234, coveringProvInd:'sample data', country:'sample data', inclmSwitch:'sample data', performAuthWaive:'sample data', authLevel:'sample data', allowedGreaterThanBilled:'sample data', targetRevCodeEditFlg:'sample data', targetRevAction:'sample data', targetRevReason:'sample data', parReasonCode:'sample data', nonParReasonCode:'sample data', indPcpMaxEnrollLmt:1234, indPcpThreshold:1234, seqDefPcp:1234, seqFailPcp:1234, idcardReinstDays:1234, familyAffiliation:'sample data', useApcEditor:'sample data', editType:'sample data', useApcGrouper:'sample data', grouperAction:'sample data', grouperReasonCode:'sample data', useApcPricer:'sample data', pricerAction:'sample data', pricerReasonCode:'sample data', pricerNotCovReason:'sample data', interestDeterminant:'sample data', useResetDateFlag:'sample data', intDscntPaySub:'sample data', calcIntDscnt:'sample data', applyUncleanInd:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDate1:'2018-01-01', userDate2:'2018-01-01', waiveMatchOrder:'sample data', certifiedFlg:'sample data', ageFrom:1234, ageThrough:1234, siteFlg:'sample data', mcIndicator:'sample data', dateOfDeathRule:'sample data', penApplyUncleanInd:'sample data'};
      service.updateLineOfBusinessMaster(lineOfBusinessMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/linesofbusinessmaster/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteLineOfBusinessMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteLineOfBusinessMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/linesofbusinessmaster/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});