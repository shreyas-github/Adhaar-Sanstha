import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService, PWDRegistration } from '../../../core/services/supabase.service';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    DialogModule,
    ToastModule,
    CardModule,
    ConfirmDialogModule,
    TranslateModule,
    FormsModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  registrations: PWDRegistration[] = [];
  filteredRegistrations: PWDRegistration[] = [];
  loading = false;
  selectedRegistration: PWDRegistration | null = null;
  dialogVisible = false;
  isEditing = false;
  
  // Filters
  selectedDisability: any = null;
  selectedLocation: any = null;
  searchTerm = '';
  
  disabilityTypes = [
    { label: 'All Disabilities', value: null },
    { label: 'Visual Impairment', value: 'visual' },
    { label: 'Hearing Impairment', value: 'hearing' },
    { label: 'Physical Disability', value: 'physical' },
    { label: 'Intellectual Disability', value: 'intellectual' },
    { label: 'Mental Health', value: 'mental_health' },
    { label: 'Multiple Disabilities', value: 'multiple' }
  ];

  locations = [
    { label: 'All Locations', value: null },
    { label: 'Mumbai', value: 'mumbai' },
    { label: 'Pune', value: 'pune' },
    { label: 'Nagpur', value: 'nagpur' },
    { label: 'Delhi', value: 'delhi' },
    { label: 'Bangalore', value: 'bangalore' }
  ];

  severityLevels = [
    { label: 'Mild', value: 'mild' },
    { label: 'Moderate', value: 'moderate' },
    { label: 'Severe', value: 'severe' },
    { label: 'Profound', value: 'profound' }
  ];

  constructor(
    private supabaseService: SupabaseService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadRegistrations();
  }

  async loadRegistrations() {
    this.loading = true;
    try {
      this.registrations = await this.supabaseService.getPWDRegistrations();
      this.applyFilters();
    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load registrations'
      });
    } finally {
      this.loading = false;
    }
  }

  applyFilters() {
    this.filteredRegistrations = this.registrations.filter(reg => {
      const matchesDisability = !this.selectedDisability || 
        reg.disability_info.type === this.selectedDisability;
      const matchesLocation = !this.selectedLocation || 
        reg.address.city.toLowerCase().includes(this.selectedLocation.toLowerCase()) ||
        reg.address.state.toLowerCase().includes(this.selectedLocation.toLowerCase());
      const matchesSearch = !this.searchTerm || 
        reg.personal_info.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        reg.personal_info.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesDisability && matchesLocation && matchesSearch;
    });
  }

  viewRegistration(registration: PWDRegistration) {
    this.selectedRegistration = { ...registration };
    this.isEditing = false;
    this.dialogVisible = true;
  }

  editRegistration(registration: PWDRegistration) {
    this.selectedRegistration = { ...registration };
    this.isEditing = true;
    this.dialogVisible = true;
  }

  closeDialog() {
    this.dialogVisible = false;
    this.selectedRegistration = null;
    this.isEditing = false;
  }

  async saveRegistration() {
    if (this.selectedRegistration) {
      try {
        await this.supabaseService.updatePWDRegistration(
          this.selectedRegistration.id!,
          this.selectedRegistration
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registration updated successfully'
        });
        this.dialogVisible = false;
        this.loadRegistrations();
      } catch (error: any) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update registration'
        });
      }
    }
  }

  deleteRegistration(registration: PWDRegistration) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this registration?',
      accept: async () => {
        try {
          await this.supabaseService.deletePWDRegistration(registration.id!);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registration deleted successfully'
          });
          this.loadRegistrations();
        } catch (error: any) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete registration'
          });
        }
      }
    });
  }

  exportToCSV() {
    const headers = [
      'Name', 'Email', 'Phone', 'Disability Type', 'Severity', 
      'Education Level', 'City', 'State', 'Registration Date'
    ];
    
    const csvData = this.filteredRegistrations.map(reg => [
      reg.personal_info.name,
      reg.personal_info.email,
      reg.personal_info.phone,
      reg.disability_info.type,
      reg.disability_info.severity,
      reg.education.level,
      reg.address.city,
      reg.address.state,
      reg.created_at
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pwd_registrations.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  }
} 