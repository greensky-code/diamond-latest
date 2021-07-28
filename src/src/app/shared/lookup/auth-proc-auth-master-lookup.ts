export class AuthProceduresMasterLookup {
    public static AUTH_PROCEDURES_RULE_DEFAULT = [
        {headerName: 'Auth No', field: 'authMasterPrimaryKey.authNumber', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'Secondary Auth No', field: 'authMasterPrimaryKey.secondaryAuthNo', width: 200, headerClass: 'font-weight-bold'}
    ];
    public static AUTH_PROCEDURES_RULE_ALL = [
        {headerName: 'Auth No', field: 'authMasterPrimaryKey.authNumber', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Secondary Auth No', field: 'authMasterPrimaryKey.secondaryAuthNo', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'Auth Type', field: 'authType', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Requested Date', field: 'requestedDate', width: 180, headerClass: 'font-weight-bold'},
        
        {headerName: 'Subscriber Id', field: 'subscriberId', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Person Number', field: 'Person Number', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Last Name', field: 'Last Name', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Ns Last Name', field: 'Ns Last Name', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'First Name', field: 'First Name', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Ns First Name', field: 'Ns First Name', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Ns Subscriber ID', field: 'Ns Subscriber ID', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Group ID', field: 'Group ID', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Short Name', field: 'Short Name', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Plan Code', field: 'Plan Code', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Member Age', field: 'Member Age', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Member Gender', field: 'Member Gender', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'TPL Code', field: 'TPL Code', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Intake Date Time', field: 'Intake Date Time', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Caller Name', field: 'Caller Name', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Caller Phone Number', field: 'Caller Phone Number', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Patient Acct No', field: 'Patient Acct No', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Medical Rec No', field: 'Medical Rec No', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Admit Primary Date', field: 'Admit Primary Date', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Estimated Cost', field: 'Estimated Cost', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Expiration Date', field: 'Expiration Date', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Diagnosis 1', field: 'Diagnosis 1', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Diagnosis 1 Text', field: 'Diagnosis 1 Text', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Diagnosis 2', field: 'Diagnosis 2', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Diagnosis 2 Text', field: 'Diagnosis 2 Text', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Diagnosis 3', field: 'Diagnosis 3', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Diagnosis 3 Text', field: 'Diagnosis 3 Text', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Surg Procedure 1', field: 'Surg Procedure 1', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Procedure 1 Date', field: 'Procedure 1 Date', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Surg Procedure 2', field: 'Surg Procedure 2', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Procedure 2 Date', field: 'Procedure 2 Date', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Surg Procedure 3', field: 'Surg Procedure 3', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Procedure 3 Date', field: 'Procedure 3 Date', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Review Type Reviewer', field: 'Review Type Reviewer', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'First Review Date', field: 'First Review Date', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Next Review Date', field: 'Next Review Date', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Service Admit Type', field: 'Service Admit Type', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Service Reason', field: 'Service Reason', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Place Of Service', field: 'Place Of Service', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Med Def Code', field: 'Med Def Code', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Overall Status', field: 'Overall Status', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Status Date', field: 'Status Date', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Hold Reason', field: 'Hold Reason', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Hold Date', field: 'Hold Date', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Closed Reason', field: 'Closed Reason', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Closed Date', field: 'Closed Date', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Denied Reason', field: 'Denied Reason', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Denied Date', field: 'Denied Date', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Second Opinion Req', field: 'Second Opinion Req', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Norm Days Visits', field: 'Norm Days Visits', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Req Days Visit', field: 'Req Days Visit', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Authorized Days Visit', field: 'Authorized Days Visit', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Denied Date Visit', field: 'Denied Date Visit', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Authorized Cost', field: 'Authorized Cost', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Piror Day Admit', field: 'Piror Day Admit', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Discharge Diagnosis', field: 'Discharge Diagnosis', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Disch Thru Date', field: 'Disch Thru Date', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Outcome', field: 'Outcome', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Impact', field: 'Impact', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Disposition', field: 'Disposition', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Auth', field: 'Case Manager', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Case Manager', field: 'Case Number', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Case Referral Date', field: 'Case Referral Date', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Prov Code', field: 'Prov Code', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Last Name', field: 'Last Name', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'First Name', field: 'First Name', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Zip Code', field: 'Zip Code', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'In Svc Area', field: 'In Svc Area', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Late Nortification', field: 'lateNotification', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'IPA Id', field: 'IPA Id', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Insert User', field: 'insertUser', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Update User', field: 'updateUser', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Insert Process', field: 'insertProcess', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Update Process', field: 'updateProcess', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Insert Datetime', field: 'insertDatetime', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Update Time', field: 'updateDatetime', width: 140, headerClass: 'font-weight-bold'}
    ];
}