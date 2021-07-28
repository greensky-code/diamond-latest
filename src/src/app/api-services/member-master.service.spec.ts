/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router'
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment'
import { RouterTestingModule } from '@angular/router/testing';

import { MemberMasterService } from './member-master.service';
import { MemberMaster } from '../api-models/member-master.model'

describe('MemberMasterService', () => {
  let injector: TestBed;
  let service: MemberMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemberMasterService]
    });
    injector = getTestBed();
    service = injector.get(MemberMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMemberMasters', () => {
    it('should return an Promise<MemberMaster[]>', () => {
      const memberMaster = [
       {cobVerifUserDate2:'2018-01-01', cobVerifUserDate1:'2018-01-01', cobVerifUserDefined2:'sample data', cobVerifUserDefined1:'sample data', depVerifUserDate2:'2018-01-01', depVerifUserDate1:'2018-01-01', depVerifUserDefined2:'sample data', depVerifUserDefined1:'sample data', studentStatusDetail:'sample data', mcIndicator:'sample data', privCountry:'sample data', privPhoneNumber:'sample data', privZipCode:'sample data', privState:'sample data', privCity:'sample data', privAddressLine2:'sample data', privAddressLine1:'sample data', privFirstName:'sample data', privLastName:'sample data', geoResult:'sample data', latitude:1234, longitude:1234, userDate20:'2018-01-01', userDate19:'2018-01-01', userDate18:'2018-01-01', userDate17:'2018-01-01', userDate16:'2018-01-01', userDate15:'2018-01-01', userDate14:'2018-01-01', userDate13:'2018-01-01', userDate12:'2018-01-01', userDate11:'2018-01-01', userDate10:'2018-01-01', userDate9:'2018-01-01', userDate8:'2018-01-01', userDate7:'2018-01-01', userDate6:'2018-01-01', userDate5:'2018-01-01', userDate4:'2018-01-01', userDate3:'2018-01-01', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined22:'sample data', userDefined21:'sample data', userDefined20:'sample data', userDefined19:'sample data', userDefined18:'sample data', userDefined17:'sample data', userDefined16:'sample data', userDefined15:'sample data', userDefined14:'sample data', userDefined13:'sample data', userDefined12:'sample data', userDefined11:'sample data', userDefined10:'sample data', userDefined9:'sample data', userDefined8:'sample data', userDefined7:'sample data', userDefined6:'sample data', userDefined5:'sample data', userDefined4:'sample data', userDefined3:'sample data', employmentStatusCode:'sample data', verifStatusCode:'sample data', verifFollowUpDate:'2018-01-01', verifOthCoverDate:'2018-01-01', dualCoverageFlag:'sample data', diamondId:'sample data', subscIdChangeRequestDate:'2018-01-01', subscIdChangeRequestUser:'sample data', prevSubscriberId:'sample data', country:'sample data', respCountry:'sample data', akaCountry:'sample data', caseManagementSwitch:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', subsUpdate:'sample data', verfiedThruDate:'2018-01-01', respPhoneNumber:'sample data', respZipCode:'sample data', respState:'sample data', respCity:'sample data', respAddressLine2:'sample data', respAddressLine1:'sample data', respFirstName:'sample data', respLastName:'sample data', akaPhoneNumber:'sample data', akaZipCode:'sample data', akaState:'sample data', akaCity:'sample data', akaAddressLine2:'sample data', akaAddressLine1:'sample data', akaFirstName:'sample data', akaLastName:'sample data', depVerifStatus:'sample data', holdDate:'2018-01-01', holdReason:'sample data', seqAltMembId:1234, medicalRecNo:'sample data', employeeNo:'sample data', socialSecNo:'sample data', medicaidNo:'sample data', medicareNo:'sample data', userDefined2:'sample data', userDefined1:'sample data', languageCode:'sample data', maritalStatus:'sample data', gender:'sample data', dateOfBirth:'2018-01-01', contactTitle:'sample data', busPhoneNumber:'sample data', homePhoneNumber:'sample data', zipCode:'sample data', state:'sample data', city:'sample data', addressLine2:'sample data', addressLine1:'sample data', middleInitial:'sample data', firstName:'sample data', lastName:'sample data', personNumber:'sample data', subscriberId:'sample data', seqSubsId:1234, seqMembId:1234},
       {cobVerifUserDate2:'2018-01-01', cobVerifUserDate1:'2018-01-01', cobVerifUserDefined2:'sample data', cobVerifUserDefined1:'sample data', depVerifUserDate2:'2018-01-01', depVerifUserDate1:'2018-01-01', depVerifUserDefined2:'sample data', depVerifUserDefined1:'sample data', studentStatusDetail:'sample data', mcIndicator:'sample data', privCountry:'sample data', privPhoneNumber:'sample data', privZipCode:'sample data', privState:'sample data', privCity:'sample data', privAddressLine2:'sample data', privAddressLine1:'sample data', privFirstName:'sample data', privLastName:'sample data', geoResult:'sample data', latitude:1234, longitude:1234, userDate20:'2018-01-01', userDate19:'2018-01-01', userDate18:'2018-01-01', userDate17:'2018-01-01', userDate16:'2018-01-01', userDate15:'2018-01-01', userDate14:'2018-01-01', userDate13:'2018-01-01', userDate12:'2018-01-01', userDate11:'2018-01-01', userDate10:'2018-01-01', userDate9:'2018-01-01', userDate8:'2018-01-01', userDate7:'2018-01-01', userDate6:'2018-01-01', userDate5:'2018-01-01', userDate4:'2018-01-01', userDate3:'2018-01-01', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined22:'sample data', userDefined21:'sample data', userDefined20:'sample data', userDefined19:'sample data', userDefined18:'sample data', userDefined17:'sample data', userDefined16:'sample data', userDefined15:'sample data', userDefined14:'sample data', userDefined13:'sample data', userDefined12:'sample data', userDefined11:'sample data', userDefined10:'sample data', userDefined9:'sample data', userDefined8:'sample data', userDefined7:'sample data', userDefined6:'sample data', userDefined5:'sample data', userDefined4:'sample data', userDefined3:'sample data', employmentStatusCode:'sample data', verifStatusCode:'sample data', verifFollowUpDate:'2018-01-01', verifOthCoverDate:'2018-01-01', dualCoverageFlag:'sample data', diamondId:'sample data', subscIdChangeRequestDate:'2018-01-01', subscIdChangeRequestUser:'sample data', prevSubscriberId:'sample data', country:'sample data', respCountry:'sample data', akaCountry:'sample data', caseManagementSwitch:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', subsUpdate:'sample data', verfiedThruDate:'2018-01-01', respPhoneNumber:'sample data', respZipCode:'sample data', respState:'sample data', respCity:'sample data', respAddressLine2:'sample data', respAddressLine1:'sample data', respFirstName:'sample data', respLastName:'sample data', akaPhoneNumber:'sample data', akaZipCode:'sample data', akaState:'sample data', akaCity:'sample data', akaAddressLine2:'sample data', akaAddressLine1:'sample data', akaFirstName:'sample data', akaLastName:'sample data', depVerifStatus:'sample data', holdDate:'2018-01-01', holdReason:'sample data', seqAltMembId:1234, medicalRecNo:'sample data', employeeNo:'sample data', socialSecNo:'sample data', medicaidNo:'sample data', medicareNo:'sample data', userDefined2:'sample data', userDefined1:'sample data', languageCode:'sample data', maritalStatus:'sample data', gender:'sample data', dateOfBirth:'2018-01-01', contactTitle:'sample data', busPhoneNumber:'sample data', homePhoneNumber:'sample data', zipCode:'sample data', state:'sample data', city:'sample data', addressLine2:'sample data', addressLine1:'sample data', middleInitial:'sample data', firstName:'sample data', lastName:'sample data', personNumber:'sample data', subscriberId:'sample data', seqSubsId:1234, seqMembId:1234},
       {cobVerifUserDate2:'2018-01-01', cobVerifUserDate1:'2018-01-01', cobVerifUserDefined2:'sample data', cobVerifUserDefined1:'sample data', depVerifUserDate2:'2018-01-01', depVerifUserDate1:'2018-01-01', depVerifUserDefined2:'sample data', depVerifUserDefined1:'sample data', studentStatusDetail:'sample data', mcIndicator:'sample data', privCountry:'sample data', privPhoneNumber:'sample data', privZipCode:'sample data', privState:'sample data', privCity:'sample data', privAddressLine2:'sample data', privAddressLine1:'sample data', privFirstName:'sample data', privLastName:'sample data', geoResult:'sample data', latitude:1234, longitude:1234, userDate20:'2018-01-01', userDate19:'2018-01-01', userDate18:'2018-01-01', userDate17:'2018-01-01', userDate16:'2018-01-01', userDate15:'2018-01-01', userDate14:'2018-01-01', userDate13:'2018-01-01', userDate12:'2018-01-01', userDate11:'2018-01-01', userDate10:'2018-01-01', userDate9:'2018-01-01', userDate8:'2018-01-01', userDate7:'2018-01-01', userDate6:'2018-01-01', userDate5:'2018-01-01', userDate4:'2018-01-01', userDate3:'2018-01-01', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined22:'sample data', userDefined21:'sample data', userDefined20:'sample data', userDefined19:'sample data', userDefined18:'sample data', userDefined17:'sample data', userDefined16:'sample data', userDefined15:'sample data', userDefined14:'sample data', userDefined13:'sample data', userDefined12:'sample data', userDefined11:'sample data', userDefined10:'sample data', userDefined9:'sample data', userDefined8:'sample data', userDefined7:'sample data', userDefined6:'sample data', userDefined5:'sample data', userDefined4:'sample data', userDefined3:'sample data', employmentStatusCode:'sample data', verifStatusCode:'sample data', verifFollowUpDate:'2018-01-01', verifOthCoverDate:'2018-01-01', dualCoverageFlag:'sample data', diamondId:'sample data', subscIdChangeRequestDate:'2018-01-01', subscIdChangeRequestUser:'sample data', prevSubscriberId:'sample data', country:'sample data', respCountry:'sample data', akaCountry:'sample data', caseManagementSwitch:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', subsUpdate:'sample data', verfiedThruDate:'2018-01-01', respPhoneNumber:'sample data', respZipCode:'sample data', respState:'sample data', respCity:'sample data', respAddressLine2:'sample data', respAddressLine1:'sample data', respFirstName:'sample data', respLastName:'sample data', akaPhoneNumber:'sample data', akaZipCode:'sample data', akaState:'sample data', akaCity:'sample data', akaAddressLine2:'sample data', akaAddressLine1:'sample data', akaFirstName:'sample data', akaLastName:'sample data', depVerifStatus:'sample data', holdDate:'2018-01-01', holdReason:'sample data', seqAltMembId:1234, medicalRecNo:'sample data', employeeNo:'sample data', socialSecNo:'sample data', medicaidNo:'sample data', medicareNo:'sample data', userDefined2:'sample data', userDefined1:'sample data', languageCode:'sample data', maritalStatus:'sample data', gender:'sample data', dateOfBirth:'2018-01-01', contactTitle:'sample data', busPhoneNumber:'sample data', homePhoneNumber:'sample data', zipCode:'sample data', state:'sample data', city:'sample data', addressLine2:'sample data', addressLine1:'sample data', middleInitial:'sample data', firstName:'sample data', lastName:'sample data', personNumber:'sample data', subscriberId:'sample data', seqSubsId:1234, seqMembId:1234}

      ];
      service.getMemberMasters().then(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/membermasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(memberMaster);
    });
  });


  describe('#createMemberMaster', () => {
    var id = 1;
    it('should return an Promise<MemberMaster>', () => {
      const memberMaster: MemberMaster = {cobVerifUserDate2:'2018-01-01', cobVerifUserDate1:'2018-01-01', cobVerifUserDefined2:'sample data', cobVerifUserDefined1:'sample data', depVerifUserDate2:'2018-01-01', depVerifUserDate1:'2018-01-01', depVerifUserDefined2:'sample data', depVerifUserDefined1:'sample data', studentStatusDetail:'sample data', mcIndicator:'sample data', privCountry:'sample data', privPhoneNumber:'sample data', privZipCode:'sample data', privState:'sample data', privCity:'sample data', privAddressLine2:'sample data', privAddressLine1:'sample data', privFirstName:'sample data', privLastName:'sample data', geoResult:'sample data', latitude:1234, longitude:1234, userDate20:'2018-01-01', userDate19:'2018-01-01', userDate18:'2018-01-01', userDate17:'2018-01-01', userDate16:'2018-01-01', userDate15:'2018-01-01', userDate14:'2018-01-01', userDate13:'2018-01-01', userDate12:'2018-01-01', userDate11:'2018-01-01', userDate10:'2018-01-01', userDate9:'2018-01-01', userDate8:'2018-01-01', userDate7:'2018-01-01', userDate6:'2018-01-01', userDate5:'2018-01-01', userDate4:'2018-01-01', userDate3:'2018-01-01', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined22:'sample data', userDefined21:'sample data', userDefined20:'sample data', userDefined19:'sample data', userDefined18:'sample data', userDefined17:'sample data', userDefined16:'sample data', userDefined15:'sample data', userDefined14:'sample data', userDefined13:'sample data', userDefined12:'sample data', userDefined11:'sample data', userDefined10:'sample data', userDefined9:'sample data', userDefined8:'sample data', userDefined7:'sample data', userDefined6:'sample data', userDefined5:'sample data', userDefined4:'sample data', userDefined3:'sample data', employmentStatusCode:'sample data', verifStatusCode:'sample data', verifFollowUpDate:'2018-01-01', verifOthCoverDate:'2018-01-01', dualCoverageFlag:'sample data', diamondId:'sample data', subscIdChangeRequestDate:'2018-01-01', subscIdChangeRequestUser:'sample data', prevSubscriberId:'sample data', country:'sample data', respCountry:'sample data', akaCountry:'sample data', caseManagementSwitch:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', subsUpdate:'sample data', verfiedThruDate:'2018-01-01', respPhoneNumber:'sample data', respZipCode:'sample data', respState:'sample data', respCity:'sample data', respAddressLine2:'sample data', respAddressLine1:'sample data', respFirstName:'sample data', respLastName:'sample data', akaPhoneNumber:'sample data', akaZipCode:'sample data', akaState:'sample data', akaCity:'sample data', akaAddressLine2:'sample data', akaAddressLine1:'sample data', akaFirstName:'sample data', akaLastName:'sample data', depVerifStatus:'sample data', holdDate:'2018-01-01', holdReason:'sample data', seqAltMembId:1234, medicalRecNo:'sample data', employeeNo:'sample data', socialSecNo:'sample data', medicaidNo:'sample data', medicareNo:'sample data', userDefined2:'sample data', userDefined1:'sample data', languageCode:'sample data', maritalStatus:'sample data', gender:'sample data', dateOfBirth:'2018-01-01', contactTitle:'sample data', busPhoneNumber:'sample data', homePhoneNumber:'sample data', zipCode:'sample data', state:'sample data', city:'sample data', addressLine2:'sample data', addressLine1:'sample data', middleInitial:'sample data', firstName:'sample data', lastName:'sample data', personNumber:'sample data', subscriberId:'sample data', seqSubsId:1234, seqMembId:1234};
      service.createMemberMaster(memberMaster).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/membermasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMemberMaster', () => {
    var id = 1;
    it('should return an Promise<MemberMaster>', () => {
      const memberMaster: MemberMaster = {cobVerifUserDate2:'2018-01-01', cobVerifUserDate1:'2018-01-01', cobVerifUserDefined2:'sample data', cobVerifUserDefined1:'sample data', depVerifUserDate2:'2018-01-01', depVerifUserDate1:'2018-01-01', depVerifUserDefined2:'sample data', depVerifUserDefined1:'sample data', studentStatusDetail:'sample data', mcIndicator:'sample data', privCountry:'sample data', privPhoneNumber:'sample data', privZipCode:'sample data', privState:'sample data', privCity:'sample data', privAddressLine2:'sample data', privAddressLine1:'sample data', privFirstName:'sample data', privLastName:'sample data', geoResult:'sample data', latitude:1234, longitude:1234, userDate20:'2018-01-01', userDate19:'2018-01-01', userDate18:'2018-01-01', userDate17:'2018-01-01', userDate16:'2018-01-01', userDate15:'2018-01-01', userDate14:'2018-01-01', userDate13:'2018-01-01', userDate12:'2018-01-01', userDate11:'2018-01-01', userDate10:'2018-01-01', userDate9:'2018-01-01', userDate8:'2018-01-01', userDate7:'2018-01-01', userDate6:'2018-01-01', userDate5:'2018-01-01', userDate4:'2018-01-01', userDate3:'2018-01-01', userDate2:'2018-01-01', userDate1:'2018-01-01', userDefined22:'sample data', userDefined21:'sample data', userDefined20:'sample data', userDefined19:'sample data', userDefined18:'sample data', userDefined17:'sample data', userDefined16:'sample data', userDefined15:'sample data', userDefined14:'sample data', userDefined13:'sample data', userDefined12:'sample data', userDefined11:'sample data', userDefined10:'sample data', userDefined9:'sample data', userDefined8:'sample data', userDefined7:'sample data', userDefined6:'sample data', userDefined5:'sample data', userDefined4:'sample data', userDefined3:'sample data', employmentStatusCode:'sample data', verifStatusCode:'sample data', verifFollowUpDate:'2018-01-01', verifOthCoverDate:'2018-01-01', dualCoverageFlag:'sample data', diamondId:'sample data', subscIdChangeRequestDate:'2018-01-01', subscIdChangeRequestUser:'sample data', prevSubscriberId:'sample data', country:'sample data', respCountry:'sample data', akaCountry:'sample data', caseManagementSwitch:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', subsUpdate:'sample data', verfiedThruDate:'2018-01-01', respPhoneNumber:'sample data', respZipCode:'sample data', respState:'sample data', respCity:'sample data', respAddressLine2:'sample data', respAddressLine1:'sample data', respFirstName:'sample data', respLastName:'sample data', akaPhoneNumber:'sample data', akaZipCode:'sample data', akaState:'sample data', akaCity:'sample data', akaAddressLine2:'sample data', akaAddressLine1:'sample data', akaFirstName:'sample data', akaLastName:'sample data', depVerifStatus:'sample data', holdDate:'2018-01-01', holdReason:'sample data', seqAltMembId:1234, medicalRecNo:'sample data', employeeNo:'sample data', socialSecNo:'sample data', medicaidNo:'sample data', medicareNo:'sample data', userDefined2:'sample data', userDefined1:'sample data', languageCode:'sample data', maritalStatus:'sample data', gender:'sample data', dateOfBirth:'2018-01-01', contactTitle:'sample data', busPhoneNumber:'sample data', homePhoneNumber:'sample data', zipCode:'sample data', state:'sample data', city:'sample data', addressLine2:'sample data', addressLine1:'sample data', middleInitial:'sample data', firstName:'sample data', lastName:'sample data', personNumber:'sample data', subscriberId:'sample data', seqSubsId:1234, seqMembId:1234};
      service.updateMemberMaster(memberMaster, id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/membermasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMemberMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMemberMaster(id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/membermasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});