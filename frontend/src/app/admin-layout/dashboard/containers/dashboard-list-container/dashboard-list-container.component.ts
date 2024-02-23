import { CommonModule } from '@angular/common';
import { Component, Injectable, inject } from '@angular/core';
import { DashboardListComponent } from '../../component/dashboard-list-component/dashboard-list.component';
import { DashboardService } from '../../services/dashboard.service';
import { IMarketProfile } from '../../models/market.models';
import { AdminHeaderComponent } from '../../../header/admin-header.component';
import { StoreMarketsService } from '../../services/stored-markets-list.services';


@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-admin-dashboard-list-container',
  standalone: true,
  imports: [
    CommonModule,
    DashboardListComponent,
    AdminHeaderComponent,
  ],
  templateUrl: './dashboard-list-container.component.html',
  styleUrls: ['./dashboard-list-container.component.scss'],
})
export class AdminDashboardContainerComponent {

  private dashServices =inject(DashboardService);
  store = inject(StoreMarketsService);
  
  ngOnInit(){
    
  }

  public getAllPlans(){
    this.dashServices.getAllMarketsList();
  }
  public createMarketProfile(data:IMarketProfile){
    this.dashServices.createMarketProfile(data);
  }

  public editMarketProfile(data:IMarketProfile){
    this.dashServices.editMarketProfile(data.id, data);
  }

  public deleteMarketProfile(marketId:string){
    this.dashServices.deleteMarketProfile(marketId);
  }
}
