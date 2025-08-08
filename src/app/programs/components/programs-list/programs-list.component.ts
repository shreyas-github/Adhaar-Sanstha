import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

interface Program {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  location: string;
  capacity: string;
  features?: string[];
  registrationLink?: string;
  detailsLink?: string;
  image?: string;
  icon: string;
}

@Component({
  selector: 'app-programs-list',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, DropdownModule, TranslateModule, FormsModule],
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.scss']
})
export class ProgramsListComponent implements OnInit {
  selectedCategory: any = null;
  filteredPrograms: Program[] = [];
  categories: any[] = [];

  programs: Program[] = [
    {
      id: 1,
      title: 'Skill Development Training',
      description: 'Comprehensive training programs in computer skills, communication, and vocational training for persons with disabilities.',
      category: 'Training',
      duration: '3-6 months',
      location: 'Mumbai, Pune, Nagpur',
      capacity: '50',
      features: ['Computer training', 'Communication skills', 'Job placement'],
      registrationLink: '/pwd/register',
      icon: 'pi pi-graduation-cap'
    },
    {
      id: 2,
      title: 'Prosthetics & Assistive Devices',
      description: 'Providing high-quality prosthetics, wheelchairs, and other assistive devices to improve mobility and independence.',
      category: 'Healthcare',
      duration: 'Ongoing',
      location: 'All major cities',
      capacity: 'Unlimited',
      features: ['Free assessment', 'Custom fitting', 'Maintenance support'],
      icon: 'pi pi-wheelchair'
    },
    {
      id: 3,
      title: 'Health Camps & Medical Support',
      description: 'Regular health check-ups, specialized medical consultations, and therapeutic services for PWDs.',
      category: 'Healthcare',
      duration: 'Monthly',
      location: 'Various locations',
      capacity: '200',
      features: ['Free check-ups', 'Specialist consultation', 'Medicines'],
      icon: 'pi pi-heart'
    },
    {
      id: 4,
      title: 'Employment Assistance',
      description: 'Job placement services, career counseling, and workplace accommodation support for PWDs.',
      category: 'Employment',
      duration: 'Ongoing',
      location: 'Pan India',
      capacity: 'Unlimited',
      features: ['Career counseling', 'Job placement', 'Workplace training'],
      icon: 'pi pi-briefcase'
    },
    {
      id: 5,
      title: 'Educational Support',
      description: 'Special education programs, learning aids, and academic support for students with disabilities.',
      category: 'Education',
      duration: 'Academic Year',
      location: 'Partner schools',
      capacity: '100',
      features: ['Special education', 'Learning aids', 'Academic support'],
      icon: 'pi pi-book'
    },
    {
      id: 6,
      title: 'Recreational Activities',
      description: 'Sports, arts, and cultural activities designed to promote social inclusion and personal development.',
      category: 'Recreation',
      duration: 'Weekly',
      location: 'Community centers',
      capacity: '75',
      features: ['Sports activities', 'Arts & crafts', 'Cultural events'],
      icon: 'pi pi-users'
    }
  ];

  getProgramsByCategory(category: string): Program[] {
    return this.programs.filter(program => program.category === category);
  }

  getCategories(): string[] {
    return [...new Set(this.programs.map(program => program.category))];
  }

  ngOnInit() {
    this.categories = [
      { label: 'All Categories', value: null },
      ...this.getCategories().map(cat => ({ label: cat, value: cat }))
    ];
    this.filteredPrograms = this.programs;
  }

  filterPrograms() {
    if (this.selectedCategory) {
      this.filteredPrograms = this.programs.filter(program => program.category === this.selectedCategory);
    } else {
      this.filteredPrograms = this.programs;
    }
  }

  clearFilters() {
    this.selectedCategory = null;
    this.filteredPrograms = this.programs;
  }

  openRegistration(link: string) {
    window.open(link, '_blank');
  }

  openDetails(link: string) {
    window.open(link, '_blank');
  }

  contactUs(program: Program) {
    // Implement contact functionality
    console.log('Contact us for:', program.title);
  }
} 