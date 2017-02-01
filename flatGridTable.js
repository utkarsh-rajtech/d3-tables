var gridConfigData = {
    "showGrid": true,
    "redionId": 50408,
    "Layout": "OnlyGrid",
    "hideRefresh": false,
    "componentTitle": "BGCOLOR(PT)",
    "tableConfig": {
        "gridCellListeners": {},
        "clicksToEdit": 1,
        "columns": [
            {
                "text": "Name",
                "allowBlank": true,
                "minWidth": 120,
                "width": 250,
                "sortable": true,
                "useNull": false,
                "dataIndex": "field1",
                "controlType": "textfield",
                "dataType": "string",
                "readOnly": true,
                "menuDisabled": true,
                "hidden": false,
                "hideNumFldTrigger": true,
                "renderer": "DE.APP.portal.PortalGrid.getTableCellRenderer",
                "draggable": false
            },
            {
                "text": "Id",
                "allowBlank": true,
                "minWidth": 120,
                "sortable": true,
                "useNull": false,
                "dataIndex": "field2",
                "controlType": "textfield",
                "flex": 1,
                "dataType": "string",
                "readOnly": true,
                "menuDisabled": true,
                "hidden": false,
                "hideNumFldTrigger": true,
                "renderer": "DE.APP.portal.PortalGrid.getTableCellRenderer",
                "draggable": true
            },
            {
                "text": "Priority",
                "allowBlank": true,
                "minWidth": 120,
                "sortable": true,
                "useNull": false,
                "dataIndex": "field3",
                "controlType": "textfield",
                "flex": 1,
                "dataType": "string",
                "readOnly": true,
                "menuDisabled": true,
                "hidden": false,
                "hideNumFldTrigger": true,
                "renderer": "DE.APP.portal.PortalGrid.getTableCellRenderer",
                "draggable": true
            },
            {
                "text": "testCol",
                "allowBlank": true,
                "minWidth": 120,
                "sortable": true,
                "useNull": false,
                "dataIndex": "field3",
                "controlType": "textfield",
                "flex": 1,
                "dataType": "string",
                "readOnly": true,
                "menuDisabled": true,
                "hidden": false,
                "hideNumFldTrigger": true,
                "renderer": "DE.APP.portal.PortalGrid.getTableCellRenderer",
                "draggable": true
            },
            {
                "text": "testCol_2",
                "allowBlank": true,
                "minWidth": 120,
                "sortable": true,
                "useNull": false,
                "dataIndex": "field3",
                "controlType": "textfield",
                "flex": 1,
                "dataType": "string",
                "readOnly": true,
                "menuDisabled": true,
                "hidden": false,
                "hideNumFldTrigger": true,
                "renderer": "DE.APP.portal.PortalGrid.getTableCellRenderer",
                "draggable": true
            }
        ],
        "data": {
            "items": [
                {
                    "field3": "High",
                    "field2": "DEF103",
                    "PORTLETCOLUMNWBS11212": "0000.null",
                    "config": {
                        "portalPageCompID": 20567,
                        "rowId": 0,
                        "style3": {},
                        "style2": {},
                        "style1": {
                            "background-color": "#E10505"
                        }
                    },
                    "field1": "Apr",
                    "field4": "dummy",
                    "field5": "my data"
                },
                {
                    "field3": "High",
                    "field2": "DEF107",
                    "PORTLETCOLUMNWBS11212": "0000.null",
                    "config": {
                        "portalPageCompID": 20567,
                        "rowId": 0,
                        "style3": {},
                        "style2": {},
                        "style1": {}
                    },
                    "field1": "Aug",
                    "field4": "dummy",
                    "field5": "my data"
                },
                {
                    "field3": "High",
                    "field2": "DEF111",
                    "PORTLETCOLUMNWBS11212": "0000.null",
                    "config": {
                        "portalPageCompID": 20567,
                        "rowId": 0,
                        "style3": {},
                        "style2": {},
                        "style1": {}
                    },
                    "field1": "Dec",
                    "field4": "dummy",
                    "field5": "my data"
                },
                {
                    "field3": "High",
                    "field2": "DEF101",
                    "PORTLETCOLUMNWBS11212": "0000.null",
                    "config": {
                        "portalPageCompID": 20567,
                        "rowId": 0,
                        "style3": {},
                        "style2": {},
                        "style1": {}
                    },
                    "field1": "Feb",
                    "field4": "dummy",
                    "field5": "my data"
                },
                {
                    "field3": "Low",
                    "field2": "DEF99",
                    "PORTLETCOLUMNWBS11212": "0000.null",
                    "config": {
                        "portalPageCompID": 20567,
                        "rowId": 0,
                        "style3": {},
                        "style2": {},
                        "style1": {}
                    },
                    "field1": "def99",
                    "field4": "test1"
                }
            ]
        },
        "srNoWidth": 60,
        "remoteSort": false,
        "componentCls": "portalGridRoyalBlue",
        "headerContainerCls": "dashBoardGridHeaderContainerRoyalBlue",
        "id": "20567_portlet",
        "minHeight": 25,
        "filterEnabled": false,
        "height": 251,
        "srNoColumnRenderer": "DE.APP.portal.PortalGrid.getTableCellRenderer",
        "renderTo": "20567_grid_content",
        "readOnly": true,
        "showSrNoColumn": true,
        "selModel": "cell",
        "dateFormat": "d-M-Y",
        "srNoText": "Sr. No.",
        "pagination": false,
        "success": true,
        "isEditable": true,
        "gridListeners": {}
    },
    "contexType": "Prj",
    "conetxtId": 81419
};

var table, headers, rows, row_entries;
var columnsData = gridConfigData.tableConfig.columns;
function drawTable(id){
    table = d3.select("#"+id).append("table").attr("class","table table-bordered");
    table.append("thead").append("tr");
    headers = table.select("tr").selectAll("th")
              .data(columnsData)
              .enter()
              .append("th").append("span").attr("class", "span")
              .text(function(d,i){
                return d.text;
              });
    table.append("tbody");
    rows = table.select("tbody").selectAll("tr")
           .data(gridConfigData.tableConfig.data.items)
           .enter()
           .append("tr");
    row_entries = rows.selectAll("td")
                  .data(function(d){
                    var dataArray = [];
                    for (var i=1; i<=columnsData.length; i++){
                       dataArray.push(d["field"+i]);
                    }
                    return dataArray;
                  })
                  .enter()
                  .append("td")
                  .text(function(d){
                    return d;
                  });
}