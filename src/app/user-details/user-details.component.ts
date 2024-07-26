import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Input() dataFrmlist: any;
  bmiRes: String = '';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    if(this.dataFrmlist != undefined && this.dataFrmlist != null){
      console.log("dataFrmList", this.dataFrmlist)
      if(this.dataFrmlist.bmi < 18.5){
        this.bmiRes = "Underweight"
      }
      else if(this.dataFrmlist.bmi >= 18.5 && this.dataFrmlist.bmi <= 24.9){
        this.bmiRes = "Healthy Weight"
      }
      else if(this.dataFrmlist.bmi >= 25.0 && this.dataFrmlist.bmi <= 29.0){
        this.bmiRes = "Over Weight"
      }
      else{
        this.bmiRes = "Obese"
      }
    }
  }

  closeDialog(): void {
    this.closeModal.emit('close');
  }

}
