import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/interfaces/order.interface';
import { AdminService } from 'src/app/services/admin.service';
import { ORDER_STATUS } from '../order-details/orderConstant';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;

  constructor(private orderSrvice: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.orderSrvice.getOrders().subscribe((res) => {
      this.orders = res.data;
      console.log(this.orders);
    });
  }

  deleteOrder() {}

  showOrder(orderId) {
    this.router.navigateByUrl(`admin/order/${orderId}`);
  }
}
