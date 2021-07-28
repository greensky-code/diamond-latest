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

import { SpCiebGettimeService } from './sp-cieb-gettime.service';
import { SpCiebGettime } from '../api-models/sp-cieb-gettime.model'
import { SpCiebGettimes } from "../api-models/testing/fake-sp-cieb-gettime.model"

describe('SpCiebGettimeService', () => {
  let injector: TestBed;
  let service: SpCiebGettimeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpCiebGettimeService]
    });
    injector = getTestBed();
    service = injector.get(SpCiebGettimeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSpCiebGettimes', () => {
    it('should return an Promise<SpCiebGettime[]>', () => {
      const spCiebGettime = [
       {pFromdate:'sample data', pTodate:'sample data', pProcname:'sample data', pInitdate:'sample data'},
       {pFromdate:'sample data', pTodate:'sample data', pProcname:'sample data', pInitdate:'sample data'},
       {pFromdate:'sample data', pTodate:'sample data', pProcname:'sample data', pInitdate:'sample data'}

      ];
      service.getSpCiebGettimes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/spciebgettimes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(spCiebGettime);
    });
  });


  describe('#createSpCiebGettime', () => {
    var id = 1;
    it('should return an Promise<SpCiebGettime>', () => {
      const spCiebGettime: SpCiebGettime = {pFromdate:'sample data', pTodate:'sample data', pProcname:'sample data', pInitdate:'sample data'};
      service.createSpCiebGettime(spCiebGettime).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/spciebgettimes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSpCiebGettime', () => {
    var id = 1;
    it('should return an Promise<SpCiebGettime>', () => {
      const spCiebGettime: SpCiebGettime = {pFromdate:'sample data', pTodate:'sample data', pProcname:'sample data', pInitdate:'sample data'};
      service.updateSpCiebGettime(spCiebGettime, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/spciebgettimes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSpCiebGettime', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSpCiebGettime(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/spciebgettimes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});