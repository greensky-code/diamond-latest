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

import { DrgWeightService } from './drg-weight.service';
import { DrgWeight } from '../api-models/drg-weight.model'
import { DrgWeights } from "../api-models/testing/fake-drg-weight.model"

describe('DrgWeightService', () => {
  let injector: TestBed;
  let service: DrgWeightService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DrgWeightService]
    });
    injector = getTestBed();
    service = injector.get(DrgWeightService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getDrgWeights', () => {
    it('should return an Promise<DrgWeight[]>', () => {
      const drgWeight = [
       {drgPricerId:'sample data', version:'sample data', revisionLevel:'sample data', drgCode:'sample data', drgWeight:1234, userDefined1:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {drgPricerId:'sample data', version:'sample data', revisionLevel:'sample data', drgCode:'sample data', drgWeight:1234, userDefined1:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {drgPricerId:'sample data', version:'sample data', revisionLevel:'sample data', drgCode:'sample data', drgWeight:1234, userDefined1:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getDrgWeights().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/drgweights/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(drgWeight);
    });
  });


  describe('#createDrgWeight', () => {
    var id = 1;
    it('should return an Promise<DrgWeight>', () => {
      const drgWeight: DrgWeight = {drgPricerId:'sample data', version:'sample data', revisionLevel:'sample data', drgCode:'sample data', drgWeight:1234, userDefined1:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createDrgWeight(drgWeight).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/drgweights`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateDrgWeight', () => {
    var id = 1;
    it('should return an Promise<DrgWeight>', () => {
      const drgWeight: DrgWeight = {drgPricerId:'sample data', version:'sample data', revisionLevel:'sample data', drgCode:'sample data', drgWeight:1234, userDefined1:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateDrgWeight(drgWeight, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/drgweights/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteDrgWeight', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteDrgWeight(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/drgweights/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});