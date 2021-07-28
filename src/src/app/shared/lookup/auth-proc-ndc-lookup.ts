export class AuthProceduresNdcLookup {
    public static AUTH_PROCEDURES_NDC_DEFAULT = [
        {headerName: 'NDC Code', field: 'ndcCode', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Code Qualifier', field: 'codeQualifier', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Description', field: 'description', width: 150, headerClass: 'font-weight-bold'}
    ];
    public static AUTH_PROCEDURES_NDC_ALL = [
        {headerName: 'NDC Code', field: 'ndcCode', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Code Qualifier', field: 'codeQualifier', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Description', field: 'description', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'DrugClass', field: 'drugClass', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Avg Wholesale Price', field: 'avgWholesalePrice', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Effective Date', field: 'effectiveDate', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Terminate Date', field: 'terminateDate', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Security Code', field: 'securityCode', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Insert User', field: 'insertUser', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Update User', field: 'updateUser', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Insert Process', field: 'insertProcess', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Update Process', field: 'updateProcess', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Insert Datetime', field: 'insertDatetime', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Update Time', field: 'updateDatetime', width: 140, headerClass: 'font-weight-bold'}
    ];
}
