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

import { PmbMembHistService } from './pmb-memb-hist.service';
import { PmbMembHist } from '../api-models/pmb-memb-hist.model'
import { PmbMembHists } from "../api-models/testing/fake-pmb-memb-hist.model"

describe('PmbMembHistService', () => {
  let injector: TestBed;
  let service: PmbMembHistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbMembHistService]
    });
    injector = getTestBed();
    service = injector.get(PmbMembHistService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbMembHists', () => {
    it('should return an Promise<PmbMembHist[]>', () => {
      const pmbMembHist = [
       {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', personNumber:'sample data', seqGpbilId:1234, membRelationCode:'sample data', membLastName:'sample data', membFirstName:'sample data', membDateOfBirth:'2018-01-01', membGender:'sample data', membAge:1234, premiumStep:'sample data', cobraFlag:'sample data', medicareStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', rateType:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', monthlyRate:1234, seqParentId:1234},
       {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', personNumber:'sample data', seqGpbilId:1234, membRelationCode:'sample data', membLastName:'sample data', membFirstName:'sample data', membDateOfBirth:'2018-01-01', membGender:'sample data', membAge:1234, premiumStep:'sample data', cobraFlag:'sample data', medicareStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', rateType:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', monthlyRate:1234, seqParentId:1234},
       {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', personNumber:'sample data', seqGpbilId:1234, membRelationCode:'sample data', membLastName:'sample data', membFirstName:'sample data', membDateOfBirth:'2018-01-01', membGender:'sample data', membAge:1234, premiumStep:'sample data', cobraFlag:'sample data', medicareStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', rateType:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', monthlyRate:1234, seqParentId:1234}

      ];
      service.getPmbMembHists().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbmembhists/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbMembHist);
    });
  });


  describe('#createPmbMembHist', () => {
    var id = 1;
    it('should return an Promise<PmbMembHist>', () => {
      const pmbMembHist: PmbMembHist = {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', personNumber:'sample data', seqGpbilId:1234, membRelationCode:'sample data', membLastName:'sample data', membFirstName:'sample data', membDateOfBirth:'2018-01-01', membGender:'sample data', membAge:1234, premiumStep:'sample data', cobraFlag:'sample data', medicareStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', rateType:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', monthlyRate:1234, seqParentId:1234};
      service.createPmbMembHist(pmbMembHist).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbmembhists`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbMembHist', () => {
    var id = 1;
    it('should return an Promise<PmbMembHist>', () => {
      const pmbMembHist: PmbMembHist = {customerType:'sample data', customerId:'sample data', invoiceNo:1234, subscriberId:'sample data', personNumber:'sample data', seqGpbilId:1234, membRelationCode:'sample data', membLastName:'sample data', membFirstName:'sample data', membDateOfBirth:'2018-01-01', membGender:'sample data', membAge:1234, premiumStep:'sample data', cobraFlag:'sample data', medicareStatus:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', rateType:'sample data', otherStatusFlag:'sample data', premOverrideStep:1234, premOverrideAmt:1234, premOverrideCode:'sample data', monthlyRate:1234, seqParentId:1234};
      service.updatePmbMembHist(pmbMembHist, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbmembhists/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbMembHist', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbMembHist(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbmembhists/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});