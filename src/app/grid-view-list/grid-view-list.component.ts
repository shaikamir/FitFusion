import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-view-list',
  templateUrl: './grid-view-list.component.html',
  styleUrls: ['./grid-view-list.component.scss']
})
export class GridViewListComponent implements OnInit {
  registeredList: any[] = [];
  blnShowMsg: boolean = false;
  blnShowPopup: boolean = false;
  dataToModalPopup: object[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getRegisteredList()
  }

  getRegisteredList(){
    this.blnShowMsg = false;
    const storedList = localStorage.getItem('list');
  if (storedList != null) {
    if(JSON.parse(storedList).length === 0){
      this.blnShowMsg = true
    }else{
      this.registeredList = JSON.parse(storedList)
    }
  } 
  console.log("storedList", storedList)
  }

  fnDelete(row: any) {
    this.registeredList = this.registeredList.filter((item) => item != row);
    
    console.log("UpdatedList#", this.registeredList);
    localStorage.setItem('list', JSON.stringify(this.registeredList))
  }

  fnViewDetails(details: any){
    this.blnShowPopup = !this.blnShowPopup;
    this.dataToModalPopup = details;
  }

  blnHidePopup(event: any){
    if(event == 'close'){
      this.blnShowPopup = false;
    }
  }

}
