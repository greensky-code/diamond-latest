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

import { SmscheduleSService } from './smschedule-s.service';
import { SmscheduleS } from '../api-models/smschedule-s.model'
import { SmscheduleSs } from "../api-models/testing/fake-smschedule-s.model"

describe('SmscheduleSService', () => {
  let injector: TestBed;
  let service: SmscheduleSService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SmscheduleSService]
    });
    injector = getTestBed();
    service = injector.get(SmscheduleSService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSmscheduleSs', () => {
    it('should return an Promise<SmscheduleS[]>', () => {
      const smscheduleS = [
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, scheduleHasexpiration:1234, scheduleExpDate:'2018-01-01', scheduleExpTodSpm:1234, scheduleExpTodZone:1234, repeatedIsimmediate:1234, repeatedStarttimeDate:'2018-01-01', repeatedStarttimeTodSpm:1234, repeatedStarttimeTodZone:1234, repeatedSecondsinperiod:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, scheduleHasexpiration:1234, scheduleExpDate:'2018-01-01', scheduleExpTodSpm:1234, scheduleExpTodZone:1234, repeatedIsimmediate:1234, repeatedStarttimeDate:'2018-01-01', repeatedStarttimeTodSpm:1234, repeatedStarttimeTodZone:1234, repeatedSecondsinperiod:1234},
       {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, scheduleHasexpiration:1234, scheduleExpDate:'2018-01-01', scheduleExpTodSpm:1234, scheduleExpTodZone:1234, repeatedIsimmediate:1234, repeatedStarttimeDate:'2018-01-01', repeatedStarttimeTodSpm:1234, repeatedStarttimeTodZone:1234, repeatedSecondsinperiod:1234}

      ];
      service.getSmscheduleSs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/smscheduless/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(smscheduleS);
    });
  });


  describe('#createSmscheduleS', () => {
    var id = 1;
    it('should return an Promise<SmscheduleS>', () => {
      const smscheduleS: SmscheduleS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, scheduleHasexpiration:1234, scheduleExpDate:'2018-01-01', scheduleExpTodSpm:1234, scheduleExpTodZone:1234, repeatedIsimmediate:1234, repeatedStarttimeDate:'2018-01-01', repeatedStarttimeTodSpm:1234, repeatedStarttimeTodZone:1234, repeatedSecondsinperiod:1234};
      service.createSmscheduleS(smscheduleS).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smscheduless`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSmscheduleS', () => {
    var id = 1;
    it('should return an Promise<SmscheduleS>', () => {
      const smscheduleS: SmscheduleS = {namedobjectIdSequenceid:1234, namedobjectIdObjecttype:1234, scheduleHasexpiration:1234, scheduleExpDate:'2018-01-01', scheduleExpTodSpm:1234, scheduleExpTodZone:1234, repeatedIsimmediate:1234, repeatedStarttimeDate:'2018-01-01', repeatedStarttimeTodSpm:1234, repeatedStarttimeTodZone:1234, repeatedSecondsinperiod:1234};
      service.updateSmscheduleS(smscheduleS, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smscheduless/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSmscheduleS', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSmscheduleS(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/smscheduless/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});