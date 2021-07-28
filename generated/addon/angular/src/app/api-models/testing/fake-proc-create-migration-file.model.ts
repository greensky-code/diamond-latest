/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcCreateMigrationFile} from "../../api-models"

var procCreateMigrationFile1 = new ProcCreateMigrationFile();
procCreateMigrationFile1.pRetcode =123;
procCreateMigrationFile1.pRetmsg ="sample data1";

var procCreateMigrationFile2 = new ProcCreateMigrationFile();
procCreateMigrationFile2.pRetcode =123;
procCreateMigrationFile2.pRetmsg ="sample data2";

var procCreateMigrationFile3 = new ProcCreateMigrationFile();
procCreateMigrationFile3.pRetcode =123;
procCreateMigrationFile3.pRetmsg ="sample data3";


export const ProcCreateMigrationFiles: ProcCreateMigrationFile[] = [
    procCreateMigrationFile1,
    procCreateMigrationFile2,
    procCreateMigrationFile3,
];