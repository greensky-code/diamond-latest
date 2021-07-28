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

import { PrediControlService } from './predi-control.service';
import { PrediControl } from '../api-models/predi-control.model'
import { PrediControls } from "../api-models/testing/fake-predi-control.model"

describe('PrediControlService', () => {
  let injector: TestBed;
  let service: PrediControlService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PrediControlService]
    });
    injector = getTestBed();
    service = injector.get(PrediControlService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPrediControls', () => {
    it('should return an Promise<PrediControl[]>', () => {
      const prediControl = [
       {runOptionString:'sample data', fileType:'sample data', controlFileName:'sample data', controlFilePath:'sample data', securityCode:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'},
       {runOptionString:'sample data', fileType:'sample data', controlFileName:'sample data', controlFilePath:'sample data', securityCode:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'},
       {runOptionString:'sample data', fileType:'sample data', controlFileName:'sample data', controlFilePath:'sample data', securityCode:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'}

      ];
      service.getPrediControls().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/predicontrols/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(prediControl);
    });
  });


  describe('#createPrediControl', () => {
    var id = 1;
    it('should return an Promise<PrediControl>', () => {
      const prediControl: PrediControl = {runOptionString:'sample data', fileType:'sample data', controlFileName:'sample data', controlFilePath:'sample data', securityCode:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'};
      service.createPrediControl(prediControl).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/predicontrols`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePrediControl', () => {
    var id = 1;
    it('should return an Promise<PrediControl>', () => {
      const prediControl: PrediControl = {runOptionString:'sample data', fileType:'sample data', controlFileName:'sample data', controlFilePath:'sample data', securityCode:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'};
      service.updatePrediControl(prediControl, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/predicontrols/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePrediControl', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePrediControl(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/predicontrols/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});