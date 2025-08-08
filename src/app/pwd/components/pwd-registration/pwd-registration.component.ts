import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService, PWDRegistration } from '../../../core/services/supabase.service';
import { MessageService } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { NgxCaptchaModule } from 'ngx-captcha';
import { environment } from '../../../../environments/environment';

interface StepItem {
  label: string;
  command: () => void;
}

@Component({
  selector: 'app-pwd-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StepsModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    MultiSelectModule,
    FileUploadModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    NgxCaptchaModule
  ],
  providers: [MessageService],
  templateUrl: './pwd-registration.component.html',
  styleUrls: ['./pwd-registration.component.scss']
})
export class PwdRegistrationComponent implements OnInit {
  currentStep = 0;
  steps: StepItem[] = [
    { label: 'Personal Info', command: () => this.goToStep(0) },
    { label: 'Disability Info', command: () => this.goToStep(1) },
    { label: 'Education', command: () => this.goToStep(2) },
    { label: 'Skills & Address', command: () => this.goToStep(3) },
    { label: 'Documents', command: () => this.goToStep(4) }
  ];

  // Form groups for each step
  personalInfoForm!: FormGroup;
  disabilityInfoForm!: FormGroup;
  educationForm!: FormGroup;
  skillsAddressForm!: FormGroup;
  documentsForm!: FormGroup;

  // Dropdown options
  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' }
  ];

  disabilityTypes = [
    { label: 'Visual Impairment', value: 'visual' },
    { label: 'Hearing Impairment', value: 'hearing' },
    { label: 'Physical Disability', value: 'physical' },
    { label: 'Intellectual Disability', value: 'intellectual' },
    { label: 'Mental Health', value: 'mental_health' },
    { label: 'Multiple Disabilities', value: 'multiple' }
  ];

  severityLevels = [
    { label: 'Mild', value: 'mild' },
    { label: 'Moderate', value: 'moderate' },
    { label: 'Severe', value: 'severe' },
    { label: 'Profound', value: 'profound' }
  ];

  educationLevels = [
    { label: 'Primary', value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
    { label: 'Higher Secondary', value: 'higher_secondary' },
    { label: 'Graduate', value: 'graduate' },
    { label: 'Post Graduate', value: 'post_graduate' },
    { label: 'No Formal Education', value: 'none' }
  ];

  skillOptions = [
    { label: 'Computer Skills', value: 'computer' },
    { label: 'Communication', value: 'communication' },
    { label: 'Leadership', value: 'leadership' },
    { label: 'Problem Solving', value: 'problem_solving' },
    { label: 'Team Work', value: 'team_work' },
    { label: 'Adaptability', value: 'adaptability' }
  ];

  stateOptions = [
    { label: 'Maharashtra', value: 'maharashtra' },
    { label: 'Delhi', value: 'delhi' },
    { label: 'Karnataka', value: 'karnataka' },
    { label: 'Tamil Nadu', value: 'tamil_nadu' },
    { label: 'Gujarat', value: 'gujarat' }
  ];

  loading = false;
  submitting = false;
  selectedFile: File | null = null;
  showSuccessDialog = false;
  recaptchaSiteKey = environment.recaptcha.siteKey;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.initializeForms();
  }

  ngOnInit() {}

  private initializeForms() {
    this.personalInfoForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required]
    });

    this.disabilityInfoForm = this.fb.group({
      type: ['', Validators.required],
      severity: ['', Validators.required],
      diagnosisDate: ['', Validators.required]
    });

    this.educationForm = this.fb.group({
      level: ['', Validators.required],
      institution: [''],
      yearCompleted: ['', Validators.required]
    });

    this.skillsAddressForm = this.fb.group({
      skills: [[], Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
    });

    this.documentsForm = this.fb.group({
      governmentId: [null, Validators.required]
    });
  }

  goToStep(step: number) {
    if (this.canGoToStep(step)) {
      this.currentStep = step;
    }
  }

  canGoToStep(step: number): boolean {
    if (step === 0) return true;
    if (step === 1) return this.personalInfoForm.valid;
    if (step === 2) return this.disabilityInfoForm.valid;
    if (step === 3) return this.educationForm.valid;
    if (step === 4) return this.skillsAddressForm.valid;
    return false;
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  isCurrentStepValid(): boolean {
    switch (this.currentStep) {
      case 0: return this.personalInfoForm.valid;
      case 1: return this.disabilityInfoForm.valid;
      case 2: return this.educationForm.valid;
      case 3: return this.skillsAddressForm.valid;
      case 4: return this.documentsForm.valid;
      default: return false;
    }
  }

  closeSuccessDialog() {
    this.showSuccessDialog = false;
    this.router.navigate(['/']);
  }

  onFileSelect(event: any) {
    this.selectedFile = event.files[0];
    this.documentsForm.patchValue({ governmentId: this.selectedFile });
  }

  async submitRegistration() {
    if (this.isFormValid()) {
      this.loading = true;
      try {
        const registrationData: PWDRegistration = {
          personal_info: {
            name: this.personalInfoForm.value.name,
            email: this.personalInfoForm.value.email,
            phone: this.personalInfoForm.value.phone,
            date_of_birth: this.personalInfoForm.value.dateOfBirth,
            gender: this.personalInfoForm.value.gender
          },
          disability_info: {
            type: this.disabilityInfoForm.value.type,
            severity: this.disabilityInfoForm.value.severity,
            diagnosis_date: this.disabilityInfoForm.value.diagnosisDate
          },
          education: {
            level: this.educationForm.value.level,
            institution: this.educationForm.value.institution,
            year_completed: this.educationForm.value.yearCompleted
          },
          skills: this.skillsAddressForm.value.skills,
          address: {
            street: this.skillsAddressForm.value.street,
            city: this.skillsAddressForm.value.city,
            state: this.skillsAddressForm.value.state,
            pincode: this.skillsAddressForm.value.pincode
          }
        };

        // Upload file if selected
        if (this.selectedFile) {
          const fileUrl = await this.supabaseService.uploadFile(this.selectedFile, 'government-ids');
          registrationData.government_id_url = fileUrl;
        }

        await this.supabaseService.createPWDRegistration(registrationData);
        
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registration submitted successfully!'
        });

        this.router.navigate(['/']);
      } catch (error: any) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'Registration failed. Please try again.'
        });
      } finally {
        this.loading = false;
      }
    }
  }

  private isFormValid(): boolean {
    return this.personalInfoForm.valid &&
           this.disabilityInfoForm.valid &&
           this.educationForm.valid &&
           this.skillsAddressForm.valid &&
           this.documentsForm.valid;
  }
} 