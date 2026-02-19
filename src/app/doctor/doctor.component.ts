import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-doctor',
  standalone:false,
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {

  scans: any[] = [];
  selectedScan: any = null;
  loading: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadScans();
  }

  loadScans(): void {
    this.api.getDoctorScans('DR001').subscribe((res: any[]) => {
      this.scans = res;
    });
  }

  selectScan(scan: any): void {
    this.selectedScan = scan;
  }

  markReviewed(): void {
    if (!this.selectedScan) return;

    const formData = new FormData();
    formData.append('status', 'Reviewed');
    formData.append('notes', this.selectedScan.doctor_notes || '');

    this.loading = true;

    this.api.updateScan(this.selectedScan._id, formData).subscribe(() => {
      this.loading = false;
      this.loadScans();
      alert('Marked as Reviewed');
    });
  }
}
