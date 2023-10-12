import { Component, Input  } from '@angular/core';

import {
  
  faLocation,
  faShop,
  faBox,
  faMoneyBill,
 
  

} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-widgets',
  templateUrl: './top-widgets.component.html',
  styleUrls: ['./top-widgets.component.css']
})
export class TopWidgetsComponent {
  @Input() totalBrands: number | undefined;
  faLocation = faLocation;
  faShop = faShop;
  faBox = faBox;
  faMoneyBill = faMoneyBill;
}
