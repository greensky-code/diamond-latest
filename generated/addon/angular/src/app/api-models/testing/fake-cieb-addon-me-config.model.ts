/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebAddonMeConfig} from "../../api-models"

var ciebAddonMeConfig1 = new CiebAddonMeConfig();
ciebAddonMeConfig1.seqCodeId =123;
ciebAddonMeConfig1.countryCode ="sample data1";
ciebAddonMeConfig1.codeType ="sample data1";
ciebAddonMeConfig1.code1 ="sample data1";
ciebAddonMeConfig1.codeDesc ="sample data1";
ciebAddonMeConfig1.code2 ="sample data1";
ciebAddonMeConfig1.insertDatetime =new Date('2010-01-01');
ciebAddonMeConfig1.insertUser ="sample data1";
ciebAddonMeConfig1.insertProcess ="sample data1";
ciebAddonMeConfig1.updateDatetime =new Date('2010-01-01');
ciebAddonMeConfig1.updateUser ="sample data1";
ciebAddonMeConfig1.updateProcess ="sample data1";

var ciebAddonMeConfig2 = new CiebAddonMeConfig();
ciebAddonMeConfig2.seqCodeId =123;
ciebAddonMeConfig2.countryCode ="sample data2";
ciebAddonMeConfig2.codeType ="sample data2";
ciebAddonMeConfig2.code1 ="sample data2";
ciebAddonMeConfig2.codeDesc ="sample data2";
ciebAddonMeConfig2.code2 ="sample data2";
ciebAddonMeConfig2.insertDatetime =new Date('2010-01-01');
ciebAddonMeConfig2.insertUser ="sample data2";
ciebAddonMeConfig2.insertProcess ="sample data2";
ciebAddonMeConfig2.updateDatetime =new Date('2010-01-01');
ciebAddonMeConfig2.updateUser ="sample data2";
ciebAddonMeConfig2.updateProcess ="sample data2";

var ciebAddonMeConfig3 = new CiebAddonMeConfig();
ciebAddonMeConfig3.seqCodeId =123;
ciebAddonMeConfig3.countryCode ="sample data3";
ciebAddonMeConfig3.codeType ="sample data3";
ciebAddonMeConfig3.code1 ="sample data3";
ciebAddonMeConfig3.codeDesc ="sample data3";
ciebAddonMeConfig3.code2 ="sample data3";
ciebAddonMeConfig3.insertDatetime =new Date('2010-01-01');
ciebAddonMeConfig3.insertUser ="sample data3";
ciebAddonMeConfig3.insertProcess ="sample data3";
ciebAddonMeConfig3.updateDatetime =new Date('2010-01-01');
ciebAddonMeConfig3.updateUser ="sample data3";
ciebAddonMeConfig3.updateProcess ="sample data3";


export const CiebAddonMeConfigs: CiebAddonMeConfig[] = [
    ciebAddonMeConfig1,
    ciebAddonMeConfig2,
    ciebAddonMeConfig3,
];