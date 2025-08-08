import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

interface Scheme {
  id: number;
  title: string;
  description: string;
  eligibility: string;
  benefits: string[];
  requirements?: string[];
  applicationLink?: string;
  detailsLink?: string;
  category: string;
  status: 'active' | 'upcoming' | 'closed';
  amount: string;
  validUntil: Date;
  icon: string;
}

@Component({
  selector: 'app-schemes-list',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, DropdownModule, TagModule, TranslateModule, FormsModule],
  templateUrl: './schemes-list.component.html',
  styleUrls: ['./schemes-list.component.scss']
})
export class SchemesListComponent implements OnInit {
  selectedCategory: any = null;
  filteredSchemes: Scheme[] = [];
  categories: any[] = [];

  schemes: Scheme[] = [
    {
      id: 1,
      title: 'Disability Pension Scheme',
      description: 'Monthly pension for persons with disabilities to support their basic needs and improve quality of life.',
      eligibility: 'PWDs with 40% or more disability, age 18-59 years',
      benefits: ['Monthly pension of ₹500-1000', 'Direct bank transfer', 'No income limit'],
      requirements: ['Disability certificate', 'Aadhar card', 'Bank account'],
      applicationLink: 'https://disabilitypension.gov.in',
      category: 'Financial Support',
      status: 'active',
      amount: '₹500-1000/month',
      validUntil: new Date('2024-12-31'),
      icon: 'pi pi-money-bill'
    },
    {
      id: 2,
      title: 'Assistive Devices Distribution',
      description: 'Free distribution of assistive devices like wheelchairs, hearing aids, and prosthetics.',
      eligibility: 'All PWDs with valid disability certificate',
      benefits: ['Free assistive devices', 'Home delivery', 'Maintenance support'],
      requirements: ['Disability certificate', 'Medical prescription'],
      applicationLink: 'https://assistivedevices.gov.in',
      category: 'Healthcare',
      status: 'active',
      amount: 'Free',
      validUntil: new Date('2024-12-31'),
      icon: 'pi pi-wheelchair'
    },
    {
      id: 3,
      title: 'Skill Development for PWDs',
      description: 'Vocational training and skill development programs specifically designed for persons with disabilities.',
      eligibility: 'PWDs aged 15-45 years',
      benefits: ['Free training', 'Job placement assistance', 'Stipend during training'],
      requirements: ['Disability certificate', 'Age proof'],
      applicationLink: 'https://skilldevelopment.gov.in',
      category: 'Employment',
      status: 'active',
      amount: 'Free + ₹2000/month stipend',
      validUntil: new Date('2024-12-31'),
      icon: 'pi pi-graduation-cap'
    },
    {
      id: 4,
      title: 'Educational Scholarship',
      description: 'Scholarships for students with disabilities pursuing higher education.',
      eligibility: 'PWD students in recognized institutions',
      benefits: ['Full tuition fee waiver', 'Monthly stipend', 'Book allowance'],
      requirements: ['Disability certificate', 'Admission letter', 'Income certificate'],
      applicationLink: 'https://scholarship.gov.in',
      category: 'Education',
      status: 'active',
      amount: 'Full tuition + ₹5000/month',
      validUntil: new Date('2024-12-31'),
      icon: 'pi pi-book'
    },
    {
      id: 5,
      title: 'Housing Assistance',
      description: 'Financial assistance for construction or modification of houses for PWDs.',
      eligibility: 'PWDs with own land or house',
      benefits: ['Up to ₹50,000 assistance', 'Technical guidance', 'Quality materials'],
      requirements: ['Disability certificate', 'Land documents', 'Income certificate'],
      category: 'Infrastructure',
      status: 'upcoming',
      amount: 'Up to ₹50,000',
      validUntil: new Date('2024-12-31'),
      icon: 'pi pi-home'
    },
    {
      id: 6,
      title: 'Transportation Subsidy',
      description: 'Subsidy on public transport and specialized transportation services for PWDs.',
      eligibility: 'PWDs with mobility issues',
      benefits: ['50% fare subsidy', 'Specialized transport', 'Escort allowance'],
      requirements: ['Disability certificate', 'Mobility assessment'],
      applicationLink: 'https://transport.gov.in',
      category: 'Mobility',
      status: 'active',
      amount: '50% subsidy',
      validUntil: new Date('2024-12-31'),
      icon: 'pi pi-car'
    }
  ];

  getSchemesByCategory(category: string): Scheme[] {
    return this.schemes.filter(scheme => scheme.category === category);
  }

  getCategories(): string[] {
    return [...new Set(this.schemes.map(scheme => scheme.category))];
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'active': return 'success';
      case 'upcoming': return 'warning';
      case 'closed': return 'danger';
      default: return 'info';
    }
  }

  openApplicationLink(link: string) {
    window.open(link, '_blank');
  }

  ngOnInit() {
    this.categories = [
      { label: 'All Categories', value: null },
      ...this.getCategories().map(cat => ({ label: cat, value: cat }))
    ];
    this.filteredSchemes = this.schemes;
  }

  filterSchemes() {
    if (this.selectedCategory) {
      this.filteredSchemes = this.schemes.filter(scheme => scheme.category === this.selectedCategory);
    } else {
      this.filteredSchemes = this.schemes;
    }
  }

  clearFilters() {
    this.selectedCategory = null;
    this.filteredSchemes = this.schemes;
  }

  openApplication(link: string) {
    window.open(link, '_blank');
  }

  openDetails(link: string) {
    window.open(link, '_blank');
  }

  contactDepartment(scheme: Scheme) {
    // Implement contact functionality
    console.log('Contact department for:', scheme.title);
  }
} 