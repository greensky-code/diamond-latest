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

import { MedDefnAltSrchParamsService } from './med-defn-alt-srch-params.service';
import { MedDefnAltSrchParams } from '../api-models/med-defn-alt-srch-params.model'
import { MedDefnAltSrchParamss } from "../api-models/testing/fake-med-defn-alt-srch-params.model"

describe('MedDefnAltSrchParamsService', () => {
  let injector: TestBed;
  let service: MedDefnAltSrchParamsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MedDefnAltSrchParamsService]
    });
    injector = getTestBed();
    service = injector.get(MedDefnAltSrchParamsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMedDefnAltSrchParamss', () => {
    it('should return an Promise<MedDefnAltSrchParams[]>', () => {
      const medDefnAltSrchParams = [
       {criteriaSrchPriority:1234, altSrchCriteria:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', medorDisplayColumn:'sample data'},
       {criteriaSrchPriority:1234, altSrchCriteria:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', medorDisplayColumn:'sample data'},
       {criteriaSrchPriority:1234, altSrchCriteria:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', medorDisplayColumn:'sample data'}

      ];
      service.getMedDefnAltSrchParamss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/meddefnaltsrchparamss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(medDefnAltSrchParams);
    });
  });


  describe('#createMedDefnAltSrchParams', () => {
    var id = 1;
    it('should return an Promise<MedDefnAltSrchParams>', () => {
      const medDefnAltSrchParams: MedDefnAltSrchParams = {criteriaSrchPriority:1234, altSrchCriteria:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', medorDisplayColumn:'sample data'};
      service.createMedDefnAltSrchParams(medDefnAltSrchParams).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/meddefnaltsrchparamss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMedDefnAltSrchParams', () => {
    var id = 1;
    it('should return an Promise<MedDefnAltSrchParams>', () => {
      const medDefnAltSrchParams: MedDefnAltSrchParams = {criteriaSrchPriority:1234, altSrchCriteria:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', medorDisplayColumn:'sample data'};
      service.updateMedDefnAltSrchParams(medDefnAltSrchParams, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/meddefnaltsrchparamss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMedDefnAltSrchParams', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMedDefnAltSrchParams(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/meddefnaltsrchparamss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});