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

import { GetNetwIndShortrowService } from './get-netw-ind-shortrow.service';
import { GetNetwIndShortrow } from '../api-models/get-netw-ind-shortrow.model'
import { GetNetwIndShortrows } from "../api-models/testing/fake-get-netw-ind-shortrow.model"

describe('GetNetwIndShortrowService', () => {
  let injector: TestBed;
  let service: GetNetwIndShortrowService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetNetwIndShortrowService]
    });
    injector = getTestBed();
    service = injector.get(GetNetwIndShortrowService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetNetwIndShortrows', () => {
    it('should return an Promise<GetNetwIndShortrow[]>', () => {
      const getNetwIndShortrow = [
       {pWCnt:1234, pYCnt:1234, pNCnt:1234},
       {pWCnt:1234, pYCnt:1234, pNCnt:1234},
       {pWCnt:1234, pYCnt:1234, pNCnt:1234}

      ];
      service.getGetNetwIndShortrows().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getnetwindshortrows/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getNetwIndShortrow);
    });
  });


  describe('#createGetNetwIndShortrow', () => {
    var id = 1;
    it('should return an Promise<GetNetwIndShortrow>', () => {
      const getNetwIndShortrow: GetNetwIndShortrow = {pWCnt:1234, pYCnt:1234, pNCnt:1234};
      service.createGetNetwIndShortrow(getNetwIndShortrow).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getnetwindshortrows`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetNetwIndShortrow', () => {
    var id = 1;
    it('should return an Promise<GetNetwIndShortrow>', () => {
      const getNetwIndShortrow: GetNetwIndShortrow = {pWCnt:1234, pYCnt:1234, pNCnt:1234};
      service.updateGetNetwIndShortrow(getNetwIndShortrow, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getnetwindshortrows/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetNetwIndShortrow', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetNetwIndShortrow(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getnetwindshortrows/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});