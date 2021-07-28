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

import { ProcGetPlanListAddonService } from './proc-get-plan-list-addon.service';
import { ProcGetPlanListAddon } from '../api-models/proc-get-plan-list-addon.model'
import { ProcGetPlanListAddons } from "../api-models/testing/fake-proc-get-plan-list-addon.model"

describe('ProcGetPlanListAddonService', () => {
  let injector: TestBed;
  let service: ProcGetPlanListAddonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProcGetPlanListAddonService]
    });
    injector = getTestBed();
    service = injector.get(ProcGetPlanListAddonService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProcGetPlanListAddons', () => {
    it('should return an Promise<ProcGetPlanListAddon[]>', () => {
      const procGetPlanListAddon = [
       {pGroupId:'sample data'},
       {pGroupId:'sample data'},
       {pGroupId:'sample data'}

      ];
      service.getProcGetPlanListAddons().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/procgetplanlistaddons/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(procGetPlanListAddon);
    });
  });


  describe('#createProcGetPlanListAddon', () => {
    var id = 1;
    it('should return an Promise<ProcGetPlanListAddon>', () => {
      const procGetPlanListAddon: ProcGetPlanListAddon = {pGroupId:'sample data'};
      service.createProcGetPlanListAddon(procGetPlanListAddon).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetplanlistaddons`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProcGetPlanListAddon', () => {
    var id = 1;
    it('should return an Promise<ProcGetPlanListAddon>', () => {
      const procGetPlanListAddon: ProcGetPlanListAddon = {pGroupId:'sample data'};
      service.updateProcGetPlanListAddon(procGetPlanListAddon, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetplanlistaddons/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProcGetPlanListAddon', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProcGetPlanListAddon(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/procgetplanlistaddons/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});