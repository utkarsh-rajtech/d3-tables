var data = [
                    { "packagetype" : "Internal R...", "None" : 45,"Others" : 4 ,"id":"1"},
                    { "packagetype" : "Internal T...", "None" : 55,"Others" : 7 ,"id":"2"},
                    { "packagetype" : "Customer R...", "None" : 40,"Others" : 3 ,"id" :"3"},
                    { "packagetype" : "Legacy Def...", "None" : 32,"Others" : 8,"id" :"4" },
                    { "packagetype" : "New Request...", "None" : 47,"Others" : 6,"id" :"5" },
                    { "packagetype" : "POC...", "None" : 56,"Others" : 10,"id" :"6" },
                    { "packagetype" : "Defect Count..", "None" : 73,"Others" : 5,"id" :"7"},
                    { "packagetype" : "Acceptance Rate", "None" : 90,"Others" : 2,"id" :"8" },
                    { "packagetype" : "Defect Analysis...", "None" : 45,"Others" : 4 ,"id":"9"},
                    { "packagetype" : "Quality...", "None" : 55,"Others" : 7 ,"id":"10"},
                    { "packagetype" : "Customer R...", "None" : 40,"Others" : 3 ,"id" :"11"},
                    { "packagetype" : "Pull Requests...", "None" : 32,"Others" : 8,"id" :"12" },
                    { "packagetype" : "Defect Removal Efficiency", "None" : 47,"Others" : 6,"id" :"13" },
                    { "packagetype" : "Failure Cost...", "None" : 56,"Others" : 10,"id" :"14" },
                    { "packagetype" : "Prevention Cost", "None" : 73,"Others" : 5,"id" :"15"},
                    { "packagetype" : "Open Issues", "None" : 90,"Others" : 2,"id" :"16" },
                    { "packagetype" : "Resource Allocation", "None" : 47,"Others" : 6,"id" :"17" },
                    { "packagetype" : "Cost of Quality...", "None" : 56,"Others" : 10,"id" :"18" },
                    { "packagetype" : "Design Defects", "None" : 73,"Others" : 5,"id" :"19"},
                    { "packagetype" : "Closed Issues", "None" : 90,"Others" : 2,"id" :"20" }
                ];
var column_names = ["Package Type","None","Others"];
var clicks = {packagetype: 0, none: 0, others: 0};
var totals = {};

// draw the tableD
// d3.select("body").append("div")
//   .attr("id", "container")
//   .attr("class","container")

// d3.select("#container").append("div")
//   .attr("id", "FilterableTable")
//   .attr("class" ,"table-responsive");

/*d3.select("#FilterableTable").append("h1")
  .attr("id", "title")
  .text("My D3 Table")

d3.select("#FilterableTable").append("div")
  .attr("class", "SearchBar")
  .append("p")
    .attr("class", "SearchBar")
    .text("Search By Category:");

d3.select(".SearchBar")
  .append("input")
    .attr("class", "SearchBar")
    .attr("id", "search")
    .attr("type", "text")
    .attr("placeholder", "Search...");*/
  
var table = d3.select("#FilterableTable").append("table").attr("class","table table-bordered");
table.append("thead").append("tr"); 

var headers = table.select("tr").selectAll("th")
    .data(column_names)
  .enter()
    .append("th")
    .text(function(d) { return d; });

totals['packagetype'] = 'Total';
data.forEach(function (d) {
  column_names.forEach(function (k) {
    if (k !== "Package Type") {
      if (k in totals) {
        totals[k] += d[k];
      } else {
        totals[k] = d[k];
      }
    }
  });
});

data.push(totals);
 
var rows, row_entries, row_entries_no_anchor, row_entries_with_anchor;
var paginationoff= true,pageSize;
var page = 1;
if(paginationoff === true){
   pageSize = data.length;
   d3.select("#paginationBar").style("display","none");
} else{
   pageSize = 5;
} 
var pageLimit = Math.ceil(data.length/pageSize);
var viewdata = data.slice((page-1)*pageSize,page*pageSize);
  

d3.select("#pageNO").attr("value",page);
d3.select("#totalPages").attr("value",pageLimit);
  table.append("tbody")

  // data bind
  rows = table.select("tbody").selectAll("tr")
    .data(viewdata, function(d){ return d.id; });

  
  // enter the rows
  rows.enter()
    .append("tr")
  
  // enter td's in each row
  row_entries = rows.selectAll("td")
      .data(function(d) { 
        var arr = [];
        for (var k in d) {
          if (d.hasOwnProperty(k)) {
        arr.push(d[k]);
          }
        }
        return [arr[0],arr[1],arr[2]];
      })
    .enter()
      .append("td") 

  // draw row entries with no anchor 
  row_entries_no_anchor = row_entries.filter(function(d) {
    return (/https?:\/\//.test(d) == false)
  })
  row_entries_no_anchor.text(function(d) { return d; })

  
  d3.select('#next').on("click" ,function() {
  if(page < pageLimit){
    page++;
    d3.select("#pageNO").attr("value",page);
    viewdata = data.slice((page-1)*pageSize,page*pageSize);
    redraw();
  }
  });

  d3.select('#previous').on("click" ,function() {
    if(page > 1){
    page--;
    d3.select("#pageNO").attr("value",page);
    viewdata = data.slice((page-1)*pageSize,page*pageSize);
    redraw();
  }
  });

  d3.select('#first').on("click" ,function() {
    page = 1;
    d3.select("#pageNO").attr("value",page);
    viewdata = data.slice((page-1)*pageSize,page*pageSize);
    redraw();
  });

  d3.select('#last').on("click" ,function() {
    page = Math.ceil(data.length/pageSize);
    d3.select("#pageNO").attr("value",page);
    viewdata = data.slice((page-1)*pageSize,page*pageSize);
    redraw();
  });

  function redraw() {
    rows = table.select("tbody").selectAll("tr")
      .data(viewdata, function(d){ return d.id; })
    
        // enter the rows
        rows.enter()
         .append("tr");
         
        // enter td's in each row
        row_entries = rows.selectAll("td")
            .data(function(d) { 
              var arr = [];
              for (var k in d) {
                if (d.hasOwnProperty(k)) {
              arr.push(d[k]);
                }
              }
              return [arr[0],arr[1],arr[2]];
            })
          .enter()
            .append("td") 

        // draw row entries with no anchor 
        row_entries_no_anchor = row_entries.filter(function(d) {
          return (/https?:\/\//.test(d) == false)
        })
        row_entries_no_anchor.text(function(d) { return d; })

        
        
        // exit
        rows.exit().remove();

}
    
   d3.select("#pageNO").on("keyup",function(){
       page = Number(this.value.trim());
       console.log(page);
       viewdata = data.slice((page-1)*pageSize,page*pageSize);
       redraw();
   }) 
  /**  search functionality **/
    d3.select("#search")
      .on("keyup", function() { // filter according to key pressed 
        var searched_data = data,
            text = this.value.trim();
        
        var searchResults = searched_data.map(function(r) {
          console.log(r);
          var regex = new RegExp("^" + text + ".*", "i");
          if (regex.test(r.packagetype)) { // if there are any results
            return regex.exec(r.packagetype)[0]; // return them to searchResults
          } 
        })
      
      // filter blank entries from searchResults
        searchResults = searchResults.filter(function(r){ 
          return r != undefined;
        })
        
        // filter dataset with searchResults
        searched_data = searchResults.map(function(r) {
           return data.filter(function(p) {
            console.log(p);
            return p.packagetype.indexOf(r) != -1;
          })
        })

        // flatten array 
    searched_data = [].concat.apply([], searched_data)
        
        // data bind with new data
    rows = table.select("tbody").selectAll("tr")
      .data(searched_data, function(d){ return d.id; })
    
        // enter the rows
        rows.enter()
         .append("tr");
         
        // enter td's in each row
        row_entries = rows.selectAll("td")
            .data(function(d) { 
              var arr = [];
              for (var k in d) {
                if (d.hasOwnProperty(k)) {
              arr.push(d[k]);
                }
              }
              return [arr[0],arr[1],arr[2]];
            })
          .enter()
            .append("td") 

        // draw row entries with no anchor 
        row_entries_no_anchor = row_entries.filter(function(d) {
          return (/https?:\/\//.test(d) == false)
        })
        row_entries_no_anchor.text(function(d) { return d; })

        
        
        // exit
        rows.exit().remove();
      })
    
  /**  sort functionality **/
  headers
    .on("click", function(d) {
           if (d == "Package Type") {
        clicks.packagetype++;
        // even number of clicks
        if (clicks.packagetype % 2 == 0) {
          // sort ascending: alphabetically
          rows.sort(function(a,b) { 
            if (a.packagetype.toUpperCase() < b.packagetype.toUpperCase()) { 
              return -1; 
            } else if (a.packagetype.toUpperCase() > b.packagetype.toUpperCase()) { 
              return 1; 
            } else {
              return 0;
            }
          });
        // odd number of clicks  
        } else if (clicks.packagetype % 2 != 0) { 
          // sort descending: alphabetically
          rows.sort(function(a,b) { 
            if (a.packagetype.toUpperCase() < b.packagetype.toUpperCase()) { 
              return 1; 
            } else if (a.packagetype.toUpperCase() > b.packagetype.toUpperCase()) { 
              return -1; 
            } else {
              return 0;
            }
          });
        }
      } 
      if (d == "None") {
      clicks.none++;
        // even number of clicks
        if (clicks.none % 2 == 0) {
          // sort ascending: numerically
          rows.sort(function(a,b) { 
            if (+a.None < +b.None) { 
              return -1; 
            } else if (+a.None > +b.None) { 
              return 1; 
            } else {
              return 0;
            }
          });
        // odd number of clicks  
        } else if (clicks.none % 2 != 0) { 
          // sort descending: numerically
          rows.sort(function(a,b) { 
            if (+a.None < +b.None) { 
              return 1; 
            } else if (+a.None > +b.None) { 
              return -1; 
            } else {
              return 0;
            }
          });
        }
      } 

      if (d == "Others") {
      clicks.others++;
        // even number of clicks
        if (clicks.others % 2 == 0) {
          // sort ascending: numerically
          rows.sort(function(a,b) { 
            if (+a.Others < +b.Others) { 
              return -1; 
            } else if (+a.Others > +b.Others) { 
              return 1; 
            } else {
              return 0;
            }
          });
        // odd number of clicks  
        } else if (clicks.others % 2 != 0) { 
          // sort descending: numerically
          rows.sort(function(a,b) { 
            if (+a.Others < +b.Others) { 
              return 1; 
            } else if (+a.Others > +b.Others) { 
              return -1; 
            } else {
              return 0;
            }
          });
        }
      } 
      
      
    }) // end of click listeners
//});
d3.select(self.frameElement).style("height", "780px").style("width", "1150px"); 
