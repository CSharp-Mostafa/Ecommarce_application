import { Component, Input } from '@angular/core';
import { LastFewTransactionComponent } from '../last-few-transaction/last-few-transaction.component'; // Import the component here




@Component({
  selector: 'app-main',///from app.component.html
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @Input() totalBrands: number | undefined;

}
