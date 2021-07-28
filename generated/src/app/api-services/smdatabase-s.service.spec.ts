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

import { SmdatabaseSService } from './smdatabase-s.service';
import { SmdatabaseS } from '../api-models/smdatabase-s.model'
import { SmdatabaseSs } from "../api-models/testing/fake-smdatabase-s.model"

describe('SmdatabaseSService', () => {
  let injector: TestBed;
  let service: SmdatabaseSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmdatabaseSService]
    });
    injector = getTestBed();
    service = injector.get(SmdatabaseSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmdatabaseSs', () => {
    it('should return an Promise<SmdatabaseS[]>', () => {
      const smdatabaseS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, databaseName:'sample data', databaseDescription:'sample data', databaseConnectstring:'sample data', databaseState:1234, databaseArchivelm:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, databaseName:'sample data', databaseDescription:'sample data', databaseConnectstring:'sample data', databaseState:1234, databaseArchivelm:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, databaseName:'sample data', databaseDescription:'sample data', databaseConnectstring:'sample data', databaseState:1234, databaseArchivelm:1234}

      ];
      service.getSmdatabaseSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smdatabasess/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smdatabaseS);
    });
  });


  describe('#createSmdatabaseS', () => {
    var id = 1;
    it('should return an Promise<SmdatabaseS>', () => {
      const smdatabaseS: SmdatabaseS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, databaseName:'sample data', databaseDescription:'sample data', databaseConnectstring:'sample data', databaseState:1234, databaseArchivelm:1234};
      service.createSmdatabaseS(smdatabaseS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smdatabasess`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmdatabaseS', () => {
    var id = 1;
    it('should return an Promise<SmdatabaseS>', () => {
      const smdatabaseS: SmdatabaseS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, databaseName:'sample data', databaseDescription:'sample data', databaseConnectstring:'sample data', databaseState:1234, databaseArchivelm:1234};
      service.updateSmdatabaseS(smdatabaseS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smdatabasess/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmdatabaseS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmdatabaseS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smdatabasess/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});