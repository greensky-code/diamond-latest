/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcSeedingProcess} from "../../api-models"

var procSeedingProcess1 = new ProcSeedingProcess();
procSeedingProcess1.pFileDir ="sample data1";
procSeedingProcess1.pFileName ="sample data1";
procSeedingProcess1.poMessage ="sample data1";
procSeedingProcess1.poMessageCode ="sample data1";

var procSeedingProcess2 = new ProcSeedingProcess();
procSeedingProcess2.pFileDir ="sample data2";
procSeedingProcess2.pFileName ="sample data2";
procSeedingProcess2.poMessage ="sample data2";
procSeedingProcess2.poMessageCode ="sample data2";

var procSeedingProcess3 = new ProcSeedingProcess();
procSeedingProcess3.pFileDir ="sample data3";
procSeedingProcess3.pFileName ="sample data3";
procSeedingProcess3.poMessage ="sample data3";
procSeedingProcess3.poMessageCode ="sample data3";


export const ProcSeedingProcesses: ProcSeedingProcess[] = [
    procSeedingProcess1,
    procSeedingProcess2,
    procSeedingProcess3,
];