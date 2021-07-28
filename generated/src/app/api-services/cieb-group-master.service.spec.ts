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

import { CiebGroupMasterService } from './cieb-group-master.service';
import { CiebGroupMaster } from '../api-models/cieb-group-master.model'
import { CiebGroupMasters } from "../api-models/testing/fake-cieb-group-master.model"

describe('CiebGroupMasterService', () => {
  let injector: TestBed;
  let service: CiebGroupMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CiebGroupMasterService]
    });
    injector = getTestBed();
    service = injector.get(CiebGroupMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCiebGroupMasters', () => {
    it('should return an Promise<CiebGroupMaster[]>', () => {
      const ciebGroupMaster = [
       {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', rxprimeExtractFlag:'sample data', rxprimeClientId:'sample data', hsdGroupId:'sample data', seqGroupId:1234},
       {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', rxprimeExtractFlag:'sample data', rxprimeClientId:'sample data', hsdGroupId:'sample data', seqGroupId:1234},
       {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', rxprimeExtractFlag:'sample data', rxprimeClientId:'sample data', hsdGroupId:'sample data', seqGroupId:1234}

      ];
      service.getCiebGroupMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/ciebgroupmasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(ciebGroupMaster);
    });
  });


  describe('#createCiebGroupMaster', () => {
    var id = 1;
    it('should return an Promise<CiebGroupMaster>', () => {
      const ciebGroupMaster: CiebGroupMaster = {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', rxprimeExtractFlag:'sample data', rxprimeClientId:'sample data', hsdGroupId:'sample data', seqGroupId:1234};
      service.createCiebGroupMaster(ciebGroupMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebgroupmasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCiebGroupMaster', () => {
    var id = 1;
    it('should return an Promise<CiebGroupMaster>', () => {
      const ciebGroupMaster: CiebGroupMaster = {updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', rxprimeExtractFlag:'sample data', rxprimeClientId:'sample data', hsdGroupId:'sample data', seqGroupId:1234};
      service.updateCiebGroupMaster(ciebGroupMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebgroupmasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCiebGroupMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCiebGroupMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/ciebgroupmasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});