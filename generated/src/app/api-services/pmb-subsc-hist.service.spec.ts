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

import { PmbSubscHistService } from './pmb-subsc-hist.service';
import { PmbSubscHist } from '../api-models/pmb-subsc-hist.model'
import { PmbSubscHists } from "../api-models/testing/fake-pmb-subsc-hist.model"

describe('PmbSubscHistService', () => {
  let injector: TestBed;
  let service: PmbSubscHistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbSubscHistService]
    });
    injector = getTestBed();
    service = injector.get(PmbSubscHistService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbSubscHists', () => {
    it('should return an Promise<PmbSubscHist[]>', () => {
      const pmbSubscHist = [
       {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', personNumber:'sample data', seqGpbilId:1234, groupId:'sample data', employeeNo:'sample data', subscLastName:'sample data', subscFirstName:'sample data', subscDateOfBirth:'2018-01-01', subscGender:'sample data', subscAge:1234, subscDept:'sample data', subscLocation:'sample data', subscSalary:1234, familySize:1234, noOfChildDep:1234, noOfAdultDep:1234, premiumStep:'sample data', medicareStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', rateType:'sample data', spouseFlag:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', cobraFlag:'sample data', monthlyRate:1234, seqParentId:1234},
       {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', personNumber:'sample data', seqGpbilId:1234, groupId:'sample data', employeeNo:'sample data', subscLastName:'sample data', subscFirstName:'sample data', subscDateOfBirth:'2018-01-01', subscGender:'sample data', subscAge:1234, subscDept:'sample data', subscLocation:'sample data', subscSalary:1234, familySize:1234, noOfChildDep:1234, noOfAdultDep:1234, premiumStep:'sample data', medicareStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', rateType:'sample data', spouseFlag:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', cobraFlag:'sample data', monthlyRate:1234, seqParentId:1234},
       {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', personNumber:'sample data', seqGpbilId:1234, groupId:'sample data', employeeNo:'sample data', subscLastName:'sample data', subscFirstName:'sample data', subscDateOfBirth:'2018-01-01', subscGender:'sample data', subscAge:1234, subscDept:'sample data', subscLocation:'sample data', subscSalary:1234, familySize:1234, noOfChildDep:1234, noOfAdultDep:1234, premiumStep:'sample data', medicareStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', rateType:'sample data', spouseFlag:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', cobraFlag:'sample data', monthlyRate:1234, seqParentId:1234}

      ];
      service.getPmbSubscHists().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubschists/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbSubscHist);
    });
  });


  describe('#createPmbSubscHist', () => {
    var id = 1;
    it('should return an Promise<PmbSubscHist>', () => {
      const pmbSubscHist: PmbSubscHist = {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', personNumber:'sample data', seqGpbilId:1234, groupId:'sample data', employeeNo:'sample data', subscLastName:'sample data', subscFirstName:'sample data', subscDateOfBirth:'2018-01-01', subscGender:'sample data', subscAge:1234, subscDept:'sample data', subscLocation:'sample data', subscSalary:1234, familySize:1234, noOfChildDep:1234, noOfAdultDep:1234, premiumStep:'sample data', medicareStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', rateType:'sample data', spouseFlag:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', cobraFlag:'sample data', monthlyRate:1234, seqParentId:1234};
      service.createPmbSubscHist(pmbSubscHist).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubschists`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbSubscHist', () => {
    var id = 1;
    it('should return an Promise<PmbSubscHist>', () => {
      const pmbSubscHist: PmbSubscHist = {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', personNumber:'sample data', seqGpbilId:1234, groupId:'sample data', employeeNo:'sample data', subscLastName:'sample data', subscFirstName:'sample data', subscDateOfBirth:'2018-01-01', subscGender:'sample data', subscAge:1234, subscDept:'sample data', subscLocation:'sample data', subscSalary:1234, familySize:1234, noOfChildDep:1234, noOfAdultDep:1234, premiumStep:'sample data', medicareStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', rateType:'sample data', spouseFlag:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', cobraFlag:'sample data', monthlyRate:1234, seqParentId:1234};
      service.updatePmbSubscHist(pmbSubscHist, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubschists/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbSubscHist', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbSubscHist(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubschists/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});