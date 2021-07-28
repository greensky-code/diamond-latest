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

import { MemberMasterEdiService } from './member-master-edi.service';
import { MemberMasterEdi } from '../api-models/member-master-edi.model'
import { MemberMasterEdis } from "../api-models/testing/fake-member-master-edi.model"

describe('MemberMasterEdiService', () => {
  let injector: TestBed;
  let service: MemberMasterEdiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemberMasterEdiService]
    });
    injector = getTestBed();
    service = injector.get(MemberMasterEdiService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMemberMasterEdis', () => {
    it('should return an Promise<MemberMasterEdi[]>', () => {
      const memberMasterEdi = [
       {transactionSetId:'sample data', seqMembId:1234, seqSubsId:1234, subscriberId:'sample data', personNumber:'sample data', lastName:'sample data', firstName:'sample data', middleInitial:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', homePhoneNumber:'sample data', busPhoneNumber:'sample data', contactTitle:'sample data', dateOfBirth:'2018-01-01', gender:'sample data', maritalStatus:'sample data', languageCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', medicareNo:'sample data', medicaidNo:'sample data', socialSecNo:'sample data', employeeNo:'sample data', medicalRecNo:'sample data', seqAltMembId:1234, holdReason:'sample data', holdDate:'2018-01-01', depVerifStatus:'sample data', akaLastName:'sample data', akaFirstName:'sample data', akaAddressLine1:'sample data', akaAddressLine2:'sample data', akaCity:'sample data', akaState:'sample data', akaZipCode:'sample data', akaPhoneNumber:'sample data', respLastName:'sample data', respFirstName:'sample data', respAddressLine1:'sample data', respAddressLine2:'sample data', respCity:'sample data', respState:'sample data', respZipCode:'sample data', respPhoneNumber:'sample data', verfiedThruDate:'2018-01-01', subsUpdate:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', caseManagementSwitch:'sample data', akaCountry:'sample data', respCountry:'sample data', country:'sample data'},
       {transactionSetId:'sample data', seqMembId:1234, seqSubsId:1234, subscriberId:'sample data', personNumber:'sample data', lastName:'sample data', firstName:'sample data', middleInitial:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', homePhoneNumber:'sample data', busPhoneNumber:'sample data', contactTitle:'sample data', dateOfBirth:'2018-01-01', gender:'sample data', maritalStatus:'sample data', languageCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', medicareNo:'sample data', medicaidNo:'sample data', socialSecNo:'sample data', employeeNo:'sample data', medicalRecNo:'sample data', seqAltMembId:1234, holdReason:'sample data', holdDate:'2018-01-01', depVerifStatus:'sample data', akaLastName:'sample data', akaFirstName:'sample data', akaAddressLine1:'sample data', akaAddressLine2:'sample data', akaCity:'sample data', akaState:'sample data', akaZipCode:'sample data', akaPhoneNumber:'sample data', respLastName:'sample data', respFirstName:'sample data', respAddressLine1:'sample data', respAddressLine2:'sample data', respCity:'sample data', respState:'sample data', respZipCode:'sample data', respPhoneNumber:'sample data', verfiedThruDate:'2018-01-01', subsUpdate:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', caseManagementSwitch:'sample data', akaCountry:'sample data', respCountry:'sample data', country:'sample data'},
       {transactionSetId:'sample data', seqMembId:1234, seqSubsId:1234, subscriberId:'sample data', personNumber:'sample data', lastName:'sample data', firstName:'sample data', middleInitial:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', homePhoneNumber:'sample data', busPhoneNumber:'sample data', contactTitle:'sample data', dateOfBirth:'2018-01-01', gender:'sample data', maritalStatus:'sample data', languageCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', medicareNo:'sample data', medicaidNo:'sample data', socialSecNo:'sample data', employeeNo:'sample data', medicalRecNo:'sample data', seqAltMembId:1234, holdReason:'sample data', holdDate:'2018-01-01', depVerifStatus:'sample data', akaLastName:'sample data', akaFirstName:'sample data', akaAddressLine1:'sample data', akaAddressLine2:'sample data', akaCity:'sample data', akaState:'sample data', akaZipCode:'sample data', akaPhoneNumber:'sample data', respLastName:'sample data', respFirstName:'sample data', respAddressLine1:'sample data', respAddressLine2:'sample data', respCity:'sample data', respState:'sample data', respZipCode:'sample data', respPhoneNumber:'sample data', verfiedThruDate:'2018-01-01', subsUpdate:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', caseManagementSwitch:'sample data', akaCountry:'sample data', respCountry:'sample data', country:'sample data'}

      ];
      service.getMemberMasterEdis().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/membermasteredis/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(memberMasterEdi);
    });
  });


  describe('#createMemberMasterEdi', () => {
    var id = 1;
    it('should return an Promise<MemberMasterEdi>', () => {
      const memberMasterEdi: MemberMasterEdi = {transactionSetId:'sample data', seqMembId:1234, seqSubsId:1234, subscriberId:'sample data', personNumber:'sample data', lastName:'sample data', firstName:'sample data', middleInitial:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', homePhoneNumber:'sample data', busPhoneNumber:'sample data', contactTitle:'sample data', dateOfBirth:'2018-01-01', gender:'sample data', maritalStatus:'sample data', languageCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', medicareNo:'sample data', medicaidNo:'sample data', socialSecNo:'sample data', employeeNo:'sample data', medicalRecNo:'sample data', seqAltMembId:1234, holdReason:'sample data', holdDate:'2018-01-01', depVerifStatus:'sample data', akaLastName:'sample data', akaFirstName:'sample data', akaAddressLine1:'sample data', akaAddressLine2:'sample data', akaCity:'sample data', akaState:'sample data', akaZipCode:'sample data', akaPhoneNumber:'sample data', respLastName:'sample data', respFirstName:'sample data', respAddressLine1:'sample data', respAddressLine2:'sample data', respCity:'sample data', respState:'sample data', respZipCode:'sample data', respPhoneNumber:'sample data', verfiedThruDate:'2018-01-01', subsUpdate:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', caseManagementSwitch:'sample data', akaCountry:'sample data', respCountry:'sample data', country:'sample data'};
      service.createMemberMasterEdi(memberMasterEdi).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/membermasteredis`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMemberMasterEdi', () => {
    var id = 1;
    it('should return an Promise<MemberMasterEdi>', () => {
      const memberMasterEdi: MemberMasterEdi = {transactionSetId:'sample data', seqMembId:1234, seqSubsId:1234, subscriberId:'sample data', personNumber:'sample data', lastName:'sample data', firstName:'sample data', middleInitial:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', homePhoneNumber:'sample data', busPhoneNumber:'sample data', contactTitle:'sample data', dateOfBirth:'2018-01-01', gender:'sample data', maritalStatus:'sample data', languageCode:'sample data', userDefined1:'sample data', userDefined2:'sample data', medicareNo:'sample data', medicaidNo:'sample data', socialSecNo:'sample data', employeeNo:'sample data', medicalRecNo:'sample data', seqAltMembId:1234, holdReason:'sample data', holdDate:'2018-01-01', depVerifStatus:'sample data', akaLastName:'sample data', akaFirstName:'sample data', akaAddressLine1:'sample data', akaAddressLine2:'sample data', akaCity:'sample data', akaState:'sample data', akaZipCode:'sample data', akaPhoneNumber:'sample data', respLastName:'sample data', respFirstName:'sample data', respAddressLine1:'sample data', respAddressLine2:'sample data', respCity:'sample data', respState:'sample data', respZipCode:'sample data', respPhoneNumber:'sample data', verfiedThruDate:'2018-01-01', subsUpdate:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', caseManagementSwitch:'sample data', akaCountry:'sample data', respCountry:'sample data', country:'sample data'};
      service.updateMemberMasterEdi(memberMasterEdi, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/membermasteredis/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMemberMasterEdi', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMemberMasterEdi(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/membermasteredis/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});