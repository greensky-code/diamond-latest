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

import { AdministrativeFeeService } from './administrative-fee.service';
import { AdministrativeFee } from '../api-models/administrative-fee.model'
import { AdministrativeFees } from "../api-models/testing/fake-administrative-fee.model"

describe('AdministrativeFeeService', () => {
  let injector: TestBed;
  let service: AdministrativeFeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdministrativeFeeService]
    });
    injector = getTestBed();
    service = injector.get(AdministrativeFeeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAdministrativeFees', () => {
    it('should return an Promise<AdministrativeFee[]>', () => {
      const administrativeFee = [
       {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqApTrans:1234, apStatus:'sample data', printFlag:'sample data', seqVendAddress:1234, seqVendId:1234, glRefCode:'sample data', companyCode:'sample data', amount:1234, reasonCode:'sample data', ruleId:'sample data', reverseFlag:'sample data', claimNumber:'sample data', subLineCode:'sample data', lineNumber:1234, seqClaimId:1234, claimType:'sample data', seqAdminFee:1234},
       {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqApTrans:1234, apStatus:'sample data', printFlag:'sample data', seqVendAddress:1234, seqVendId:1234, glRefCode:'sample data', companyCode:'sample data', amount:1234, reasonCode:'sample data', ruleId:'sample data', reverseFlag:'sample data', claimNumber:'sample data', subLineCode:'sample data', lineNumber:1234, seqClaimId:1234, claimType:'sample data', seqAdminFee:1234},
       {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqApTrans:1234, apStatus:'sample data', printFlag:'sample data', seqVendAddress:1234, seqVendId:1234, glRefCode:'sample data', companyCode:'sample data', amount:1234, reasonCode:'sample data', ruleId:'sample data', reverseFlag:'sample data', claimNumber:'sample data', subLineCode:'sample data', lineNumber:1234, seqClaimId:1234, claimType:'sample data', seqAdminFee:1234}

      ];
      service.getAdministrativeFees().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/administrativefees/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(administrativeFee);
    });
  });


  describe('#createAdministrativeFee', () => {
    var id = 1;
    it('should return an Promise<AdministrativeFee>', () => {
      const administrativeFee: AdministrativeFee = {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqApTrans:1234, apStatus:'sample data', printFlag:'sample data', seqVendAddress:1234, seqVendId:1234, glRefCode:'sample data', companyCode:'sample data', amount:1234, reasonCode:'sample data', ruleId:'sample data', reverseFlag:'sample data', claimNumber:'sample data', subLineCode:'sample data', lineNumber:1234, seqClaimId:1234, claimType:'sample data', seqAdminFee:1234};
      service.createAdministrativeFee(administrativeFee).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/administrativefees`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateAdministrativeFee', () => {
    var id = 1;
    it('should return an Promise<AdministrativeFee>', () => {
      const administrativeFee: AdministrativeFee = {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', seqApTrans:1234, apStatus:'sample data', printFlag:'sample data', seqVendAddress:1234, seqVendId:1234, glRefCode:'sample data', companyCode:'sample data', amount:1234, reasonCode:'sample data', ruleId:'sample data', reverseFlag:'sample data', claimNumber:'sample data', subLineCode:'sample data', lineNumber:1234, seqClaimId:1234, claimType:'sample data', seqAdminFee:1234};
      service.updateAdministrativeFee(administrativeFee, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/administrativefees/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteAdministrativeFee', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAdministrativeFee(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/administrativefees/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});