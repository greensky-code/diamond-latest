/* Copyright (c) 2020 . All Rights Reserved. */

import 'rxjs/add/operator/toPromise';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment'

import { LanguageMasterService } from './language-master.service';
import { LanguageMaster } from '../api-models/language-master.model';

describe('LanguageMasterService', () => {
  let injector: TestBed;
  let service: LanguageMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LanguageMasterService]
    });
    injector = getTestBed();
    service = injector.get(LanguageMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
  describe('#getLanguageMasters', () => {
    it('should return an Promise<LanguageMaster[]>', () => {
      const languageMaster = [
        { languageCode: 'sample data', description: 'sample data', securityCode: 'sample data', insertDatetime: new Date(), insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: new Date(), updateUser: 'sample data', updateProcess: 'sample data', languageId: 1234, oracleLanguageCode: 'sample data' },
        { languageCode: 'sample data', description: 'sample data', securityCode: 'sample data', insertDatetime: new Date(), insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: new Date(), updateUser: 'sample data', updateProcess: 'sample data', languageId: 1234, oracleLanguageCode: 'sample data' },
        { languageCode: 'sample data', description: 'sample data', securityCode: 'sample data', insertDatetime: new Date(), insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: new Date(), updateUser: 'sample data', updateProcess: 'sample data', languageId: 1234, oracleLanguageCode: 'sample data' }

      ];
      service.getLanguageMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/languagemasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(languageMaster);
    });
  });


  describe('#createLanguageMaster', () => {
    var id = 1;
    it('should return an Promise<LanguageMaster>', () => {
      const languageMaster: LanguageMaster = { languageCode: 'sample data', description: 'sample data', securityCode: 'sample data', insertDatetime: new Date(), insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: new Date(), updateUser: 'sample data', updateProcess: 'sample data', languageId: 1234, oracleLanguageCode: 'sample data' };
      service.createLanguageMaster(languageMaster).subscribe(response => {
        expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/languagemasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateLanguageMaster', () => {
    var id = '1';
    it('should return an Promise<LanguageMaster>', () => {
      const languageMaster: LanguageMaster = { languageCode: 'sample data', description: 'sample data', securityCode: 'sample data', insertDatetime: new Date(), insertUser: 'sample data', insertProcess: 'sample data', updateDatetime: new Date(), updateUser: 'sample data', updateProcess: 'sample data', languageId: 1234, oracleLanguageCode: 'sample data' };
      service.updateLanguageMaster(languageMaster, id).subscribe(response => {
        expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/languagemasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteLanguageMaster', () => {
    var id = '1';
    it('should call delete method with correct parameter', () => {
      service.deleteLanguageMaster(id).subscribe(response => {
        expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/languagemasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});