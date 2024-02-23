import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    console.log('oninit works');
    this.fetchData();
  }

  fetchData() {
    this.http.get('https://node-implementation.vercel.app/api/plans').subscribe(
      (response) => {

      },
      (error) => {
        console.error('HTTP Error:', error);
      }
    )
  }
}
