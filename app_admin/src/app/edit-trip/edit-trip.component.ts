import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
   selector: 'app-edit-trip',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule],
   templateUrl: './edit-trip.component.html',
   styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

   public editForm!: FormGroup;
   trip!: Trip;
   submitted = false;
   message: string = '';

   constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private tripDataService: TripDataService
   ) { }

   ngOnInit(): void {
      // Retrieve stashed trip ID
      const tripCode = localStorage.getItem("tripCode");
      if (!tripCode) {
         alert("Something wrong, couldn't find where I stashed tripCode!");
         this.router.navigate(['']);
         return;
      }

      console.log('EditTripComponent::ngOnInit');
      console.log('tripCode:', tripCode);

      // Initialize the form
      this.editForm = this.formBuilder.group({
         code: [tripCode, Validators.required],
         name: ["", Validators.required],
         length: ["", Validators.required],
         start: ["", Validators.required],
         resort: ["", Validators.required],
         perPerson: ["", Validators.required],
         image: ["", Validators.required],
         description: ["", Validators.required]
      });

      // Fetch the trip details based on the tripCode
      this.tripDataService.getTrip(tripCode).subscribe({
         next: (value: Trip) => {
            if (value) {
               this.trip = value;
               this.editForm.patchValue(value); // Patch the form with the retrieved trip details
               this.message = 'Trip: ${tripCode} retrieved';
            } else {
               this.message = 'No Trip Retrieved!';
            }
            console.log(this.message);
         },
         error: (error) => {
            console.log('Error:', error);
            this.message = 'Error fetching trip details';
         }
      });
   }

   // Submit the form
   public onSubmit(): void {
      this.submitted = true;
      if (this.editForm.valid) {
         this.tripDataService.updateTrip(this.editForm.value).subscribe({
            next: (value: Trip) => {
               console.log(value);
               this.router.navigate(['']);
            },
            error: (error) => {
               console.log('Error:', error);
            }
         });
      }
   }

   // Get form controls
   get f() { return this.editForm.controls; }
}
