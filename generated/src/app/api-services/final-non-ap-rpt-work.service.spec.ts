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

import { FinalNonApRptWorkService } from './final-non-ap-rpt-work.service';
import { FinalNonApRptWork } from '../api-models/final-non-ap-rpt-work.model'
import { FinalNonApRptWorks } from "../api-models/testing/fake-final-non-ap-rpt-work.model"

describe('FinalNonApRptWorkService', () => {
  let injector: TestBed;
  let service: FinalNonApRptWorkService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FinalNonApRptWorkService]
    });
    injector = getTestBed();
    service = injector.get(FinalNonApRptWorkService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getFinalNonApRptWorks', () => {
    it('should return an Promise<FinalNonApRptWork[]>', () => {
      const finalNonApRptWork = [
       {seqFinalId:1234, seqClaimId:1234, fileType:'sample data'},
       {seqFinalId:1234, seqClaimId:1234, fileType:'sample data'},
       {seqFinalId:1234, seqClaimId:1234, fileType:'sample data'}

      ];
      service.getFinalNonApRptWorks().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/finalnonaprptworks/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(finalNonApRptWork);
    });
  });


  describe('#createFinalNonApRptWork', () => {
    var id = 1;
    it('should return an Promise<FinalNonApRptWork>', () => {
      const finalNonApRptWork: FinalNonApRptWork = {seqFinalId:1234, seqClaimId:1234, fileType:'sample data'};
      service.createFinalNonApRptWork(finalNonApRptWork).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/finalnonaprptworks`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateFinalNonApRptWork', () => {
    var id = 1;
    it('should return an Promise<FinalNonApRptWork>', () => {
      const finalNonApRptWork: FinalNonApRptWork = {seqFinalId:1234, seqClaimId:1234, fileType:'sample data'};
      service.updateFinalNonApRptWork(finalNonApRptWork, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/finalnonaprptworks/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteFinalNonApRptWork', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteFinalNonApRptWork(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/finalnonaprptworks/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});