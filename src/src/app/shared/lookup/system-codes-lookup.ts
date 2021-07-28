export class SystemCodesLookup {

    public static SYSTEM_CODES_DEFAULT = [
        {headerName: 'System Code', field: 'systemCodesPrimaryKey.systemCode', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'System Code Type', field: 'systemCodesPrimaryKey.systemCodeType', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'Short Description', field: 'systemCodeDesc1', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'Long Description', field: 'systemCodeDesc2', width: 450, headerClass: 'font-weight-bold'},
        {headerName: 'Parameter1', field: 'systemCodeParam1', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Parameter2', field: 'systemCodeParam2', width: 150, headerClass: 'font-weight-bold'},
        {headerName: 'Update', field: 'systemCodeUpd', width: 100, headerClass: 'font-weight-bold'},
    ];

    public static SYSTEM_CODES_ALL = [
        {headerName: 'System Code', field: 'systemCodesPrimaryKey.systemCode', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'System Code Type', field: 'systemCodesPrimaryKey.systemCodeType', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'System Code Description 1', field: 'systemCodeDesc1', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'System Code Description 2', field: 'systemCodeDesc2', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'System Code Parameter 1', field: 'systemCodeParam1', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'System Code Parameter 2', field: 'systemCodeParam2', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'System Code UPD', field: 'systemCodeUpd', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'System Code Active', field: 'systemCodeActive', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'Security Code', field: 'securityCode', width: 200, headerClass: 'font-weight-bold'}
    ];
}
