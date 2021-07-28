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

import { DrgPricerRevisionService } from './drg-pricer-revision.service';
import { DrgPricerRevision } from '../api-models/drg-pricer-revision.model'
import { DrgPricerRevisions } from "../api-models/testing/fake-drg-pricer-revision.model"

describe('DrgPricerRevisionService', () => {
  let injector: TestBed;
  let service: DrgPricerRevisionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DrgPricerRevisionService]
    });
    injector = getTestBed();
    service = injector.get(DrgPricerRevisionService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getDrgPricerRevisions', () => {
    it('should return an Promise<DrgPricerRevision[]>', () => {
      const drgPricerRevision = [
       {drgPricerId:'sample data', version:'sample data', revisionLevel:'sample data', description:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {drgPricerId:'sample data', version:'sample data', revisionLevel:'sample data', description:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {drgPricerId:'sample data', version:'sample data', revisionLevel:'sample data', description:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getDrgPricerRevisions().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/drgpricerrevisions/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(drgPricerRevision);
    });
  });


  describe('#createDrgPricerRevision', () => {
    var id = 1;
    it('should return an Promise<DrgPricerRevision>', () => {
      const drgPricerRevision: DrgPricerRevision = {drgPricerId:'sample data', version:'sample data', revisionLevel:'sample data', description:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createDrgPricerRevision(drgPricerRevision).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/drgpricerrevisions`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateDrgPricerRevision', () => {
    var id = 1;
    it('should return an Promise<DrgPricerRevision>', () => {
      const drgPricerRevision: DrgPricerRevision = {drgPricerId:'sample data', version:'sample data', revisionLevel:'sample data', description:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateDrgPricerRevision(drgPricerRevision, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/drgpricerrevisions/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteDrgPricerRevision', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteDrgPricerRevision(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/drgpricerrevisions/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});