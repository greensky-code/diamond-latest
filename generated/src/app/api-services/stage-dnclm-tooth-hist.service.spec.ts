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

import { StageDnclmToothHistService } from './stage-dnclm-tooth-hist.service';
import { StageDnclmToothHist } from '../api-models/stage-dnclm-tooth-hist.model'
import { StageDnclmToothHists } from "../api-models/testing/fake-stage-dnclm-tooth-hist.model"

describe('StageDnclmToothHistService', () => {
  let injector: TestBed;
  let service: StageDnclmToothHistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StageDnclmToothHistService]
    });
    injector = getTestBed();
    service = injector.get(StageDnclmToothHistService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStageDnclmToothHists', () => {
    it('should return an Promise<StageDnclmToothHist[]>', () => {
      const stageDnclmToothHist = [
       {batchId:'sample data', transactionId:1234, toothNo:'sample data', toothStatus:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, toothNo:'sample data', toothStatus:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, toothNo:'sample data', toothStatus:'sample data', insertDatetime:'2018-01-01'}

      ];
      service.getStageDnclmToothHists().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stagednclmtoothhists/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stageDnclmToothHist);
    });
  });


  describe('#createStageDnclmToothHist', () => {
    var id = 1;
    it('should return an Promise<StageDnclmToothHist>', () => {
      const stageDnclmToothHist: StageDnclmToothHist = {batchId:'sample data', transactionId:1234, toothNo:'sample data', toothStatus:'sample data', insertDatetime:'2018-01-01'};
      service.createStageDnclmToothHist(stageDnclmToothHist).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagednclmtoothhists`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStageDnclmToothHist', () => {
    var id = 1;
    it('should return an Promise<StageDnclmToothHist>', () => {
      const stageDnclmToothHist: StageDnclmToothHist = {batchId:'sample data', transactionId:1234, toothNo:'sample data', toothStatus:'sample data', insertDatetime:'2018-01-01'};
      service.updateStageDnclmToothHist(stageDnclmToothHist, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagednclmtoothhists/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStageDnclmToothHist', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStageDnclmToothHist(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagednclmtoothhists/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});