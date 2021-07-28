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

import { SmdistributionsetSService } from './smdistributionset-s.service';
import { SmdistributionsetS } from '../api-models/smdistributionset-s.model'
import { SmdistributionsetSs } from "../api-models/testing/fake-smdistributionset-s.model"

describe('SmdistributionsetSService', () => {
  let injector: TestBed;
  let service: SmdistributionsetSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmdistributionsetSService]
    });
    injector = getTestBed();
    service = injector.get(SmdistributionsetSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmdistributionsetSs', () => {
    it('should return an Promise<SmdistributionsetS[]>', () => {
      const smdistributionsetS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, distributionsetState:1234, distributionsetLocation:'sample data', distributionsetOs:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, distributionsetState:1234, distributionsetLocation:'sample data', distributionsetOs:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, distributionsetState:1234, distributionsetLocation:'sample data', distributionsetOs:1234}

      ];
      service.getSmdistributionsetSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smdistributionsetss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smdistributionsetS);
    });
  });


  describe('#createSmdistributionsetS', () => {
    var id = 1;
    it('should return an Promise<SmdistributionsetS>', () => {
      const smdistributionsetS: SmdistributionsetS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, distributionsetState:1234, distributionsetLocation:'sample data', distributionsetOs:1234};
      service.createSmdistributionsetS(smdistributionsetS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smdistributionsetss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmdistributionsetS', () => {
    var id = 1;
    it('should return an Promise<SmdistributionsetS>', () => {
      const smdistributionsetS: SmdistributionsetS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, distributionsetState:1234, distributionsetLocation:'sample data', distributionsetOs:1234};
      service.updateSmdistributionsetS(smdistributionsetS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smdistributionsetss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmdistributionsetS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmdistributionsetS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smdistributionsetss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});