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

import { OverlapInService } from './overlap-in.service';
import { OverlapIn } from '../api-models/overlap-in.model'
import { OverlapIns } from "../api-models/testing/fake-overlap-in.model"

describe('OverlapInService', () => {
  let injector: TestBed;
  let service: OverlapInService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OverlapInService]
    });
    injector = getTestBed();
    service = injector.get(OverlapInService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getOverlapIns', () => {
    it('should return an Promise<OverlapIn[]>', () => {
      const overlapIn = [
       {pDiagCode:'sample data', pServiceDate:'sample data'},
       {pDiagCode:'sample data', pServiceDate:'sample data'},
       {pDiagCode:'sample data', pServiceDate:'sample data'}

      ];
      service.getOverlapIns().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/overlapins/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(overlapIn);
    });
  });


  describe('#createOverlapIn', () => {
    var id = 1;
    it('should return an Promise<OverlapIn>', () => {
      const overlapIn: OverlapIn = {pDiagCode:'sample data', pServiceDate:'sample data'};
      service.createOverlapIn(overlapIn).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/overlapins`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateOverlapIn', () => {
    var id = 1;
    it('should return an Promise<OverlapIn>', () => {
      const overlapIn: OverlapIn = {pDiagCode:'sample data', pServiceDate:'sample data'};
      service.updateOverlapIn(overlapIn, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/overlapins/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteOverlapIn', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteOverlapIn(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/overlapins/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});