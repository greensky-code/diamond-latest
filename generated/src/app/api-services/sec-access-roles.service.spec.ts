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

import { SecAccessRolesService } from './sec-access-roles.service';
import { SecAccessRoles } from '../api-models/sec-access-roles.model'
import { SecAccessRoleses } from "../api-models/testing/fake-sec-access-roles.model"

describe('SecAccessRolesService', () => {
  let injector: TestBed;
  let service: SecAccessRolesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SecAccessRolesService]
    });
    injector = getTestBed();
    service = injector.get(SecAccessRolesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSecAccessRoleses', () => {
    it('should return an Promise<SecAccessRoles[]>', () => {
      const secAccessRoles = [
       {roleName:'sample data', rolePassword:'sample data'},
       {roleName:'sample data', rolePassword:'sample data'},
       {roleName:'sample data', rolePassword:'sample data'}

      ];
      service.getSecAccessRoleses().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/secaccessroleses/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(secAccessRoles);
    });
  });


  describe('#createSecAccessRoles', () => {
    var id = 1;
    it('should return an Promise<SecAccessRoles>', () => {
      const secAccessRoles: SecAccessRoles = {roleName:'sample data', rolePassword:'sample data'};
      service.createSecAccessRoles(secAccessRoles).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secaccessroleses`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSecAccessRoles', () => {
    var id = 1;
    it('should return an Promise<SecAccessRoles>', () => {
      const secAccessRoles: SecAccessRoles = {roleName:'sample data', rolePassword:'sample data'};
      service.updateSecAccessRoles(secAccessRoles, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secaccessroleses/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSecAccessRoles', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteSecAccessRoles(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/secaccessroleses/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});