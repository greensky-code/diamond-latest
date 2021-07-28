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

import { ApcInterfaceRulesService } from './apc-interface-rules.service';
import { ApcInterfaceRules } from '../api-models/apc-interface-rules.model'
import { ApcInterfaceRuleses } from "../api-models/testing/fake-apc-interface-rules.model"

describe('ApcInterfaceRulesService', () => {
  let injector: TestBed;
  let service: ApcInterfaceRulesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApcInterfaceRulesService]
    });
    injector = getTestBed();
    service = injector.get(ApcInterfaceRulesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getApcInterfaceRuleses', () => {
    it('should return an Promise<ApcInterfaceRules[]>', () => {
      const apcInterfaceRules = [
       {lineOfBusiness:'sample data', dispositionLevel:'sample data', claimAction:'sample data', reasonCode:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'},
       {lineOfBusiness:'sample data', dispositionLevel:'sample data', claimAction:'sample data', reasonCode:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'},
       {lineOfBusiness:'sample data', dispositionLevel:'sample data', claimAction:'sample data', reasonCode:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'}

      ];
      service.getApcInterfaceRuleses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/apcinterfaceruleses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(apcInterfaceRules);
    });
  });


  describe('#createApcInterfaceRules', () => {
    var id = 1;
    it('should return an Promise<ApcInterfaceRules>', () => {
      const apcInterfaceRules: ApcInterfaceRules = {lineOfBusiness:'sample data', dispositionLevel:'sample data', claimAction:'sample data', reasonCode:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'};
      service.createApcInterfaceRules(apcInterfaceRules).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/apcinterfaceruleses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateApcInterfaceRules', () => {
    var id = 1;
    it('should return an Promise<ApcInterfaceRules>', () => {
      const apcInterfaceRules: ApcInterfaceRules = {lineOfBusiness:'sample data', dispositionLevel:'sample data', claimAction:'sample data', reasonCode:'sample data', securityCode:'sample data', insertUser:'sample data', insertProcess:'sample data', insertDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', updateDatetime:'2018-01-01'};
      service.updateApcInterfaceRules(apcInterfaceRules, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/apcinterfaceruleses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteApcInterfaceRules', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteApcInterfaceRules(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/apcinterfaceruleses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});