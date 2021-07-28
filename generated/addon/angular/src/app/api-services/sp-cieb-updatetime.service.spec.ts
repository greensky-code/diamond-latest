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

import { SpCiebUpdatetimeService } from './sp-cieb-updatetime.service';
import { SpCiebUpdatetime } from '../api-models/sp-cieb-updatetime.model'
import { SpCiebUpdatetimes } from "../api-models/testing/fake-sp-cieb-updatetime.model"

describe('SpCiebUpdatetimeService', () => {
  let injector: TestBed;
  let service: SpCiebUpdatetimeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpCiebUpdatetimeService]
    });
    injector = getTestBed();
    service = injector.get(SpCiebUpdatetimeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSpCiebUpdatetimes', () => {
    it('should return an Promise<SpCiebUpdatetime[]>', () => {
      const spCiebUpdatetime = [
       {pProcname:'sample data'},
       {pProcname:'sample data'},
       {pProcname:'sample data'}

      ];
      service.getSpCiebUpdatetimes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/spciebupdatetimes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(spCiebUpdatetime);
    });
  });


  describe('#createSpCiebUpdatetime', () => {
    var id = 1;
    it('should return an Promise<SpCiebUpdatetime>', () => {
      const spCiebUpdatetime: SpCiebUpdatetime = {pProcname:'sample data'};
      service.createSpCiebUpdatetime(spCiebUpdatetime).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/spciebupdatetimes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSpCiebUpdatetime', () => {
    var id = 1;
    it('should return an Promise<SpCiebUpdatetime>', () => {
      const spCiebUpdatetime: SpCiebUpdatetime = {pProcname:'sample data'};
      service.updateSpCiebUpdatetime(spCiebUpdatetime, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/spciebupdatetimes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSpCiebUpdatetime', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSpCiebUpdatetime(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/spciebupdatetimes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});