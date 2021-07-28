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

import { SecWinService } from './sec-win.service';
import { SecWin } from '../api-models/sec-win.model'
import { SecWins } from "../api-models/testing/fake-sec-win.model"

describe('SecWinService', () => {
  let injector: TestBed;
  let service: SecWinService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SecWinService]
    });
    injector = getTestBed();
    service = injector.get(SecWinService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSecWins', () => {
    it('should return an Promise<SecWin[]>', () => {
      const secWin = [
       {userId:'sample data', winId:'sample data', pSel:'sample data', pIns:'sample data', pUpd:'sample data', pDel:'sample data', maxOpen:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', languageId:1234},
       {userId:'sample data', winId:'sample data', pSel:'sample data', pIns:'sample data', pUpd:'sample data', pDel:'sample data', maxOpen:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', languageId:1234},
       {userId:'sample data', winId:'sample data', pSel:'sample data', pIns:'sample data', pUpd:'sample data', pDel:'sample data', maxOpen:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', languageId:1234}

      ];
      service.getSecWins().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/secwins/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(secWin);
    });
  });


  describe('#createSecWin', () => {
    var id = 1;
    it('should return an Promise<SecWin>', () => {
      const secWin: SecWin = {userId:'sample data', winId:'sample data', pSel:'sample data', pIns:'sample data', pUpd:'sample data', pDel:'sample data', maxOpen:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', languageId:1234};
      service.createSecWin(secWin).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secwins`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSecWin', () => {
    var id = 1;
    it('should return an Promise<SecWin>', () => {
      const secWin: SecWin = {userId:'sample data', winId:'sample data', pSel:'sample data', pIns:'sample data', pUpd:'sample data', pDel:'sample data', maxOpen:1234, insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', languageId:1234};
      service.updateSecWin(secWin, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secwins/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSecWin', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSecWin(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secwins/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});