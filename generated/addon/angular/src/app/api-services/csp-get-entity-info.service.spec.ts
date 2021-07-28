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

import { CspGetEntityInfoService } from './csp-get-entity-info.service';
import { CspGetEntityInfo } from '../api-models/csp-get-entity-info.model'
import { CspGetEntityInfos } from "../api-models/testing/fake-csp-get-entity-info.model"

describe('CspGetEntityInfoService', () => {
  let injector: TestBed;
  let service: CspGetEntityInfoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CspGetEntityInfoService]
    });
    injector = getTestBed();
    service = injector.get(CspGetEntityInfoService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCspGetEntityInfos', () => {
    it('should return an Promise<CspGetEntityInfo[]>', () => {
      const cspGetEntityInfo = [
       {pSeqEntityId:1234, pEntityCode:'sample data', pSeqMembId:1234, pSeqSubsId:1234},
       {pSeqEntityId:1234, pEntityCode:'sample data', pSeqMembId:1234, pSeqSubsId:1234},
       {pSeqEntityId:1234, pEntityCode:'sample data', pSeqMembId:1234, pSeqSubsId:1234}

      ];
      service.getCspGetEntityInfos().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetentityinfos/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(cspGetEntityInfo);
    });
  });


  describe('#createCspGetEntityInfo', () => {
    var id = 1;
    it('should return an Promise<CspGetEntityInfo>', () => {
      const cspGetEntityInfo: CspGetEntityInfo = {pSeqEntityId:1234, pEntityCode:'sample data', pSeqMembId:1234, pSeqSubsId:1234};
      service.createCspGetEntityInfo(cspGetEntityInfo).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetentityinfos`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCspGetEntityInfo', () => {
    var id = 1;
    it('should return an Promise<CspGetEntityInfo>', () => {
      const cspGetEntityInfo: CspGetEntityInfo = {pSeqEntityId:1234, pEntityCode:'sample data', pSeqMembId:1234, pSeqSubsId:1234};
      service.updateCspGetEntityInfo(cspGetEntityInfo, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetentityinfos/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCspGetEntityInfo', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCspGetEntityInfo(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/cspgetentityinfos/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});