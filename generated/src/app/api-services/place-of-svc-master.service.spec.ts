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

import { PlaceOfSvcMasterService } from './place-of-svc-master.service';
import { PlaceOfSvcMaster } from '../api-models/place-of-svc-master.model'
import { PlacesOfSvcMaster } from "../api-models/testing/fake-place-of-svc-master.model"

describe('PlaceOfSvcMasterService', () => {
  let injector: TestBed;
  let service: PlaceOfSvcMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlaceOfSvcMasterService]
    });
    injector = getTestBed();
    service = injector.get(PlaceOfSvcMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getPlacesOfSvcMaster', () => {
    it('should return an Promise<PlaceOfSvcMaster[]>', () => {
      const placeOfSvcMaster = [
       {placeOfSvcCode:'sample data', description:'sample data', securityCode:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'},
       {placeOfSvcCode:'sample data', description:'sample data', securityCode:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'},
       {placeOfSvcCode:'sample data', description:'sample data', securityCode:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'}

      ];
      service.getPlacesOfSvcMaster().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/placesofsvcmaster/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(placeOfSvcMaster);
    });
  });


  describe('#createPlaceOfSvcMaster', () => {
    var id = 1;
    it('should return an Promise<PlaceOfSvcMaster>', () => {
      const placeOfSvcMaster: PlaceOfSvcMaster = {placeOfSvcCode:'sample data', description:'sample data', securityCode:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'};
      service.createPlaceOfSvcMaster(placeOfSvcMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/placesofsvcmaster`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updatePlaceOfSvcMaster', () => {
    var id = 1;
    it('should return an Promise<PlaceOfSvcMaster>', () => {
      const placeOfSvcMaster: PlaceOfSvcMaster = {placeOfSvcCode:'sample data', description:'sample data', securityCode:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data'};
      service.updatePlaceOfSvcMaster(placeOfSvcMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/placesofsvcmaster/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deletePlaceOfSvcMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deletePlaceOfSvcMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/placesofsvcmaster/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});