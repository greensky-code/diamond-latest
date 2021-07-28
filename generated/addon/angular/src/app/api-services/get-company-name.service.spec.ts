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

import { GetCompanyNameService } from './get-company-name.service';
import { GetCompanyName } from '../api-models/get-company-name.model'
import { GetCompanyNames } from "../api-models/testing/fake-get-company-name.model"

describe('GetCompanyNameService', () => {
  let injector: TestBed;
  let service: GetCompanyNameService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetCompanyNameService]
    });
    injector = getTestBed();
    service = injector.get(GetCompanyNameService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetCompanyNames', () => {
    it('should return an Promise<GetCompanyName[]>', () => {
      const getCompanyName = [
       {pSeqGroupId:1234, pSvcStartDt:'sample data'},
       {pSeqGroupId:1234, pSvcStartDt:'sample data'},
       {pSeqGroupId:1234, pSvcStartDt:'sample data'}

      ];
      service.getGetCompanyNames().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getcompanynames/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getCompanyName);
    });
  });


  describe('#createGetCompanyName', () => {
    var id = 1;
    it('should return an Promise<GetCompanyName>', () => {
      const getCompanyName: GetCompanyName = {pSeqGroupId:1234, pSvcStartDt:'sample data'};
      service.createGetCompanyName(getCompanyName).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getcompanynames`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetCompanyName', () => {
    var id = 1;
    it('should return an Promise<GetCompanyName>', () => {
      const getCompanyName: GetCompanyName = {pSeqGroupId:1234, pSvcStartDt:'sample data'};
      service.updateGetCompanyName(getCompanyName, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getcompanynames/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetCompanyName', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetCompanyName(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getcompanynames/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});