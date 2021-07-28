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

import { HasPenaltyService } from './has-penalty.service';
import { HasPenalty } from '../api-models/has-penalty.model'
import { HasPenaltys } from "../api-models/testing/fake-has-penalty.model"

describe('HasPenaltyService', () => {
  let injector: TestBed;
  let service: HasPenaltyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HasPenaltyService]
    });
    injector = getTestBed();
    service = injector.get(HasPenaltyService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getHasPenaltys', () => {
    it('should return an Promise<HasPenalty[]>', () => {
      const hasPenalty = [
       {pPackageId:'sample data', pSvcStartDt:'sample data'},
       {pPackageId:'sample data', pSvcStartDt:'sample data'},
       {pPackageId:'sample data', pSvcStartDt:'sample data'}

      ];
      service.getHasPenaltys().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/haspenaltys/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(hasPenalty);
    });
  });


  describe('#createHasPenalty', () => {
    var id = 1;
    it('should return an Promise<HasPenalty>', () => {
      const hasPenalty: HasPenalty = {pPackageId:'sample data', pSvcStartDt:'sample data'};
      service.createHasPenalty(hasPenalty).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/haspenaltys`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateHasPenalty', () => {
    var id = 1;
    it('should return an Promise<HasPenalty>', () => {
      const hasPenalty: HasPenalty = {pPackageId:'sample data', pSvcStartDt:'sample data'};
      service.updateHasPenalty(hasPenalty, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/haspenaltys/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteHasPenalty', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteHasPenalty(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/haspenaltys/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});