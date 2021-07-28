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

import { LoadMePhoneService } from './load-me-phone.service';
import { LoadMePhone } from '../api-models/load-me-phone.model'
import { LoadMePhones } from "../api-models/testing/fake-load-me-phone.model"

describe('LoadMePhoneService', () => {
  let injector: TestBed;
  let service: LoadMePhoneService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoadMePhoneService]
    });
    injector = getTestBed();
    service = injector.get(LoadMePhoneService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getLoadMePhones', () => {
    it('should return an Promise<LoadMePhone[]>', () => {
      const loadMePhone = [
       {pSeqMembId:1234, pSeqSubsId:1234, pMeMobileNum:'sample data', pMeHomeNum:'sample data', pEntityCode:'sample data'},
       {pSeqMembId:1234, pSeqSubsId:1234, pMeMobileNum:'sample data', pMeHomeNum:'sample data', pEntityCode:'sample data'},
       {pSeqMembId:1234, pSeqSubsId:1234, pMeMobileNum:'sample data', pMeHomeNum:'sample data', pEntityCode:'sample data'}

      ];
      service.getLoadMePhones().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/loadmephones/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(loadMePhone);
    });
  });


  describe('#createLoadMePhone', () => {
    var id = 1;
    it('should return an Promise<LoadMePhone>', () => {
      const loadMePhone: LoadMePhone = {pSeqMembId:1234, pSeqSubsId:1234, pMeMobileNum:'sample data', pMeHomeNum:'sample data', pEntityCode:'sample data'};
      service.createLoadMePhone(loadMePhone).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/loadmephones`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateLoadMePhone', () => {
    var id = 1;
    it('should return an Promise<LoadMePhone>', () => {
      const loadMePhone: LoadMePhone = {pSeqMembId:1234, pSeqSubsId:1234, pMeMobileNum:'sample data', pMeHomeNum:'sample data', pEntityCode:'sample data'};
      service.updateLoadMePhone(loadMePhone, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/loadmephones/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteLoadMePhone', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteLoadMePhone(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/loadmephones/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});