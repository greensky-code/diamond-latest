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

import { NavgrpKwService } from './navgrp-kw.service';
import { NavgrpKw } from '../api-models/navgrp-kw.model'
import { NavgrpKws } from "../api-models/testing/fake-navgrp-kw.model"

describe('NavgrpKwService', () => {
  let injector: TestBed;
  let service: NavgrpKwService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NavgrpKwService]
    });
    injector = getTestBed();
    service = injector.get(NavgrpKwService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getNavgrpKws', () => {
    it('should return an Promise<NavgrpKw[]>', () => {
      const navgrpKw = [
       {auditTrail:'sample data', languageId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', winId:'sample data', navgrpId:'sample data'},
       {auditTrail:'sample data', languageId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', winId:'sample data', navgrpId:'sample data'},
       {auditTrail:'sample data', languageId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', winId:'sample data', navgrpId:'sample data'}

      ];
      service.getNavgrpKws().then(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/navgrpkws/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(navgrpKw);
    });
  });


  describe('#createNavgrpKw', () => {
    var id = 1;
    it('should return an Promise<NavgrpKw>', () => {
      const navgrpKw: NavgrpKw = {auditTrail:'sample data', languageId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', winId:'sample data', navgrpId:'sample data'};
      service.createNavgrpKw(navgrpKw).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/navgrpkws`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateNavgrpKw', () => {
    var id = 1;
    it('should return an Promise<NavgrpKw>', () => {
      const navgrpKw: NavgrpKw = {auditTrail:'sample data', languageId:1234, updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', winId:'sample data', navgrpId:'sample data'};
      service.updateNavgrpKw(navgrpKw, id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/navgrpkws/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteNavgrpKw', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteNavgrpKw(id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/navgrpkws/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});