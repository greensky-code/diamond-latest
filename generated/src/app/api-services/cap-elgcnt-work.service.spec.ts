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

import { CapElgcntWorkService } from './cap-elgcnt-work.service';
import { CapElgcntWork } from '../api-models/cap-elgcnt-work.model'
import { CapElgcntWorks } from "../api-models/testing/fake-cap-elgcnt-work.model"

describe('CapElgcntWorkService', () => {
  let injector: TestBed;
  let service: CapElgcntWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapElgcntWorkService]
    });
    injector = getTestBed();
    service = injector.get(CapElgcntWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapElgcntWorks', () => {
    it('should return an Promise<CapElgcntWork[]>', () => {
      const capElgcntWork = [
       {seqCcalcId:1234, capEntityCode:'sample data', capEntityId:'sample data', seqCapProvId:1234, seqCapVendId:1234, eligCntCurr:1234, eligCnt1Back:1234, eligCnt2Back:1234, eligCnt3Back:1234, eligCnt4Back:1234, eligCnt5Back:1234, eligCnt6Back:1234, eligCnt7Back:1234, eligCnt8Back:1234, eligCnt9Back:1234, eligCnt10Back:1234, eligCnt11Back:1234, maxCnt:1234, seqCapElgcntWork:1234, seqCapVendAddress:1234},
       {seqCcalcId:1234, capEntityCode:'sample data', capEntityId:'sample data', seqCapProvId:1234, seqCapVendId:1234, eligCntCurr:1234, eligCnt1Back:1234, eligCnt2Back:1234, eligCnt3Back:1234, eligCnt4Back:1234, eligCnt5Back:1234, eligCnt6Back:1234, eligCnt7Back:1234, eligCnt8Back:1234, eligCnt9Back:1234, eligCnt10Back:1234, eligCnt11Back:1234, maxCnt:1234, seqCapElgcntWork:1234, seqCapVendAddress:1234},
       {seqCcalcId:1234, capEntityCode:'sample data', capEntityId:'sample data', seqCapProvId:1234, seqCapVendId:1234, eligCntCurr:1234, eligCnt1Back:1234, eligCnt2Back:1234, eligCnt3Back:1234, eligCnt4Back:1234, eligCnt5Back:1234, eligCnt6Back:1234, eligCnt7Back:1234, eligCnt8Back:1234, eligCnt9Back:1234, eligCnt10Back:1234, eligCnt11Back:1234, maxCnt:1234, seqCapElgcntWork:1234, seqCapVendAddress:1234}

      ];
      service.getCapElgcntWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capelgcntworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capElgcntWork);
    });
  });


  describe('#createCapElgcntWork', () => {
    var id = 1;
    it('should return an Promise<CapElgcntWork>', () => {
      const capElgcntWork: CapElgcntWork = {seqCcalcId:1234, capEntityCode:'sample data', capEntityId:'sample data', seqCapProvId:1234, seqCapVendId:1234, eligCntCurr:1234, eligCnt1Back:1234, eligCnt2Back:1234, eligCnt3Back:1234, eligCnt4Back:1234, eligCnt5Back:1234, eligCnt6Back:1234, eligCnt7Back:1234, eligCnt8Back:1234, eligCnt9Back:1234, eligCnt10Back:1234, eligCnt11Back:1234, maxCnt:1234, seqCapElgcntWork:1234, seqCapVendAddress:1234};
      service.createCapElgcntWork(capElgcntWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capelgcntworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapElgcntWork', () => {
    var id = 1;
    it('should return an Promise<CapElgcntWork>', () => {
      const capElgcntWork: CapElgcntWork = {seqCcalcId:1234, capEntityCode:'sample data', capEntityId:'sample data', seqCapProvId:1234, seqCapVendId:1234, eligCntCurr:1234, eligCnt1Back:1234, eligCnt2Back:1234, eligCnt3Back:1234, eligCnt4Back:1234, eligCnt5Back:1234, eligCnt6Back:1234, eligCnt7Back:1234, eligCnt8Back:1234, eligCnt9Back:1234, eligCnt10Back:1234, eligCnt11Back:1234, maxCnt:1234, seqCapElgcntWork:1234, seqCapVendAddress:1234};
      service.updateCapElgcntWork(capElgcntWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capelgcntworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapElgcntWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapElgcntWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capelgcntworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});