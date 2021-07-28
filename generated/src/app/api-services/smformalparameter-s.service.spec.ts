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

import { SmformalparameterSService } from './smformalparameter-s.service';
import { SmformalparameterS } from '../api-models/smformalparameter-s.model'
import { SmformalparameterSs } from "../api-models/testing/fake-smformalparameter-s.model"

describe('SmformalparameterSService', () => {
  let injector: TestBed;
  let service: SmformalparameterSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmformalparameterSService]
    });
    injector = getTestBed();
    service = injector.get(SmformalparameterSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmformalparameterSs', () => {
    it('should return an Promise<SmformalparameterS[]>', () => {
      const smformalparameterS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, formalparameterParametername:'sample data', formalparameterDescription:'sample data', formalparameterIsscalar:1234, formalparameterIsmandatory:1234, formalparameterUserdefflag:1234, numberformalparameterLbound:1234, numberformalparameterUbound:1234, objectformalparameterFpot:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, formalparameterParametername:'sample data', formalparameterDescription:'sample data', formalparameterIsscalar:1234, formalparameterIsmandatory:1234, formalparameterUserdefflag:1234, numberformalparameterLbound:1234, numberformalparameterUbound:1234, objectformalparameterFpot:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, formalparameterParametername:'sample data', formalparameterDescription:'sample data', formalparameterIsscalar:1234, formalparameterIsmandatory:1234, formalparameterUserdefflag:1234, numberformalparameterLbound:1234, numberformalparameterUbound:1234, objectformalparameterFpot:1234}

      ];
      service.getSmformalparameterSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smformalparameterss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smformalparameterS);
    });
  });


  describe('#createSmformalparameterS', () => {
    var id = 1;
    it('should return an Promise<SmformalparameterS>', () => {
      const smformalparameterS: SmformalparameterS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, formalparameterParametername:'sample data', formalparameterDescription:'sample data', formalparameterIsscalar:1234, formalparameterIsmandatory:1234, formalparameterUserdefflag:1234, numberformalparameterLbound:1234, numberformalparameterUbound:1234, objectformalparameterFpot:1234};
      service.createSmformalparameterS(smformalparameterS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smformalparameterss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmformalparameterS', () => {
    var id = 1;
    it('should return an Promise<SmformalparameterS>', () => {
      const smformalparameterS: SmformalparameterS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, formalparameterParametername:'sample data', formalparameterDescription:'sample data', formalparameterIsscalar:1234, formalparameterIsmandatory:1234, formalparameterUserdefflag:1234, numberformalparameterLbound:1234, numberformalparameterUbound:1234, objectformalparameterFpot:1234};
      service.updateSmformalparameterS(smformalparameterS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smformalparameterss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmformalparameterS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmformalparameterS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smformalparameterss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});