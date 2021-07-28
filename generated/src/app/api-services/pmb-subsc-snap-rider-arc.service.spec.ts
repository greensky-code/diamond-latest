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

import { PmbSubscSnapRiderArcService } from './pmb-subsc-snap-rider-arc.service';
import { PmbSubscSnapRiderArc } from '../api-models/pmb-subsc-snap-rider-arc.model'
import { PmbSubscSnapRiderArcs } from "../api-models/testing/fake-pmb-subsc-snap-rider-arc.model"

describe('PmbSubscSnapRiderArcService', () => {
  let injector: TestBed;
  let service: PmbSubscSnapRiderArcService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PmbSubscSnapRiderArcService]
    });
    injector = getTestBed();
    service = injector.get(PmbSubscSnapRiderArcService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPmbSubscSnapRiderArcs', () => {
    it('should return an Promise<PmbSubscSnapRiderArc[]>', () => {
      const pmbSubscSnapRiderArc = [
       {seqSubsId:1234, seqSubsUpdate:1234, changeDateTime:'2018-01-01', riderCode:'sample data', famRiderCount:1234, spouseFlag:'sample data'},
       {seqSubsId:1234, seqSubsUpdate:1234, changeDateTime:'2018-01-01', riderCode:'sample data', famRiderCount:1234, spouseFlag:'sample data'},
       {seqSubsId:1234, seqSubsUpdate:1234, changeDateTime:'2018-01-01', riderCode:'sample data', famRiderCount:1234, spouseFlag:'sample data'}

      ];
      service.getPmbSubscSnapRiderArcs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscsnapriderarcs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(pmbSubscSnapRiderArc);
    });
  });


  describe('#createPmbSubscSnapRiderArc', () => {
    var id = 1;
    it('should return an Promise<PmbSubscSnapRiderArc>', () => {
      const pmbSubscSnapRiderArc: PmbSubscSnapRiderArc = {seqSubsId:1234, seqSubsUpdate:1234, changeDateTime:'2018-01-01', riderCode:'sample data', famRiderCount:1234, spouseFlag:'sample data'};
      service.createPmbSubscSnapRiderArc(pmbSubscSnapRiderArc).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscsnapriderarcs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePmbSubscSnapRiderArc', () => {
    var id = 1;
    it('should return an Promise<PmbSubscSnapRiderArc>', () => {
      const pmbSubscSnapRiderArc: PmbSubscSnapRiderArc = {seqSubsId:1234, seqSubsUpdate:1234, changeDateTime:'2018-01-01', riderCode:'sample data', famRiderCount:1234, spouseFlag:'sample data'};
      service.updatePmbSubscSnapRiderArc(pmbSubscSnapRiderArc, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscsnapriderarcs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePmbSubscSnapRiderArc', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePmbSubscSnapRiderArc(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/pmbsubscsnapriderarcs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});