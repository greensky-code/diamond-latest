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

import { LoadCiebPhoneService } from './load-cieb-phone.service';
import { LoadCiebPhone } from '../api-models/load-cieb-phone.model'
import { LoadCiebPhones } from "../api-models/testing/fake-load-cieb-phone.model"

describe('LoadCiebPhoneService', () => {
  let injector: TestBed;
  let service: LoadCiebPhoneService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoadCiebPhoneService]
    });
    injector = getTestBed();
    service = injector.get(LoadCiebPhoneService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getLoadCiebPhones', () => {
    it('should return an Promise<LoadCiebPhone[]>', () => {
      const loadCiebPhone = [
       {pSeqEntityId:1234, pPhoneCode:'sample data', pPhoneNum:'sample data'},
       {pSeqEntityId:1234, pPhoneCode:'sample data', pPhoneNum:'sample data'},
       {pSeqEntityId:1234, pPhoneCode:'sample data', pPhoneNum:'sample data'}

      ];
      service.getLoadCiebPhones().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/loadciebphones/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(loadCiebPhone);
    });
  });


  describe('#createLoadCiebPhone', () => {
    var id = 1;
    it('should return an Promise<LoadCiebPhone>', () => {
      const loadCiebPhone: LoadCiebPhone = {pSeqEntityId:1234, pPhoneCode:'sample data', pPhoneNum:'sample data'};
      service.createLoadCiebPhone(loadCiebPhone).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/loadciebphones`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateLoadCiebPhone', () => {
    var id = 1;
    it('should return an Promise<LoadCiebPhone>', () => {
      const loadCiebPhone: LoadCiebPhone = {pSeqEntityId:1234, pPhoneCode:'sample data', pPhoneNum:'sample data'};
      service.updateLoadCiebPhone(loadCiebPhone, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/loadciebphones/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteLoadCiebPhone', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteLoadCiebPhone(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/loadciebphones/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});