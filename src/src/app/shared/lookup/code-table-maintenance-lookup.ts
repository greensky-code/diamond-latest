export class CodeTableMaintenanceLookup {
public static SYSTEM_CODE_TOKEN_DEFAULT = [
    {headerName: 'Language ID', field: 'systemCodeTokenPrimaryKey.languageId', width: 140, headerClass: 'font-weight-bold'},
    {headerName: 'System Code Type', field: 'systemCodeTokenPrimaryKey.systemCodeType', width: 140, headerClass: 'font-weight-bold'},
    ];

public static SYSTEM_CODE_TOKEN_ALL = [
    {headerName: 'Language ID', field: 'systemCodeTokenPrimaryKey.languageId', width: 140, headerClass: 'font-weight-bold'},
    {headerName: 'System Code Type', field: 'systemCodeTokenPrimaryKey.systemCodeType', width: 140, headerClass: 'font-weight-bold'},
    {headerName: 'Update Process', field: 'updateProcess', width: 100, headerClass: 'font-weight-bold'},
    {headerName: 'Update User', field: 'updateUser', width: 140, headerClass: 'font-weight-bold'},
    {headerName: 'Update Date Time', field: 'updateDatetime', width: 140, headerClass: 'font-weight-bold'},
    {headerName: 'Insert Process', field: 'insertProcess', width: 150, headerClass: 'font-weight-bold'},
    {headerName: 'Insert User ', field: 'insertUser', width: 100, headerClass: 'font-weight-bold'},
    {headerName: 'Insert Datetime', field: 'insertDatetime', width: 140, headerClass: 'font-weight-bold'},
    {headerName: 'Security Code', field: 'securityCode', width: 100, headerClass: 'font-weight-bold'},
    {headerName: 'System Code Decription 2', field: 'systemCodeDesc2', width: 140, headerClass: 'font-weight-bold'},
    {headerName: 'System Code Decription 1', field: 'systemCodeDesc1', width: 140, headerClass: 'font-weight-bold'},
    {headerName: 'System Codes', field: 'systemCodes', width: 150, headerClass: 'font-weight-bold'},
    ];
}
