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

import { GeoRegionZipRangeService } from './geo-region-zip-range.service';
import { GeoRegionZipRange } from '../api-models/geo-region-zip-range.model'
import { GeoRegionZipRanges } from "../api-models/testing/fake-geo-region-zip-range.model"

describe('GeoRegionZipRangeService', () => {
  let injector: TestBed;
  let service: GeoRegionZipRangeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GeoRegionZipRangeService]
    });
    injector = getTestBed();
    service = injector.get(GeoRegionZipRangeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getGeoRegionZipRanges', () => {
    it('should return an Promise<GeoRegionZipRange[]>', () => {
      const geoRegionZipRange = [
       {seqGeoRegionZipRange:1234, regionType:'sample data', regionCode:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqGeoRegionZipRange:1234, regionType:'sample data', regionCode:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqGeoRegionZipRange:1234, regionType:'sample data', regionCode:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getGeoRegionZipRanges().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/georegionzipranges/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(geoRegionZipRange);
    });
  });


  describe('#createGeoRegionZipRange', () => {
    var id = 1;
    it('should return an Promise<GeoRegionZipRange>', () => {
      const geoRegionZipRange: GeoRegionZipRange = {seqGeoRegionZipRange:1234, regionType:'sample data', regionCode:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createGeoRegionZipRange(geoRegionZipRange).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/georegionzipranges`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateGeoRegionZipRange', () => {
    var id = 1;
    it('should return an Promise<GeoRegionZipRange>', () => {
      const geoRegionZipRange: GeoRegionZipRange = {seqGeoRegionZipRange:1234, regionType:'sample data', regionCode:'sample data', fromValue:'sample data', thruValue:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateGeoRegionZipRange(geoRegionZipRange, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/georegionzipranges/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteGeoRegionZipRange', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteGeoRegionZipRange(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/georegionzipranges/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});