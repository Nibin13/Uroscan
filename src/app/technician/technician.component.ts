import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-technician',
  standalone: false,
  templateUrl: './technician.component.html',
  styleUrls: ['./technician.component.scss']
})
export class TechnicianComponent {
selectedFile: File | null = null;
  analysisResult: any = null;
  loading: boolean = false;

  constructor(private api: ApiService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  startAnalysis() {
    if (!this.selectedFile) return;

    this.loading = true;
    this.analysisResult = null;

    const formData = new FormData();
    formData.append('patient_id', 'PT1001');
    formData.append('doctor_id', 'DR001');
    formData.append('file', this.selectedFile);

    this.api.uploadScan(formData).subscribe({
      next: (res: any) => {
        this.analysisResult = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        alert("Upload failed");
        this.loading = false;
      }
    });
  }
}