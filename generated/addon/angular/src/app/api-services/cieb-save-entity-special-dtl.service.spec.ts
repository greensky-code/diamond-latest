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

import { CiebSaveEntitySpecialDtlService } from './cieb-save-entity-special-dtl.service';
import { CiebSaveEntitySpecialDtl } from '../api-models/cieb-save-entity-special-dtl.model'
import { CiebSaveEntitySpecialDtls } from "../api-models/testing/fake-cieb-save-entity-special-dtl.model"

describe('CiebSaveEntitySpecialDtlService', () => {
  let injector: TestBed;
  let service: CiebSaveEntitySpecialDtlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebSaveEntitySpecialDtlService]
    });
    injector = getTestBed();
    service = injector.get(CiebSaveEntitySpecialDtlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebSaveEntitySpecialDtls', () => {
    it('should return an Promise<CiebSaveEntitySpecialDtl[]>', () => {
      const ciebSaveEntitySpecialDtl = [
       {pSeqEntityId:1234},
       {pSeqEntityId:1234},
       {pSeqEntityId:1234}

      ];
      service.getCiebSaveEntitySpecialDtls().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebsaveentityspecialdtls/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebSaveEntitySpecialDtl);
    });
  });


  describe('#createCiebSaveEntitySpecialDtl', () => {
    var id = 1;
    it('should return an Promise<CiebSaveEntitySpecialDtl>', () => {
      const ciebSaveEntitySpecialDtl: CiebSaveEntitySpecialDtl = {pSeqEntityId:1234};
      service.createCiebSaveEntitySpecialDtl(ciebSaveEntitySpecialDtl).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebsaveentityspecialdtls`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebSaveEntitySpecialDtl', () => {
    var id = 1;
    it('should return an Promise<CiebSaveEntitySpecialDtl>', () => {
      const ciebSaveEntitySpecialDtl: CiebSaveEntitySpecialDtl = {pSeqEntityId:1234};
      service.updateCiebSaveEntitySpecialDtl(ciebSaveEntitySpecialDtl, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebsaveentityspecialdtls/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebSaveEntitySpecialDtl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebSaveEntitySpecialDtl(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebsaveentityspecialdtls/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});