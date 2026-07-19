import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { StatisticCardComponent } from '../../components/statistic-card/statistic-card.component';
import { FilterBarComponent, FilterOption } from '../../components/filter-bar/filter-bar.component';
import { LucideIconComponent } from '../../components/lucide-icon/lucide-icon.component';
import { ProfileService } from '../../services/profile.service';
import { ProfileStats, Profile238, ProfileFilter } from '../../models/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [DecimalPipe, PageHeaderComponent, StatisticCardComponent, FilterBarComponent, LucideIconComponent],
})
export class ProfilePage implements OnInit {
  stats!: ProfileStats;
  profiles: Profile238[] = [];
  activeFilter: ProfileFilter = 'all';

  filterOptions: FilterOption[] = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Chờ duyệt', value: 'cho-duyet' },
    { label: 'Đã duyệt', value: 'da-duyet' },
    { label: 'Từ chối', value: 'tu-choi' },
  ];

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getStats().subscribe(s => this.stats = s);
    this.loadProfiles();
  }

  onFilterChange(value: string) {
    this.activeFilter = value as ProfileFilter;
    this.loadProfiles();
  }

  private loadProfiles() {
    this.profileService.getProfiles(this.activeFilter).subscribe(p => this.profiles = p);
  }

  getStatusLabel(s: string): string {
    const map: Record<string, string> = { 'cho-duyet': 'Chờ duyệt', 'da-duyet': 'Đã duyệt', 'tu-choi': 'Từ chối' };
    return map[s] || s;
  }

  getStatusBadge(s: string): string {
    const map: Record<string, string> = { 'cho-duyet': 'badge-pending', 'da-duyet': 'badge-success', 'tu-choi': 'badge-danger' };
    return map[s] || '';
  }

  onApprove(p: Profile238) { console.log('Duyệt', p); }
  onReject(p: Profile238) { console.log('Từ chối', p); }
  onView(p: Profile238) { console.log('Xem', p); }
}
