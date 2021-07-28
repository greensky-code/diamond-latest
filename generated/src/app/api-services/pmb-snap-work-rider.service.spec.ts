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

import { PmbSnapWorkRiderService } from './pmb-snap-work-rider.service';
import { PmbSnapWorkRider } from '../api-models/pmb-snap-work-rider.model'
import { PmbSnapWorkRiders } from "../api-models/testing/fake-pmb-snap-work-rider.model"

describe('PmbSnapWorkRiderService', () => {
  let injector: TestBed;
  let service: PmbSnapWorkRiderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbSnapWorkRiderService]
    });
    injector = getTestBed();
    service = injector.get(PmbSnapWorkRiderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbSnapWorkRiders', () => {
    it('should return an Promise<PmbSnapWorkRider[]>', () => {
      const pmbSnapWorkRider = [
       {seqGpbilId:1234, seqSubsId:1234, seqSubsUpdate:1234, billDetailFromDate:'2018-01-01', riderCode:'sample data', famRiderCount:1234, spouseFlag:'sample data'},
       {seqGpbilId:1234, seqSubsId:1234, seqSubsUpdate:1234, billDetailFromDate:'2018-01-01', riderCode:'sample data', famRiderCount:1234, spouseFlag:'sample data'},
       {seqGpbilId:1234, seqSubsId:1234, seqSubsUpdate:1234, billDetailFromDate:'2018-01-01', riderCode:'sample data', famRiderCount:1234, spouseFlag:'sample data'}

      ];
      service.getPmbSnapWorkRiders().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsnapworkriders/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbSnapWorkRider);
    });
  });


  describe('#createPmbSnapWorkRider', () => {
    var id = 1;
    it('should return an Promise<PmbSnapWorkRider>', () => {
      const pmbSnapWorkRider: PmbSnapWorkRider = {seqGpbilId:1234, seqSubsId:1234, seqSubsUpdate:1234, billDetailFromDate:'2018-01-01', riderCode:'sample data', famRiderCount:1234, spouseFlag:'sample data'};
      service.createPmbSnapWorkRider(pmbSnapWorkRider).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsnapworkriders`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbSnapWorkRider', () => {
    var id = 1;
    it('should return an Promise<PmbSnapWorkRider>', () => {
      const pmbSnapWorkRider: PmbSnapWorkRider = {seqGpbilId:1234, seqSubsId:1234, seqSubsUpdate:1234, billDetailFromDate:'2018-01-01', riderCode:'sample data', famRiderCount:1234, spouseFlag:'sample data'};
      service.updatePmbSnapWorkRider(pmbSnapWorkRider, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsnapworkriders/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbSnapWorkRider', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbSnapWorkRider(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsnapworkriders/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});