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

import { EdiMessageMasterService } from './edi-message-master.service';
import { EdiMessageMaster } from '../api-models/edi-message-master.model'
import { EdiMessageMasters } from "../api-models/testing/fake-edi-message-master.model"

describe('EdiMessageMasterService', () => {
  let injector: TestBed;
  let service: EdiMessageMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EdiMessageMasterService]
    });
    injector = getTestBed();
    service = injector.get(EdiMessageMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getEdiMessageMasters', () => {
    it('should return an Promise<EdiMessageMaster[]>', () => {
      const ediMessageMaster = [
       {processCode:'sample data', messageCode:'sample data', defaultMessageText:'sample data', reportCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', severityLevel:'sample data', responseString:'sample data', messageId:1234},
       {processCode:'sample data', messageCode:'sample data', defaultMessageText:'sample data', reportCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', severityLevel:'sample data', responseString:'sample data', messageId:1234},
       {processCode:'sample data', messageCode:'sample data', defaultMessageText:'sample data', reportCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', severityLevel:'sample data', responseString:'sample data', messageId:1234}

      ];
      service.getEdiMessageMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/edimessagemasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ediMessageMaster);
    });
  });


  describe('#createEdiMessageMaster', () => {
    var id = 1;
    it('should return an Promise<EdiMessageMaster>', () => {
      const ediMessageMaster: EdiMessageMaster = {processCode:'sample data', messageCode:'sample data', defaultMessageText:'sample data', reportCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', severityLevel:'sample data', responseString:'sample data', messageId:1234};
      service.createEdiMessageMaster(ediMessageMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/edimessagemasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateEdiMessageMaster', () => {
    var id = 1;
    it('should return an Promise<EdiMessageMaster>', () => {
      const ediMessageMaster: EdiMessageMaster = {processCode:'sample data', messageCode:'sample data', defaultMessageText:'sample data', reportCode:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', severityLevel:'sample data', responseString:'sample data', messageId:1234};
      service.updateEdiMessageMaster(ediMessageMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/edimessagemasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteEdiMessageMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteEdiMessageMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/edimessagemasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});