/* Copyright (c) 2021 . All Rights Reserved. */

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

import { OverlapOutService } from './overlap-out.service';
import { OverlapOut } from '../api-models/overlap-out.model'
import { OverlapOuts } from "../api-models/testing/fake-overlap-out.model"

describe('OverlapOutService', () => {
  let injector: TestBed;
  let service: OverlapOutService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OverlapOutService]
    });
    injector = getTestBed();
    service = injector.get(OverlapOutService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getOverlapOuts', () => {
    it('should return an Promise<OverlapOut[]>', () => {
      const overlapOut = [
       {pDiagCode:'sample data', pServiceDate:'sample data'},
       {pDiagCode:'sample data', pServiceDate:'sample data'},
       {pDiagCode:'sample data', pServiceDate:'sample data'}

      ];
      service.getOverlapOuts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/overlapouts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(overlapOut);
    });
  });


  describe('#createOverlapOut', () => {
    var id = 1;
    it('should return an Promise<OverlapOut>', () => {
      const overlapOut: OverlapOut = {pDiagCode:'sample data', pServiceDate:'sample data'};
      service.createOverlapOut(overlapOut).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/overlapouts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateOverlapOut', () => {
    var id = 1;
    it('should return an Promise<OverlapOut>', () => {
      const overlapOut: OverlapOut = {pDiagCode:'sample data', pServiceDate:'sample data'};
      service.updateOverlapOut(overlapOut, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/overlapouts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteOverlapOut', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteOverlapOut(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/overlapouts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});