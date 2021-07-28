export class RegionMasterLookup {
    public static REGION_MASTER_DEFAULT = [
      {
        headerName: "Region Code",
        field: "regionMasterPrimaryKey.regionCode",
        width: 140,
        headerClass: "font-weight-bold",
      },
      {
        headerName: "Region Type",
        field: "regionMasterPrimaryKey.regionType",
        width: 180,
        headerClass: "font-weight-bold",
      },
      {
        headerName: " Description",
        field: "description",
        width: 140,
        headerClass: "font-weight-bold",
      }
    ];
  
    public static REGION_MASTER_ALL = [
        {
            headerName: "Region Code",
            field: "regionMasterPrimaryKey.regionCode",
            width: 140,
            headerClass: "font-weight-bold",
          },
          {
            headerName: "Region Type",
            field: "regionMasterPrimaryKey.regionType",
            width: 180,
            headerClass: "font-weight-bold",
          },
          {
            headerName: " Description",
            field: "description",
            width: 140,
            headerClass: "font-weight-bold",
          }
    ];
  }
  