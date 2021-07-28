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

import { MediCalPhpAddressMstrService } from './medi-cal-php-address-mstr.service';
import { MediCalPhpAddressMstr } from '../api-models/medi-cal-php-address-mstr.model'
import { MediCalPhpAddressMstrs } from "../api-models/testing/fake-medi-cal-php-address-mstr.model"

describe('MediCalPhpAddressMstrService', () => {
  let injector: TestBed;
  let service: MediCalPhpAddressMstrService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MediCalPhpAddressMstrService]
    });
    injector = getTestBed();
    service = injector.get(MediCalPhpAddressMstrService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMediCalPhpAddressMstrs', () => {
    it('should return an Promise<MediCalPhpAddressMstr[]>', () => {
      const mediCalPhpAddressMstr = [
       {seqPhpAddressId:1234, seqPrediId:1234, monthOfEligibility:'2018-01-01', holdStatus:'sample data', enrollFlag:'sample data', projectNumber:'sample data', countyId:'sample data', countyCode:'sample data', aidCode:'sample data', caseNumber:'sample data', fbu:'sample data', personNumber:'sample data', lastName:'sample data', firstName:'sample data', middleInitial:'sample data', gender:'sample data', dateOfBirth:'2018-01-01', medicareNo:'sample data', district:'sample data', currentRestrict:'sample data', currentMedicareStatus:'sample data', currentOhcStatus:'sample data', currentEligStatus:'sample data', currentPhpStatus:'sample data', janMedicareStatus:'sample data', janOhcStatus:'sample data', janEligStatus:'sample data', janPhpStatus:'sample data', febMedicareStatus:'sample data', febOhcStatus:'sample data', febEligStatus:'sample data', febPhpStatus:'sample data', marMedicareStatus:'sample data', marOhcStatus:'sample data', marEligStatus:'sample data', marPhpStatus:'sample data', aprMedicareStatus:'sample data', aprOhcStatus:'sample data', aprEligStatus:'sample data', aprPhpStatus:'sample data', mayMedicareStatus:'sample data', mayOhcStatus:'sample data', mayEligStatus:'sample data', mayPhpStatus:'sample data', junMedicareStatus:'sample data', junOhcStatus:'sample data', junEligStatus:'sample data', junPhpStatus:'sample data', julMedicareStatus:'sample data', julOhcStatus:'sample data', julEligStatus:'sample data', julPhpStatus:'sample data', augMedicareStatus:'sample data', augOhcStatus:'sample data', augEligStatus:'sample data', augPhpStatus:'sample data', sepMedicareStatus:'sample data', sepOhcStatus:'sample data', sepEligStatus:'sample data', sepPhpStatus:'sample data', octMedicareStatus:'sample data', octOhcStatus:'sample data', octEligStatus:'sample data', octPhpStatus:'sample data', novMedicareStatus:'sample data', novOhcStatus:'sample data', novEligStatus:'sample data', novPhpStatus:'sample data', decMedicareStatus:'sample data', decOhcStatus:'sample data', decEligStatus:'sample data', decPhpStatus:'sample data', careOfAddress:'sample data', streetAddress:'sample data', cityAndState:'sample data', zipCode:'sample data', medsId:'sample data', issueDate:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', eligUserDefined1:'sample data', groupId:'sample data', planCode:'sample data', country:'sample data'},
       {seqPhpAddressId:1234, seqPrediId:1234, monthOfEligibility:'2018-01-01', holdStatus:'sample data', enrollFlag:'sample data', projectNumber:'sample data', countyId:'sample data', countyCode:'sample data', aidCode:'sample data', caseNumber:'sample data', fbu:'sample data', personNumber:'sample data', lastName:'sample data', firstName:'sample data', middleInitial:'sample data', gender:'sample data', dateOfBirth:'2018-01-01', medicareNo:'sample data', district:'sample data', currentRestrict:'sample data', currentMedicareStatus:'sample data', currentOhcStatus:'sample data', currentEligStatus:'sample data', currentPhpStatus:'sample data', janMedicareStatus:'sample data', janOhcStatus:'sample data', janEligStatus:'sample data', janPhpStatus:'sample data', febMedicareStatus:'sample data', febOhcStatus:'sample data', febEligStatus:'sample data', febPhpStatus:'sample data', marMedicareStatus:'sample data', marOhcStatus:'sample data', marEligStatus:'sample data', marPhpStatus:'sample data', aprMedicareStatus:'sample data', aprOhcStatus:'sample data', aprEligStatus:'sample data', aprPhpStatus:'sample data', mayMedicareStatus:'sample data', mayOhcStatus:'sample data', mayEligStatus:'sample data', mayPhpStatus:'sample data', junMedicareStatus:'sample data', junOhcStatus:'sample data', junEligStatus:'sample data', junPhpStatus:'sample data', julMedicareStatus:'sample data', julOhcStatus:'sample data', julEligStatus:'sample data', julPhpStatus:'sample data', augMedicareStatus:'sample data', augOhcStatus:'sample data', augEligStatus:'sample data', augPhpStatus:'sample data', sepMedicareStatus:'sample data', sepOhcStatus:'sample data', sepEligStatus:'sample data', sepPhpStatus:'sample data', octMedicareStatus:'sample data', octOhcStatus:'sample data', octEligStatus:'sample data', octPhpStatus:'sample data', novMedicareStatus:'sample data', novOhcStatus:'sample data', novEligStatus:'sample data', novPhpStatus:'sample data', decMedicareStatus:'sample data', decOhcStatus:'sample data', decEligStatus:'sample data', decPhpStatus:'sample data', careOfAddress:'sample data', streetAddress:'sample data', cityAndState:'sample data', zipCode:'sample data', medsId:'sample data', issueDate:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', eligUserDefined1:'sample data', groupId:'sample data', planCode:'sample data', country:'sample data'},
       {seqPhpAddressId:1234, seqPrediId:1234, monthOfEligibility:'2018-01-01', holdStatus:'sample data', enrollFlag:'sample data', projectNumber:'sample data', countyId:'sample data', countyCode:'sample data', aidCode:'sample data', caseNumber:'sample data', fbu:'sample data', personNumber:'sample data', lastName:'sample data', firstName:'sample data', middleInitial:'sample data', gender:'sample data', dateOfBirth:'2018-01-01', medicareNo:'sample data', district:'sample data', currentRestrict:'sample data', currentMedicareStatus:'sample data', currentOhcStatus:'sample data', currentEligStatus:'sample data', currentPhpStatus:'sample data', janMedicareStatus:'sample data', janOhcStatus:'sample data', janEligStatus:'sample data', janPhpStatus:'sample data', febMedicareStatus:'sample data', febOhcStatus:'sample data', febEligStatus:'sample data', febPhpStatus:'sample data', marMedicareStatus:'sample data', marOhcStatus:'sample data', marEligStatus:'sample data', marPhpStatus:'sample data', aprMedicareStatus:'sample data', aprOhcStatus:'sample data', aprEligStatus:'sample data', aprPhpStatus:'sample data', mayMedicareStatus:'sample data', mayOhcStatus:'sample data', mayEligStatus:'sample data', mayPhpStatus:'sample data', junMedicareStatus:'sample data', junOhcStatus:'sample data', junEligStatus:'sample data', junPhpStatus:'sample data', julMedicareStatus:'sample data', julOhcStatus:'sample data', julEligStatus:'sample data', julPhpStatus:'sample data', augMedicareStatus:'sample data', augOhcStatus:'sample data', augEligStatus:'sample data', augPhpStatus:'sample data', sepMedicareStatus:'sample data', sepOhcStatus:'sample data', sepEligStatus:'sample data', sepPhpStatus:'sample data', octMedicareStatus:'sample data', octOhcStatus:'sample data', octEligStatus:'sample data', octPhpStatus:'sample data', novMedicareStatus:'sample data', novOhcStatus:'sample data', novEligStatus:'sample data', novPhpStatus:'sample data', decMedicareStatus:'sample data', decOhcStatus:'sample data', decEligStatus:'sample data', decPhpStatus:'sample data', careOfAddress:'sample data', streetAddress:'sample data', cityAndState:'sample data', zipCode:'sample data', medsId:'sample data', issueDate:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', eligUserDefined1:'sample data', groupId:'sample data', planCode:'sample data', country:'sample data'}

      ];
      service.getMediCalPhpAddressMstrs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/medicalphpaddressmstrs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(mediCalPhpAddressMstr);
    });
  });


  describe('#createMediCalPhpAddressMstr', () => {
    var id = 1;
    it('should return an Promise<MediCalPhpAddressMstr>', () => {
      const mediCalPhpAddressMstr: MediCalPhpAddressMstr = {seqPhpAddressId:1234, seqPrediId:1234, monthOfEligibility:'2018-01-01', holdStatus:'sample data', enrollFlag:'sample data', projectNumber:'sample data', countyId:'sample data', countyCode:'sample data', aidCode:'sample data', caseNumber:'sample data', fbu:'sample data', personNumber:'sample data', lastName:'sample data', firstName:'sample data', middleInitial:'sample data', gender:'sample data', dateOfBirth:'2018-01-01', medicareNo:'sample data', district:'sample data', currentRestrict:'sample data', currentMedicareStatus:'sample data', currentOhcStatus:'sample data', currentEligStatus:'sample data', currentPhpStatus:'sample data', janMedicareStatus:'sample data', janOhcStatus:'sample data', janEligStatus:'sample data', janPhpStatus:'sample data', febMedicareStatus:'sample data', febOhcStatus:'sample data', febEligStatus:'sample data', febPhpStatus:'sample data', marMedicareStatus:'sample data', marOhcStatus:'sample data', marEligStatus:'sample data', marPhpStatus:'sample data', aprMedicareStatus:'sample data', aprOhcStatus:'sample data', aprEligStatus:'sample data', aprPhpStatus:'sample data', mayMedicareStatus:'sample data', mayOhcStatus:'sample data', mayEligStatus:'sample data', mayPhpStatus:'sample data', junMedicareStatus:'sample data', junOhcStatus:'sample data', junEligStatus:'sample data', junPhpStatus:'sample data', julMedicareStatus:'sample data', julOhcStatus:'sample data', julEligStatus:'sample data', julPhpStatus:'sample data', augMedicareStatus:'sample data', augOhcStatus:'sample data', augEligStatus:'sample data', augPhpStatus:'sample data', sepMedicareStatus:'sample data', sepOhcStatus:'sample data', sepEligStatus:'sample data', sepPhpStatus:'sample data', octMedicareStatus:'sample data', octOhcStatus:'sample data', octEligStatus:'sample data', octPhpStatus:'sample data', novMedicareStatus:'sample data', novOhcStatus:'sample data', novEligStatus:'sample data', novPhpStatus:'sample data', decMedicareStatus:'sample data', decOhcStatus:'sample data', decEligStatus:'sample data', decPhpStatus:'sample data', careOfAddress:'sample data', streetAddress:'sample data', cityAndState:'sample data', zipCode:'sample data', medsId:'sample data', issueDate:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', eligUserDefined1:'sample data', groupId:'sample data', planCode:'sample data', country:'sample data'};
      service.createMediCalPhpAddressMstr(mediCalPhpAddressMstr).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/medicalphpaddressmstrs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMediCalPhpAddressMstr', () => {
    var id = 1;
    it('should return an Promise<MediCalPhpAddressMstr>', () => {
      const mediCalPhpAddressMstr: MediCalPhpAddressMstr = {seqPhpAddressId:1234, seqPrediId:1234, monthOfEligibility:'2018-01-01', holdStatus:'sample data', enrollFlag:'sample data', projectNumber:'sample data', countyId:'sample data', countyCode:'sample data', aidCode:'sample data', caseNumber:'sample data', fbu:'sample data', personNumber:'sample data', lastName:'sample data', firstName:'sample data', middleInitial:'sample data', gender:'sample data', dateOfBirth:'2018-01-01', medicareNo:'sample data', district:'sample data', currentRestrict:'sample data', currentMedicareStatus:'sample data', currentOhcStatus:'sample data', currentEligStatus:'sample data', currentPhpStatus:'sample data', janMedicareStatus:'sample data', janOhcStatus:'sample data', janEligStatus:'sample data', janPhpStatus:'sample data', febMedicareStatus:'sample data', febOhcStatus:'sample data', febEligStatus:'sample data', febPhpStatus:'sample data', marMedicareStatus:'sample data', marOhcStatus:'sample data', marEligStatus:'sample data', marPhpStatus:'sample data', aprMedicareStatus:'sample data', aprOhcStatus:'sample data', aprEligStatus:'sample data', aprPhpStatus:'sample data', mayMedicareStatus:'sample data', mayOhcStatus:'sample data', mayEligStatus:'sample data', mayPhpStatus:'sample data', junMedicareStatus:'sample data', junOhcStatus:'sample data', junEligStatus:'sample data', junPhpStatus:'sample data', julMedicareStatus:'sample data', julOhcStatus:'sample data', julEligStatus:'sample data', julPhpStatus:'sample data', augMedicareStatus:'sample data', augOhcStatus:'sample data', augEligStatus:'sample data', augPhpStatus:'sample data', sepMedicareStatus:'sample data', sepOhcStatus:'sample data', sepEligStatus:'sample data', sepPhpStatus:'sample data', octMedicareStatus:'sample data', octOhcStatus:'sample data', octEligStatus:'sample data', octPhpStatus:'sample data', novMedicareStatus:'sample data', novOhcStatus:'sample data', novEligStatus:'sample data', novPhpStatus:'sample data', decMedicareStatus:'sample data', decOhcStatus:'sample data', decEligStatus:'sample data', decPhpStatus:'sample data', careOfAddress:'sample data', streetAddress:'sample data', cityAndState:'sample data', zipCode:'sample data', medsId:'sample data', issueDate:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', eligUserDefined1:'sample data', groupId:'sample data', planCode:'sample data', country:'sample data'};
      service.updateMediCalPhpAddressMstr(mediCalPhpAddressMstr, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/medicalphpaddressmstrs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMediCalPhpAddressMstr', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMediCalPhpAddressMstr(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/medicalphpaddressmstrs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});