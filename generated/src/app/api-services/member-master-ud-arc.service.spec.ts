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

import { MemberMasterUdArcService } from './member-master-ud-arc.service';
import { MemberMasterUdArc } from '../api-models/member-master-ud-arc.model'
import { MemberMasterUdArcs } from "../api-models/testing/fake-member-master-ud-arc.model"

describe('MemberMasterUdArcService', () => {
  let injector: TestBed;
  let service: MemberMasterUdArcService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemberMasterUdArcService]
    });
    injector = getTestBed();
    service = injector.get(MemberMasterUdArcService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMemberMasterUdArcs', () => {
    it('should return an Promise<MemberMasterUdArc[]>', () => {
      const memberMasterUdArc = [
       {residencyLocationCode:'sample data', comments:'sample data', dubaiWorkLocationCode:'sample data', uaeVisaStartDate:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', userDate10:'2018-01-01', userDate9:'2018-01-01', userDate8:'2018-01-01', userDate7:'2018-01-01', userDate6:'2018-01-01', userDate5:'2018-01-01', userDate4:'2018-01-01', userDate3:'2018-01-01', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined25:'sample data', userDefined24:'sample data', userDefined23:'sample data', userDefined22:'sample data', userDefined21:'sample data', userDefined20:'sample data', userDefined19:'sample data', userDefined18:'sample data', userDefined17:'sample data', userDefined16:'sample data', userDefined15:'sample data', userDefined14:'sample data', userDefined13:'sample data', userDefined12:'sample data', userDefined11:'sample data', userDefined10:'sample data', userDefined9:'sample data', userDefined8:'sample data', userDefined7:'sample data', userDefined6:'sample data', userDefined5:'sample data', userDefined4:'sample data', userDefined3:'sample data', userDefined2:'sample data', userDefined1:'sample data', preferredCurrency:'sample data', ksaProfession:'sample data', sponsorIdType:'sample data', sponsorIdIssueLoc:'sample data', sponsorId:'sample data', governmentIdType:'sample data', governmentIdIssueLoc:'sample data', governmentIdExpireDate:'2018-01-01', governmentId:'sample data', emirateIdIssueLoc:'sample data', emirateIdExpireDate:'2018-01-01', emirateIdNo:'sample data', ksaNationality:'sample data', passportIssueLoc:'sample data', passportExpireDate:'2018-01-01', passportNumber:'sample data', personNumber:'sample data', subscriberId:'sample data', seqSubsId:1234, seqMembId:1234, changeType:'sample data', changeDateTime:'2018-01-01'},
       {residencyLocationCode:'sample data', comments:'sample data', dubaiWorkLocationCode:'sample data', uaeVisaStartDate:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', userDate10:'2018-01-01', userDate9:'2018-01-01', userDate8:'2018-01-01', userDate7:'2018-01-01', userDate6:'2018-01-01', userDate5:'2018-01-01', userDate4:'2018-01-01', userDate3:'2018-01-01', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined25:'sample data', userDefined24:'sample data', userDefined23:'sample data', userDefined22:'sample data', userDefined21:'sample data', userDefined20:'sample data', userDefined19:'sample data', userDefined18:'sample data', userDefined17:'sample data', userDefined16:'sample data', userDefined15:'sample data', userDefined14:'sample data', userDefined13:'sample data', userDefined12:'sample data', userDefined11:'sample data', userDefined10:'sample data', userDefined9:'sample data', userDefined8:'sample data', userDefined7:'sample data', userDefined6:'sample data', userDefined5:'sample data', userDefined4:'sample data', userDefined3:'sample data', userDefined2:'sample data', userDefined1:'sample data', preferredCurrency:'sample data', ksaProfession:'sample data', sponsorIdType:'sample data', sponsorIdIssueLoc:'sample data', sponsorId:'sample data', governmentIdType:'sample data', governmentIdIssueLoc:'sample data', governmentIdExpireDate:'2018-01-01', governmentId:'sample data', emirateIdIssueLoc:'sample data', emirateIdExpireDate:'2018-01-01', emirateIdNo:'sample data', ksaNationality:'sample data', passportIssueLoc:'sample data', passportExpireDate:'2018-01-01', passportNumber:'sample data', personNumber:'sample data', subscriberId:'sample data', seqSubsId:1234, seqMembId:1234, changeType:'sample data', changeDateTime:'2018-01-01'},
       {residencyLocationCode:'sample data', comments:'sample data', dubaiWorkLocationCode:'sample data', uaeVisaStartDate:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', userDate10:'2018-01-01', userDate9:'2018-01-01', userDate8:'2018-01-01', userDate7:'2018-01-01', userDate6:'2018-01-01', userDate5:'2018-01-01', userDate4:'2018-01-01', userDate3:'2018-01-01', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined25:'sample data', userDefined24:'sample data', userDefined23:'sample data', userDefined22:'sample data', userDefined21:'sample data', userDefined20:'sample data', userDefined19:'sample data', userDefined18:'sample data', userDefined17:'sample data', userDefined16:'sample data', userDefined15:'sample data', userDefined14:'sample data', userDefined13:'sample data', userDefined12:'sample data', userDefined11:'sample data', userDefined10:'sample data', userDefined9:'sample data', userDefined8:'sample data', userDefined7:'sample data', userDefined6:'sample data', userDefined5:'sample data', userDefined4:'sample data', userDefined3:'sample data', userDefined2:'sample data', userDefined1:'sample data', preferredCurrency:'sample data', ksaProfession:'sample data', sponsorIdType:'sample data', sponsorIdIssueLoc:'sample data', sponsorId:'sample data', governmentIdType:'sample data', governmentIdIssueLoc:'sample data', governmentIdExpireDate:'2018-01-01', governmentId:'sample data', emirateIdIssueLoc:'sample data', emirateIdExpireDate:'2018-01-01', emirateIdNo:'sample data', ksaNationality:'sample data', passportIssueLoc:'sample data', passportExpireDate:'2018-01-01', passportNumber:'sample data', personNumber:'sample data', subscriberId:'sample data', seqSubsId:1234, seqMembId:1234, changeType:'sample data', changeDateTime:'2018-01-01'}

      ];
      service.getMemberMasterUdArcs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/membermasterudarcs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(memberMasterUdArc);
    });
  });


  describe('#createMemberMasterUdArc', () => {
    var id = 1;
    it('should return an Promise<MemberMasterUdArc>', () => {
      const memberMasterUdArc: MemberMasterUdArc = {residencyLocationCode:'sample data', comments:'sample data', dubaiWorkLocationCode:'sample data', uaeVisaStartDate:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', userDate10:'2018-01-01', userDate9:'2018-01-01', userDate8:'2018-01-01', userDate7:'2018-01-01', userDate6:'2018-01-01', userDate5:'2018-01-01', userDate4:'2018-01-01', userDate3:'2018-01-01', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined25:'sample data', userDefined24:'sample data', userDefined23:'sample data', userDefined22:'sample data', userDefined21:'sample data', userDefined20:'sample data', userDefined19:'sample data', userDefined18:'sample data', userDefined17:'sample data', userDefined16:'sample data', userDefined15:'sample data', userDefined14:'sample data', userDefined13:'sample data', userDefined12:'sample data', userDefined11:'sample data', userDefined10:'sample data', userDefined9:'sample data', userDefined8:'sample data', userDefined7:'sample data', userDefined6:'sample data', userDefined5:'sample data', userDefined4:'sample data', userDefined3:'sample data', userDefined2:'sample data', userDefined1:'sample data', preferredCurrency:'sample data', ksaProfession:'sample data', sponsorIdType:'sample data', sponsorIdIssueLoc:'sample data', sponsorId:'sample data', governmentIdType:'sample data', governmentIdIssueLoc:'sample data', governmentIdExpireDate:'2018-01-01', governmentId:'sample data', emirateIdIssueLoc:'sample data', emirateIdExpireDate:'2018-01-01', emirateIdNo:'sample data', ksaNationality:'sample data', passportIssueLoc:'sample data', passportExpireDate:'2018-01-01', passportNumber:'sample data', personNumber:'sample data', subscriberId:'sample data', seqSubsId:1234, seqMembId:1234, changeType:'sample data', changeDateTime:'2018-01-01'};
      service.createMemberMasterUdArc(memberMasterUdArc).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/membermasterudarcs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMemberMasterUdArc', () => {
    var id = 1;
    it('should return an Promise<MemberMasterUdArc>', () => {
      const memberMasterUdArc: MemberMasterUdArc = {residencyLocationCode:'sample data', comments:'sample data', dubaiWorkLocationCode:'sample data', uaeVisaStartDate:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', userDate10:'2018-01-01', userDate9:'2018-01-01', userDate8:'2018-01-01', userDate7:'2018-01-01', userDate6:'2018-01-01', userDate5:'2018-01-01', userDate4:'2018-01-01', userDate3:'2018-01-01', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined25:'sample data', userDefined24:'sample data', userDefined23:'sample data', userDefined22:'sample data', userDefined21:'sample data', userDefined20:'sample data', userDefined19:'sample data', userDefined18:'sample data', userDefined17:'sample data', userDefined16:'sample data', userDefined15:'sample data', userDefined14:'sample data', userDefined13:'sample data', userDefined12:'sample data', userDefined11:'sample data', userDefined10:'sample data', userDefined9:'sample data', userDefined8:'sample data', userDefined7:'sample data', userDefined6:'sample data', userDefined5:'sample data', userDefined4:'sample data', userDefined3:'sample data', userDefined2:'sample data', userDefined1:'sample data', preferredCurrency:'sample data', ksaProfession:'sample data', sponsorIdType:'sample data', sponsorIdIssueLoc:'sample data', sponsorId:'sample data', governmentIdType:'sample data', governmentIdIssueLoc:'sample data', governmentIdExpireDate:'2018-01-01', governmentId:'sample data', emirateIdIssueLoc:'sample data', emirateIdExpireDate:'2018-01-01', emirateIdNo:'sample data', ksaNationality:'sample data', passportIssueLoc:'sample data', passportExpireDate:'2018-01-01', passportNumber:'sample data', personNumber:'sample data', subscriberId:'sample data', seqSubsId:1234, seqMembId:1234, changeType:'sample data', changeDateTime:'2018-01-01'};
      service.updateMemberMasterUdArc(memberMasterUdArc, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/membermasterudarcs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMemberMasterUdArc', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMemberMasterUdArc(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/membermasterudarcs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});