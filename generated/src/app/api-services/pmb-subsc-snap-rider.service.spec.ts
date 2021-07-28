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

import { PmbSubscSnapRiderService } from './pmb-subsc-snap-rider.service';
import { PmbSubscSnapRider } from '../api-models/pmb-subsc-snap-rider.model'
import { PmbSubscSnapRiders } from "../api-models/testing/fake-pmb-subsc-snap-rider.model"

describe('PmbSubscSnapRiderService', () => {
  let injector: TestBed;
  let service: PmbSubscSnapRiderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbSubscSnapRiderService]
    });
    injector = getTestBed();
    service = injector.get(PmbSubscSnapRiderService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbSubscSnapRiders', () => {
    it('should return an Promise<PmbSubscSnapRider[]>', () => {
      const pmbSubscSnapRider = [
       {seqSubsId:1234, seqSubsUpdate:1234, riderCode:'sample data', famRiderCount:1234, spouseFlag:'sample data'},
       {seqSubsId:1234, seqSubsUpdate:1234, riderCode:'sample data', famRiderCount:1234, spouseFlag:'sample data'},
       {seqSubsId:1234, seqSubsUpdate:1234, riderCode:'sample data', famRiderCount:1234, spouseFlag:'sample data'}

      ];
      service.getPmbSubscSnapRiders().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscsnapriders/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbSubscSnapRider);
    });
  });


  describe('#createPmbSubscSnapRider', () => {
    var id = 1;
    it('should return an Promise<PmbSubscSnapRider>', () => {
      const pmbSubscSnapRider: PmbSubscSnapRider = {seqSubsId:1234, seqSubsUpdate:1234, riderCode:'sample data', famRiderCount:1234, spouseFlag:'sample data'};
      service.createPmbSubscSnapRider(pmbSubscSnapRider).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscsnapriders`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbSubscSnapRider', () => {
    var id = 1;
    it('should return an Promise<PmbSubscSnapRider>', () => {
      const pmbSubscSnapRider: PmbSubscSnapRider = {seqSubsId:1234, seqSubsUpdate:1234, riderCode:'sample data', famRiderCount:1234, spouseFlag:'sample data'};
      service.updatePmbSubscSnapRider(pmbSubscSnapRider, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscsnapriders/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbSubscSnapRider', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbSubscSnapRider(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscsnapriders/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});