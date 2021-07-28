export class CustomerMaintenanceLookup {
    public static CUSTOMER_MAINTENANCE_DEFAULT = [
        {headerName: 'Customer Id', field: 'pmbArCustomerMasterPrimaryKey.customerId', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Customer Type',editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['Male', 'Female']
        }, field: 'pmbArCustomerMasterPrimaryKey.customerType', width: 200, headerClass: 'font-weight-bold'},
        
        {headerName: 'Short Name', field: 'shortName', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'Customer Name 1', field: 'customerName1', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'Customer Name 2', field: 'customerName2', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'User Defined 1', field: 'userDefined1', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'User Defined 2', field: 'userDefined2', width: 200, headerClass: 'font-weight-bold'},
    ];

    public static CUSTOMER_MAINTENANCE_ALL = [
        {headerName: 'Customer Id', field: 'pmbArCustomerMasterPrimaryKey.customerId', width: 140, headerClass: 'font-weight-bold'},
        {headerName: 'Customer Type', field: 'pmbArCustomerMasterPrimaryKey.customerType', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'Short Name', field: 'shortName', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'Customer Name 1', field: 'customerName1', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'Customer Name 2', field: 'customerName2', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'User Defined 1', field: 'userDefined1', width: 200, headerClass: 'font-weight-bold'},
        {headerName: 'User Defined 2', field: 'userDefined2', width: 200, headerClass: 'font-weight-bold'},
    ];
}
