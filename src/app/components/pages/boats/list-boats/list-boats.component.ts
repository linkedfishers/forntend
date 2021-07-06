import { Component, OnInit } from '@angular/core';
import { Boat } from 'src/app/interfaces/equipments.interface';
import { EquipmentService } from 'src/app/services/equipment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-boats',
  templateUrl: './list-boats.component.html',
  styleUrls: ['./list-boats.component.scss'],
})
export class ListBoatsComponent implements OnInit {
  constructor(private equipmentService: EquipmentService) {}

  readonly API: string = environment.apiUrl + '/';

  boats: Boat[];
  visiblebotas: Boat[];
  content: Boat[] = [];
  ngOnInit(): void {
    this.equipmentService.getBoats().subscribe((res) => {
      this.boats = res.data;
       this.visiblebotas = this.boats;
    });
  }
}
