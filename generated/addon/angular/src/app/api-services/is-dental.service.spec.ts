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

import { IsDentalService } from './is-dental.service';
import { IsDental } from '../api-models/is-dental.model'
import { IsDentals } from "../api-models/testing/fake-is-dental.model"

describe('IsDentalService', () => {
  let injector: TestBed;
  let service: IsDentalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IsDentalService]
    });
    injector = getTestBed();
    service = injector.get(IsDentalService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getIsDentals', () => {
    it('should return an Promise<IsDental[]>', () => {
      const isDental = [
       {pCode:'sample data'},
       {pCode:'sample data'},
       {pCode:'sample data'}

      ];
      service.getIsDentals().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/isdentals/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(isDental);
    });
  });


  describe('#createIsDental', () => {
    var id = 1;
    it('should return an Promise<IsDental>', () => {
      const isDental: IsDental = {pCode:'sample data'};
      service.createIsDental(isDental).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/isdentals`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateIsDental', () => {
    var id = 1;
    it('should return an Promise<IsDental>', () => {
      const isDental: IsDental = {pCode:'sample data'};
      service.updateIsDental(isDental, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/isdentals/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteIsDental', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteIsDental(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/isdentals/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});