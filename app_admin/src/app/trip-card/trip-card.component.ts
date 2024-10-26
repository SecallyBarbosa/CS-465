import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'] // corrected from styleUrl
})
export class TripCardComponent implements OnInit {
  @Input() trip!: Trip; // Use non-null assertion operator

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    // Any initialization logic can go here
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn(); // Use the injected service
  }

  public editTrip(trip: Trip): void {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }
}
