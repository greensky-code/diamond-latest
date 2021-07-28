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

import { GetOrigEffDateService } from './get-orig-eff-date.service';
import { GetOrigEffDate } from '../api-models/get-orig-eff-date.model'
import { GetOrigEffDates } from "../api-models/testing/fake-get-orig-eff-date.model"

describe('GetOrigEffDateService', () => {
  let injector: TestBed;
  let service: GetOrigEffDateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GetOrigEffDateService]
    });
    injector = getTestBed();
    service = injector.get(GetOrigEffDateService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGetOrigEffDates', () => {
    it('should return an Promise<GetOrigEffDate[]>', () => {
      const getOrigEffDate = [
       {pSeqMembId:1234},
       {pSeqMembId:1234},
       {pSeqMembId:1234}

      ];
      service.getGetOrigEffDates().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/getorigeffdates/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(getOrigEffDate);
    });
  });


  describe('#createGetOrigEffDate', () => {
    var id = 1;
    it('should return an Promise<GetOrigEffDate>', () => {
      const getOrigEffDate: GetOrigEffDate = {pSeqMembId:1234};
      service.createGetOrigEffDate(getOrigEffDate).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getorigeffdates`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGetOrigEffDate', () => {
    var id = 1;
    it('should return an Promise<GetOrigEffDate>', () => {
      const getOrigEffDate: GetOrigEffDate = {pSeqMembId:1234};
      service.updateGetOrigEffDate(getOrigEffDate, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getorigeffdates/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGetOrigEffDate', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGetOrigEffDate(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/getorigeffdates/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});