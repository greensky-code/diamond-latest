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

import { ModifierCodeMasterService } from './modifier-code-master.service';
import { ModifierCodeMaster } from '../api-models/modifier-code-master.model'
import { ModifierCodeMasters } from "../api-models/testing/fake-modifier-code-master.model"

describe('ModifierCodeMasterService', () => {
  let injector: TestBed;
  let service: ModifierCodeMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ModifierCodeMasterService]
    });
    injector = getTestBed();
    service = injector.get(ModifierCodeMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getModifierCodeMasters', () => {
    it('should return an Promise<ModifierCodeMaster[]>', () => {
      const modifierCodeMaster = [
       {modifierCode:'sample data', description:'sample data', anesthesiaInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', informationalFlag:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01'},
       {modifierCode:'sample data', description:'sample data', anesthesiaInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', informationalFlag:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01'},
       {modifierCode:'sample data', description:'sample data', anesthesiaInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', informationalFlag:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01'}

      ];
      service.getModifierCodeMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/modifiercodemasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(modifierCodeMaster);
    });
  });


  describe('#createModifierCodeMaster', () => {
    var id = 1;
    it('should return an Promise<ModifierCodeMaster>', () => {
      const modifierCodeMaster: ModifierCodeMaster = {modifierCode:'sample data', description:'sample data', anesthesiaInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', informationalFlag:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01'};
      service.createModifierCodeMaster(modifierCodeMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/modifiercodemasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateModifierCodeMaster', () => {
    var id = 1;
    it('should return an Promise<ModifierCodeMaster>', () => {
      const modifierCodeMaster: ModifierCodeMaster = {modifierCode:'sample data', description:'sample data', anesthesiaInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', informationalFlag:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', effectiveDate:'2018-01-01', termDate:'2018-01-01'};
      service.updateModifierCodeMaster(modifierCodeMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/modifiercodemasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteModifierCodeMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteModifierCodeMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/modifiercodemasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});