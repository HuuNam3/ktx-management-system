import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { StatisticCardComponent } from '../../components/statistic-card/statistic-card.component';
import { FilterBarComponent, FilterOption } from '../../components/filter-bar/filter-bar.component';
import { RoomCardComponent } from '../../components/room-card/room-card.component';
import { RoomService } from '../../services/room.service';
import { RoomStats, Room, BuildingBlock } from '../../models/room.model';

@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.page.html',
  standalone: true,
  imports: [
    DecimalPipe,
    PageHeaderComponent,
    StatisticCardComponent,
    FilterBarComponent,
    RoomCardComponent,
  ],
})
export class RoomManagementPage implements OnInit {
  stats!: RoomStats;
  rooms: Room[] = [];
  selectedBlock: BuildingBlock = 'all';

  filterOptions: FilterOption[] = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Dãy A', value: 'A' },
    { label: 'Dãy B', value: 'B' },
    { label: 'Dãy C', value: 'C' },
  ];

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.roomService.getStats().subscribe(s => this.stats = s);
    this.loadRooms();
  }

  onFilterChange(value: string) {
    this.selectedBlock = value as BuildingBlock;
    this.loadRooms();
  }

  private loadRooms() {
    this.roomService.getRooms(this.selectedBlock).subscribe(r => this.rooms = r);
  }
}
