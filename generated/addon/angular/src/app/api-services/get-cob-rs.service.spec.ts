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

import { GetCobRsService } from './get-cob-rs.service';
import { GetCobRs } from '../api-models/get-cob-rs.model'
import { GetCobR } from "../api-models/testing/fake-get-cob-rs.model"

describe('GetCobRsService', () => {
  let injector: TestBed;
  let service: GetCobRsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetCobRsService]
    });
    injector = getTestBed();
    service = injector.get(GetCobRsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetCobR', () => {
    it('should return an Promise<GetCobRs[]>', () => {
      const getCobRs = [
       {pSeqMembId:1234},
       {pSeqMembId:1234},
       {pSeqMembId:1234}

      ];
      service.getGetCobR().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getcobr/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getCobRs);
    });
  });


  describe('#createGetCobRs', () => {
    var id = 1;
    it('should return an Promise<GetCobRs>', () => {
      const getCobRs: GetCobRs = {pSeqMembId:1234};
      service.createGetCobRs(getCobRs).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getcobr`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetCobRs', () => {
    var id = 1;
    it('should return an Promise<GetCobRs>', () => {
      const getCobRs: GetCobRs = {pSeqMembId:1234};
      service.updateGetCobRs(getCobRs, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getcobr/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetCobRs', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetCobRs(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getcobr/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});