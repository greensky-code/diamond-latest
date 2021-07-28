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

import { ClaimsTransmittalService } from './claims-transmittal.service';
import { ClaimsTransmittal } from '../api-models/claims-transmittal.model'
import { ClaimsTransmittals } from "../api-models/testing/fake-claims-transmittal.model"

describe('ClaimsTransmittalService', () => {
  let injector: TestBed;
  let service: ClaimsTransmittalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClaimsTransmittalService]
    });
    injector = getTestBed();
    service = injector.get(ClaimsTransmittalService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getClaimsTransmittals', () => {
    it('should return an Promise<ClaimsTransmittal[]>', () => {
      const claimsTransmittal = [
       {seqApTrans:1234, seqCltrnId:1234, sortString:'sample data', sourceType:'sample data', sourceKey:'sample data', holdFlag:'sample data', checkDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', prePriceOnlyFlag:'sample data'},
       {seqApTrans:1234, seqCltrnId:1234, sortString:'sample data', sourceType:'sample data', sourceKey:'sample data', holdFlag:'sample data', checkDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', prePriceOnlyFlag:'sample data'},
       {seqApTrans:1234, seqCltrnId:1234, sortString:'sample data', sourceType:'sample data', sourceKey:'sample data', holdFlag:'sample data', checkDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', prePriceOnlyFlag:'sample data'}

      ];
      service.getClaimsTransmittals().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/claimstransmittals/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(claimsTransmittal);
    });
  });


  describe('#createClaimsTransmittal', () => {
    var id = 1;
    it('should return an Promise<ClaimsTransmittal>', () => {
      const claimsTransmittal: ClaimsTransmittal = {seqApTrans:1234, seqCltrnId:1234, sortString:'sample data', sourceType:'sample data', sourceKey:'sample data', holdFlag:'sample data', checkDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', prePriceOnlyFlag:'sample data'};
      service.createClaimsTransmittal(claimsTransmittal).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimstransmittals`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateClaimsTransmittal', () => {
    var id = 1;
    it('should return an Promise<ClaimsTransmittal>', () => {
      const claimsTransmittal: ClaimsTransmittal = {seqApTrans:1234, seqCltrnId:1234, sortString:'sample data', sourceType:'sample data', sourceKey:'sample data', holdFlag:'sample data', checkDate:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', prePriceOnlyFlag:'sample data'};
      service.updateClaimsTransmittal(claimsTransmittal, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimstransmittals/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteClaimsTransmittal', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteClaimsTransmittal(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/claimstransmittals/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});