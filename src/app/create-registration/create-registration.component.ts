import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss'],
})
export class CreateRegistrationComponent implements OnInit {
  public packages = ['Weekly', 'Monthly', 'Yearly'];
  public impList: String[] = [
    'Toxic Fat reduction',
    'Energy and Endurance',
    'Building Lean Muscle',
    'Healthier Digestive System',
    'Sugar Craving Body',
    'Fitness',
  ];

  registerFormGrp!: FormGroup;
  submitList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerFormGrp = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      weight: ['', [Validators.required, Validators.min(1)]],
      height: [
        '',
        [Validators.required, Validators.min(0.5), Validators.max(2.5)],
      ],
      bmi: [{ value: ''}],
      gender: ['', Validators.required],
      requireTrainer: ['', Validators.required],
      package: ['', Validators.required],
      important: ['', Validators.required],
      haveGymBefore: ['', Validators.required],
      enquiryDate: ['', Validators.required],
    });

    const heightControl = this.registerFormGrp.get('height');
    if (heightControl) {
      heightControl.valueChanges.subscribe((height) => {
        if (height) {
          this.calculateBMI(height);
        }
      });
    }
  }

  fnSubmitAction() {
    if (this.registerFormGrp.valid) {
      this.submitList.push(this.registerFormGrp.value);
      this.registerFormGrp.value.enquiryDate = this.formatDate(this.registerFormGrp.value.enquiryDate);
      let storedList = localStorage.getItem('list');
      let parsedList: any[] = storedList ? JSON.parse(storedList) : [];
      let concatedList = parsedList.concat(this.submitList);
      localStorage.setItem('list', JSON.stringify(concatedList));
      this.openSnackBar('Submitted Successfully', 'Close');

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  formatDate(date: any){
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  calculateBMI(height: any) {
    const wt = this.registerFormGrp.value.weight;
    const result = wt / (height * height);
    this.registerFormGrp.controls['bmi'].patchValue(result.toFixed(2));
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'right', // Position: start, center, end, left, right
      verticalPosition: 'top', // Position: top, bottom
    });
  }
}
