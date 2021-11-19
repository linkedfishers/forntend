import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Key } from 'selenium-webdriver';
import { Order } from 'src/app/interfaces/order.interface';
import { OrderItem } from 'src/app/interfaces/orderItems.interface';
import { Product } from 'src/app/interfaces/product.interface';
import { User } from 'src/app/interfaces/users.interface';
import { AdminService } from 'src/app/services/admin.service';
import { OrderService } from 'src/app/services/order.service';
import { ORDER_STATUS } from '../order-details/orderConstant';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  order: Order;
  orderItems: OrderItem[] = [];
  orderUser: User;
  orderStatus = [];
  product: Product;
  selectedValue: any;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.statusOrder();
    this.route.params.subscribe((params) => {
      let id = params.id;
      this.orderService.getOrder(id).subscribe((res) => {
        this.order = res.data;
        this.orderItems = this.order.orderItems;

        this.orderItems.map((item) => {
          console.log(item.product.name);
        });
        this.orderUser = res.data.user;
        this.selectedValue = this.order.status;
        console.log(this.selectedValue);
      });
    });
  }

  private statusOrder() {
    this.orderStatus = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label,
      };
    });
    console.log(ORDER_STATUS[0]);
    console.log(Object.keys(ORDER_STATUS));
  }
  onChangeStatus(event) {
    this.adminService
      .updateOrder({ status: event.target.value }, this.order._id)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
