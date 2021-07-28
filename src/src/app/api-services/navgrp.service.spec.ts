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

import { NavgrpService } from './navgrp.service';
import { Navgrp } from '../api-models/navgrp.model'
import { Navgrps } from "../api-models/testing/fake-navgrp.model"

describe('NavgrpService', () => {
  let injector: TestBed;
  let service: NavgrpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NavgrpService]
    });
    injector = getTestBed();
    service = injector.get(NavgrpService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getNavgrps', () => {
    it('should return an Promise<Navgrp[]>', () => {
      const navgrp = [
       {languageId:1234, bitmapGraphic:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', ldescr:'sample data', sdescr:'sample data', navgrpId:'sample data'},
       {languageId:1234, bitmapGraphic:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', ldescr:'sample data', sdescr:'sample data', navgrpId:'sample data'},
       {languageId:1234, bitmapGraphic:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', ldescr:'sample data', sdescr:'sample data', navgrpId:'sample data'}

      ];
      service.getNavgrps().then(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/navgrps/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(navgrp);
    });
  });


  describe('#createNavgrp', () => {
    var id = 1;
    it('should return an Promise<Navgrp>', () => {
      const navgrp: Navgrp = {languageId:1234, bitmapGraphic:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', ldescr:'sample data', sdescr:'sample data', navgrpId:'sample data'};
      service.createNavgrp(navgrp).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/navgrps`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateNavgrp', () => {
    var id = 1;
    it('should return an Promise<Navgrp>', () => {
      const navgrp: Navgrp = {languageId:1234, bitmapGraphic:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', ldescr:'sample data', sdescr:'sample data', navgrpId:'sample data'};
      service.updateNavgrp(navgrp, id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/navgrps/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteNavgrp', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteNavgrp(id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/navgrps/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});