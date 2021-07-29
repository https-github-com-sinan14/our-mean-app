import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import { data } from 'jquery';
import { StudentServiceService } from '../student.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements AfterViewInit {

  constructor(private students:StudentServiceService) { }

  @ViewChild('dataTable')
  table!: { nativeElement: any; };
  dataTable: any;
  dtOption: any = {};
  fname:String=""
  filteredRows:any=''
  Students = [
    {
      Image:"<img class='avatar' src='assets/avatar.png'>",
      Name: '',
      Course: '',
      HighestQualification: '',
      PassOutYear: '',
      District: '',
      Status:''
    },
  ];

  ngAfterViewInit(): void {
     this.students.fetchStudents()
     .subscribe((data)=>{
      this.Students = JSON.parse(JSON.stringify(data));
      this.Students =this.Students.filter((Student)=>{
        return Student.Status!=null
      })
      console.log(this.Students);
     })

    $('#display thead tr:eq(1) th').each( function () {
      var title = $(this).text();
      if(title!="")
      $(this).html( '<input type="text" placeholder="Search '+title+'" class="column_search" />' );
  } );
    this.dtOption = {
      "info":     true,
      "searching": true,
      "orderCellsTop": true,
      "fixedHeader": true,
      columnDefs: [
        { orderable: false, targets: 0 }
     ],
        "lengthChange": false
  };
    this.dataTable = $(this.table.nativeElement);
    var table=this.dataTable.DataTable(this.dtOption);

    var that=this
    $( '#display thead'  ).on( 'keyup', ".column_search",function () {
      table
          .column( $(this).parent().index() )
          .search( this.value )
          .draw();
      that.filteredRows = table.rows({"search" : "applied"}).data()
  } );
  
    $('#display tbody').on('click', 'td.details-control', function () {
      var tr = $(this).closest('tr');
      var row = table.row( tr );
      if ( row.child.isShown() ) {
          // This row is already open - close it
          row.child.hide();
          tr.removeClass('shown');
      }
      else {
          // Open this row
          row.child( '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;"><tr><td>Full name:</td><td>Ajay</td></tr></table>' ).show();
          tr.addClass('shown');
      }
  } );
  
  }
   
  
    options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'My Awesome CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: false,
      headers: ['Name', 'Course','Highest Qualification','PassOut Year','District']
    };
 
  csvExporter = new ExportToCsv(this.options);

  generateCSV():void{
    if(this.filteredRows){
      this.filteredRows.each(function ( value:any, index:any ) {
        delete value['0']
        console.log( 'Data in index: '+index+' is: '+value );
    } );
      this.csvExporter.generateCsv(this.filteredRows);
    }
    else{
      var students_detail=this.Students
      students_detail.forEach(function ( value:any, index:any ) {
        delete value['0']
        console.log( 'Data in index: '+index+' is: '+value );
    } );
      this.csvExporter.generateCsv(students_detail);
    }
    
  }

 

}


