import { Component, OnInit } from '@angular/core';
import { FilterBarComponent, FilterOption } from '../../components/filter-bar/filter-bar.component';
import { RoomCardComponent } from '../../components/room-card/room-card.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { RoomService } from '../../services/room.service';
import { RoomStats, Room, BuildingBlock } from '../../models/room.model';

@Component({
  selector: 'app-room-management',
  templateUrl: './room-management.page.html',
  standalone: true,
  imports: [
    FilterBarComponent,
    RoomCardComponent,
    SearchInputComponent,
  ],
})
export class RoomManagementPage implements OnInit {
  stats!: RoomStats;
  rooms: Room[] = [];
  filteredRooms: Room[] = [];
  selectedBlock: BuildingBlock = 'all';
  searchTerm = '';

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

  onSearch(value: string) {
    this.searchTerm = value;
    this.applySearch();
  }

  private loadRooms() {
    this.roomService.getRooms(this.selectedBlock).subscribe(r => {
      this.rooms = r;
      this.applySearch();
    });
  }

  private applySearch() {
    const q = this.searchTerm.trim().toLowerCase();
    if (!q) {
      this.filteredRooms = this.rooms;
      return;
    }

    this.filteredRooms = this.rooms.filter(room =>
      room.code.toLowerCase().includes(q) ||
      room.type.toLowerCase().includes(q) ||
      room.block.toLowerCase().includes(q) ||
      `tầng ${room.floor}`.includes(q) ||
      room.status.toLowerCase().includes(q)
    );
  }
}
