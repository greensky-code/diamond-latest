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

import { MedDefAltSearchColumnsService } from './med-def-alt-search-columns.service';
import { MedDefAltSearchColumns } from '../api-models/med-def-alt-search-columns.model'
import { MedDefAltSearchColumnss } from "../api-models/testing/fake-med-def-alt-search-columns.model"

describe('MedDefAltSearchColumnsService', () => {
  let injector: TestBed;
  let service: MedDefAltSearchColumnsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MedDefAltSearchColumnsService]
    });
    injector = getTestBed();
    service = injector.get(MedDefAltSearchColumnsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMedDefAltSearchColumnss', () => {
    it('should return an Promise<MedDefAltSearchColumns[]>', () => {
      const medDefAltSearchColumns = [
       {claimHdrColumns:'sample data', validationTableName:'sample data', validationColumnName:'sample data', medorDisplayColumn:'sample data'},
       {claimHdrColumns:'sample data', validationTableName:'sample data', validationColumnName:'sample data', medorDisplayColumn:'sample data'},
       {claimHdrColumns:'sample data', validationTableName:'sample data', validationColumnName:'sample data', medorDisplayColumn:'sample data'}

      ];
      service.getMedDefAltSearchColumnss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/meddefaltsearchcolumnss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(medDefAltSearchColumns);
    });
  });


  describe('#createMedDefAltSearchColumns', () => {
    var id = 1;
    it('should return an Promise<MedDefAltSearchColumns>', () => {
      const medDefAltSearchColumns: MedDefAltSearchColumns = {claimHdrColumns:'sample data', validationTableName:'sample data', validationColumnName:'sample data', medorDisplayColumn:'sample data'};
      service.createMedDefAltSearchColumns(medDefAltSearchColumns).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/meddefaltsearchcolumnss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMedDefAltSearchColumns', () => {
    var id = 1;
    it('should return an Promise<MedDefAltSearchColumns>', () => {
      const medDefAltSearchColumns: MedDefAltSearchColumns = {claimHdrColumns:'sample data', validationTableName:'sample data', validationColumnName:'sample data', medorDisplayColumn:'sample data'};
      service.updateMedDefAltSearchColumns(medDefAltSearchColumns, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/meddefaltsearchcolumnss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMedDefAltSearchColumns', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMedDefAltSearchColumns(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/meddefaltsearchcolumnss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});