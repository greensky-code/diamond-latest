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

import { SubmitterProfileMasterService } from './submitter-profile-master.service';
import { SubmitterProfileMaster } from '../api-models/submitter-profile-master.model'
import { SubmitterProfileMasters } from "../api-models/testing/fake-submitter-profile-master.model"

describe('SubmitterProfileMasterService', () => {
  let injector: TestBed;
  let service: SubmitterProfileMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SubmitterProfileMasterService]
    });
    injector = getTestBed();
    service = injector.get(SubmitterProfileMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSubmitterProfileMasters', () => {
    it('should return an Promise<SubmitterProfileMaster[]>', () => {
      const submitterProfileMaster = [
       {submitterId:'sample data', submitterName:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', faxNumber:'sample data', externalReference:'sample data', computerDialupNo:'sample data', modemMake:'sample data', modemModel:'sample data', modemSpeed:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', country:'sample data'},
       {submitterId:'sample data', submitterName:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', faxNumber:'sample data', externalReference:'sample data', computerDialupNo:'sample data', modemMake:'sample data', modemModel:'sample data', modemSpeed:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', country:'sample data'},
       {submitterId:'sample data', submitterName:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', faxNumber:'sample data', externalReference:'sample data', computerDialupNo:'sample data', modemMake:'sample data', modemModel:'sample data', modemSpeed:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', country:'sample data'}

      ];
      service.getSubmitterProfileMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/submitterprofilemasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(submitterProfileMaster);
    });
  });


  describe('#createSubmitterProfileMaster', () => {
    var id = 1;
    it('should return an Promise<SubmitterProfileMaster>', () => {
      const submitterProfileMaster: SubmitterProfileMaster = {submitterId:'sample data', submitterName:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', faxNumber:'sample data', externalReference:'sample data', computerDialupNo:'sample data', modemMake:'sample data', modemModel:'sample data', modemSpeed:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', country:'sample data'};
      service.createSubmitterProfileMaster(submitterProfileMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/submitterprofilemasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSubmitterProfileMaster', () => {
    var id = 1;
    it('should return an Promise<SubmitterProfileMaster>', () => {
      const submitterProfileMaster: SubmitterProfileMaster = {submitterId:'sample data', submitterName:'sample data', addressLine1:'sample data', addressLine2:'sample data', city:'sample data', state:'sample data', zipCode:'sample data', contactName:'sample data', contactTitle:'sample data', phoneNumber:'sample data', faxNumber:'sample data', externalReference:'sample data', computerDialupNo:'sample data', modemMake:'sample data', modemModel:'sample data', modemSpeed:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', country:'sample data'};
      service.updateSubmitterProfileMaster(submitterProfileMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/submitterprofilemasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSubmitterProfileMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSubmitterProfileMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/submitterprofilemasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});