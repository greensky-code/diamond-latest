/* Copyright (c) 2020 . All Rights Reserved. */

import 'rxjs/add/operator/toPromise';
import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {SecColService} from './sec-col.service';
import {environment} from "../../../environments/environment";
import {SecCol} from "../../api-models/security/sec-col.model";

describe('SecColService', () => {
  let injector: TestBed;
  let service: SecColService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SecColService]
    });
    injector = getTestBed();
    service = injector.get(SecColService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSecCols', () => {
    it('should return an Promise<SecCol[]>', () => {
      const secCol = [
       {userId:'sample data', tblNm:'sample data', colNm:'sample data', pVis:'sample data', pMod:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {userId:'sample data', tblNm:'sample data', colNm:'sample data', pVis:'sample data', pMod:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {userId:'sample data', tblNm:'sample data', colNm:'sample data', pVis:'sample data', pMod:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getSecCols().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/seccols/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(secCol);
    });
  });


  describe('#createSecCol', () => {
    var id = 1;
    it('should return an Promise<SecCol>', () => {
      const secCol: SecCol = {userId:'sample data', tblNm:'sample data', colNm:'sample data', pVis:'sample data', pMod:'sample data',
        insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createSecCol(secCol).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/seccols`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSecCol', () => {
    var id = "1";
    it('should return an Promise<SecCol>', () => {
      const secCol: SecCol = {userId:'sample data', tblNm:'sample data', colNm:'sample data', pVis:'sample data', pMod:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateSecCol(secCol, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/seccols/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSecCol', () => {
    var id = "1";
    it('should call delete method with correct parameter', () => {
      service.deleteSecCol(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/seccols/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});