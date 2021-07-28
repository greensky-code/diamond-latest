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

import { CiebAddonMeConfigService } from './cieb-addon-me-config.service';
import { CiebAddonMeConfig } from '../api-models/cieb-addon-me-config.model'
import { CiebAddonMeConfigs } from "../api-models/testing/fake-cieb-addon-me-config.model"

describe('CiebAddonMeConfigService', () => {
  let injector: TestBed;
  let service: CiebAddonMeConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebAddonMeConfigService]
    });
    injector = getTestBed();
    service = injector.get(CiebAddonMeConfigService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebAddonMeConfigs', () => {
    it('should return an Promise<CiebAddonMeConfig[]>', () => {
      const ciebAddonMeConfig = [
       {seqCodeId:1234, countryCode:'sample data', codeType:'sample data', code1:'sample data', codeDesc:'sample data', code2:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCodeId:1234, countryCode:'sample data', codeType:'sample data', code1:'sample data', codeDesc:'sample data', code2:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqCodeId:1234, countryCode:'sample data', codeType:'sample data', code1:'sample data', codeDesc:'sample data', code2:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getCiebAddonMeConfigs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebaddonmeconfigs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebAddonMeConfig);
    });
  });


  describe('#createCiebAddonMeConfig', () => {
    var id = 1;
    it('should return an Promise<CiebAddonMeConfig>', () => {
      const ciebAddonMeConfig: CiebAddonMeConfig = {seqCodeId:1234, countryCode:'sample data', codeType:'sample data', code1:'sample data', codeDesc:'sample data', code2:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createCiebAddonMeConfig(ciebAddonMeConfig).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebaddonmeconfigs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebAddonMeConfig', () => {
    var id = 1;
    it('should return an Promise<CiebAddonMeConfig>', () => {
      const ciebAddonMeConfig: CiebAddonMeConfig = {seqCodeId:1234, countryCode:'sample data', codeType:'sample data', code1:'sample data', codeDesc:'sample data', code2:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateCiebAddonMeConfig(ciebAddonMeConfig, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebaddonmeconfigs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebAddonMeConfig', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebAddonMeConfig(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebaddonmeconfigs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});