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

import { MemberEligHistoryEdiService } from './member-elig-history-edi.service';
import { MemberEligHistoryEdi } from '../api-models/member-elig-history-edi.model'
import { MemberEligHistoryEdis } from "../api-models/testing/fake-member-elig-history-edi.model"

describe('MemberEligHistoryEdiService', () => {
  let injector: TestBed;
  let service: MemberEligHistoryEdiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemberEligHistoryEdiService]
    });
    injector = getTestBed();
    service = injector.get(MemberEligHistoryEdiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMemberEligHistoryEdis', () => {
    it('should return an Promise<MemberEligHistoryEdi[]>', () => {
      const memberEligHistoryEdi = [
       {transactionSetId:'sample data', seqEligHist:1234, seqMembId:1234, seqSubsId:1234, subscriberId:'sample data', personNumber:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', relationshipCode:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', riderCode1:'sample data', riderCode2:'sample data', riderCode3:'sample data', riderCode4:'sample data', riderCode5:'sample data', riderCode6:'sample data', riderCode7:'sample data', riderCode8:'sample data', medicareStatusFlg:'sample data', otherStatusFlag:'sample data', hireDate:'2018-01-01', eligStatus:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', seqProvId:1234, ipaId:'sample data', panelId:'sample data', seqProv2Id:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', riderCode9:'sample data', riderCode10:'sample data', riderCode11:'sample data', riderCode12:'sample data', riderCode13:'sample data', riderCode14:'sample data', riderCode15:'sample data', riderCode16:'sample data', riderCode17:'sample data', riderCode18:'sample data', riderCode19:'sample data', riderCode20:'sample data'},
       {transactionSetId:'sample data', seqEligHist:1234, seqMembId:1234, seqSubsId:1234, subscriberId:'sample data', personNumber:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', relationshipCode:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', riderCode1:'sample data', riderCode2:'sample data', riderCode3:'sample data', riderCode4:'sample data', riderCode5:'sample data', riderCode6:'sample data', riderCode7:'sample data', riderCode8:'sample data', medicareStatusFlg:'sample data', otherStatusFlag:'sample data', hireDate:'2018-01-01', eligStatus:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', seqProvId:1234, ipaId:'sample data', panelId:'sample data', seqProv2Id:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', riderCode9:'sample data', riderCode10:'sample data', riderCode11:'sample data', riderCode12:'sample data', riderCode13:'sample data', riderCode14:'sample data', riderCode15:'sample data', riderCode16:'sample data', riderCode17:'sample data', riderCode18:'sample data', riderCode19:'sample data', riderCode20:'sample data'},
       {transactionSetId:'sample data', seqEligHist:1234, seqMembId:1234, seqSubsId:1234, subscriberId:'sample data', personNumber:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', relationshipCode:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', riderCode1:'sample data', riderCode2:'sample data', riderCode3:'sample data', riderCode4:'sample data', riderCode5:'sample data', riderCode6:'sample data', riderCode7:'sample data', riderCode8:'sample data', medicareStatusFlg:'sample data', otherStatusFlag:'sample data', hireDate:'2018-01-01', eligStatus:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', seqProvId:1234, ipaId:'sample data', panelId:'sample data', seqProv2Id:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', riderCode9:'sample data', riderCode10:'sample data', riderCode11:'sample data', riderCode12:'sample data', riderCode13:'sample data', riderCode14:'sample data', riderCode15:'sample data', riderCode16:'sample data', riderCode17:'sample data', riderCode18:'sample data', riderCode19:'sample data', riderCode20:'sample data'}

      ];
      service.getMemberEligHistoryEdis().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/memberelighistoryedis/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(memberEligHistoryEdi);
    });
  });


  describe('#createMemberEligHistoryEdi', () => {
    var id = 1;
    it('should return an Promise<MemberEligHistoryEdi>', () => {
      const memberEligHistoryEdi: MemberEligHistoryEdi = {transactionSetId:'sample data', seqEligHist:1234, seqMembId:1234, seqSubsId:1234, subscriberId:'sample data', personNumber:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', relationshipCode:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', riderCode1:'sample data', riderCode2:'sample data', riderCode3:'sample data', riderCode4:'sample data', riderCode5:'sample data', riderCode6:'sample data', riderCode7:'sample data', riderCode8:'sample data', medicareStatusFlg:'sample data', otherStatusFlag:'sample data', hireDate:'2018-01-01', eligStatus:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', seqProvId:1234, ipaId:'sample data', panelId:'sample data', seqProv2Id:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', riderCode9:'sample data', riderCode10:'sample data', riderCode11:'sample data', riderCode12:'sample data', riderCode13:'sample data', riderCode14:'sample data', riderCode15:'sample data', riderCode16:'sample data', riderCode17:'sample data', riderCode18:'sample data', riderCode19:'sample data', riderCode20:'sample data'};
      service.createMemberEligHistoryEdi(memberEligHistoryEdi).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberelighistoryedis`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMemberEligHistoryEdi', () => {
    var id = 1;
    it('should return an Promise<MemberEligHistoryEdi>', () => {
      const memberEligHistoryEdi: MemberEligHistoryEdi = {transactionSetId:'sample data', seqEligHist:1234, seqMembId:1234, seqSubsId:1234, subscriberId:'sample data', personNumber:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', termReason:'sample data', relationshipCode:'sample data', seqGroupId:1234, planCode:'sample data', lineOfBusiness:'sample data', riderCode1:'sample data', riderCode2:'sample data', riderCode3:'sample data', riderCode4:'sample data', riderCode5:'sample data', riderCode6:'sample data', riderCode7:'sample data', riderCode8:'sample data', medicareStatusFlg:'sample data', otherStatusFlag:'sample data', hireDate:'2018-01-01', eligStatus:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', seqProvId:1234, ipaId:'sample data', panelId:'sample data', seqProv2Id:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', riderCode9:'sample data', riderCode10:'sample data', riderCode11:'sample data', riderCode12:'sample data', riderCode13:'sample data', riderCode14:'sample data', riderCode15:'sample data', riderCode16:'sample data', riderCode17:'sample data', riderCode18:'sample data', riderCode19:'sample data', riderCode20:'sample data'};
      service.updateMemberEligHistoryEdi(memberEligHistoryEdi, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberelighistoryedis/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMemberEligHistoryEdi', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMemberEligHistoryEdi(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberelighistoryedis/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});