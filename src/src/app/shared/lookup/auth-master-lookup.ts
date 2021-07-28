export class AuthMasterLookup {

    public static AUTH_MASTER_DEFAULT = [
        {headerName: 'Auth Number', field: 'authMasterPrimaryKey.authNumber', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Secondary Auh No', field: 'authMasterPrimaryKey.secondaryAuthNo', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Auth Type', field: 'authType', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Subscriber ID', field: 'memberMaster.subscriberId', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Person Number', field: 'memberMaster.personNumber', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Last Name', field: 'memberMaster.lastName', width: 160, headerClass: 'font-weight-bold'},
        {headerName: 'First Name', field: 'memberMaster.firstName', width: 160, headerClass: 'font-weight-bold'},
        {headerName: 'Group Id', field: 'groupMaster.groupId', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Short name', field: 'groupMaster.shortName', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Plan Code', field: 'planMasterPlanCode.planCode', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Member Age', field: 'memberAge', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Member Gender', field: 'memberGender', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'TPL Code', field: 'tplCode', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Intake Date Time', field: 'intakeDateTime', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Caller Name', field: 'callerName', width: 100, headerClass: 'font-weight-bold'}];

    public static AUTH_MASTER_ALL = [
        {headerName: 'Auth Number', field: 'authMasterPrimaryKey.authNumber', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Secondary Auh No', field: 'authMasterPrimaryKey.secondaryAuthNo', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Auth Type', field: 'authType', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Subscriber ID', field: 'memberMaster.subscriberId', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Person Number', field: 'memberMaster.personNumber', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Last Name', field: 'memberMaster.lastName', width: 160, headerClass: 'font-weight-bold'},
        {headerName: 'First Name', field: 'memberMaster.firstName', width: 160, headerClass: 'font-weight-bold'},
        {headerName: 'Group Id', field: 'groupMaster.groupId', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Short name', field: 'groupMaster.shortName', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Plan Code', field: 'planMasterPlanCode.planCode', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Member Age', field: 'memberAge', width: 100, headerClass: 'font-weight-bold'},
        {headerName: 'Member Gender', field: 'memberGender', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'TPL Code', field: 'tplCode', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Intake Date Time', field: 'intakeDateTime', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Caller Name', field: 'callerName', width: 100, headerClass: 'font-weight-bold'}];
}
