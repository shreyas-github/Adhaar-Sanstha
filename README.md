# Aadhar Sanstha - Angular 17 Application

A comprehensive web application for managing and supporting persons with disabilities (PWDs) through various programs, schemes, and services.

## 🚀 Technology Stack

- **Frontend Framework**: Angular 17 (Standalone Components)
- **UI Framework**: PrimeNG v17.0.0 + PrimeFlex v3.3.1
- **Icons**: PrimeIcons
- **Backend**: Supabase (Auth, Database, Storage)
- **Internationalization**: ngx-translate
- **Form Security**: reCAPTCHA v3
- **Styling**: SCSS with PrimeNG themes

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/                 # Admin dashboard for PWD management
│   ├── auth/                  # Authentication components (login/register)
│   ├── core/                  # Core services and guards
│   │   ├── guards/           # Route protection
│   │   └── services/         # Supabase service
│   ├── home/                 # Landing page
│   ├── pwd/                  # PWD registration forms
│   ├── programs/             # Program showcase
│   ├── schemes/              # Government schemes
│   └── shared/               # Reusable components
│       └── components/
│           ├── navbar/       # Navigation with accessibility controls
│           ├── footer/       # Site footer
│           └── loader/       # Loading component
├── assets/
│   └── i18n/                # Translation files (EN, HI, MR)
└── environments/            # Environment configuration
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone and Install

```bash
cd aadhar-sanstha
npm install
```

### 2. Environment Configuration

Create environment files with your Supabase credentials:

**src/environments/environment.ts**
```typescript
export const environment = {
  production: false,
  supabase: {
    url: 'YOUR_SUPABASE_URL',
    anonKey: 'YOUR_SUPABASE_ANON_KEY'
  },
  recaptcha: {
    siteKey: 'YOUR_RECAPTCHA_SITE_KEY'
  }
};
```

### 3. Supabase Setup

1. Create a new Supabase project
2. Set up the following tables:

**pwd_registrations table:**
```sql
CREATE TABLE pwd_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  personal_info JSONB NOT NULL,
  disability_info JSONB NOT NULL,
  education JSONB NOT NULL,
  skills TEXT[] NOT NULL,
  address JSONB NOT NULL,
  government_id_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. Create a storage bucket named `pwd-documents` for file uploads
4. Configure Row Level Security (RLS) policies as needed

### 4. Run the Application

```bash
# Development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 🎯 Features

### 🔐 Authentication
- Email-based registration with OTP
- Secure login/logout
- Route protection with AuthGuard
- Session management

### 📝 PWD Registration
- Multi-step registration form
- Personal information collection
- Disability type and severity
- Education and skills
- Address information
- Document upload (government ID)
- Form validation and reCAPTCHA integration

### 👨‍💼 Admin Dashboard
- View all PWD registrations
- Filter by disability type and location
- Edit registration details
- Delete registrations
- Export data to CSV
- Responsive table with PrimeNG components

### 🎓 Programs
- Skill development training
- Healthcare and assistive devices
- Employment assistance
- Educational support
- Recreational activities

### 🏛️ Government Schemes
- Disability pension scheme
- Assistive devices distribution
- Skill development programs
- Educational scholarships
- Housing assistance
- Transportation subsidies

### ♿ Accessibility Features
- High contrast mode toggle
- Font size controls
- WCAG 2.1 AA compliance
- Semantic HTML structure
- ARIA labels and roles

### 🌐 Internationalization
- Multi-language support (English, Hindi, Marathi)
- Language switcher in navbar
- Translation files for all UI text

## 🎨 UI Components

All components use PrimeNG with the Lara Light Indigo theme:
- **Forms**: InputText, Password, Dropdown, Calendar, MultiSelect
- **Navigation**: Menu, Dropdown, Button
- **Data Display**: Table, Card, Tag
- **Feedback**: Toast, ConfirmDialog, ProgressSpinner
- **Layout**: Grid system with PrimeFlex

## 🔧 Development

### Adding New Components

```bash
# Generate a new standalone component
ng generate component path/to/component --standalone
```

### Adding Translations

1. Add keys to `src/assets/i18n/en.json`
2. Add corresponding translations to `hi.json` and `mr.json`
3. Use in templates: `{{ 'KEY.PATH' | translate }}`

### Styling Guidelines

- Use PrimeFlex utility classes for layout
- Custom styles in component SCSS files
- Follow BEM methodology for custom CSS
- Use CSS custom properties for theming

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables

Set production environment variables:
- Supabase URL and keys
- reCAPTCHA site key
- Any other API endpoints

### Hosting Options

- **Vercel**: Optimized for Angular
- **Netlify**: Easy deployment with CI/CD
- **Firebase Hosting**: Google's hosting solution
- **AWS S3 + CloudFront**: Scalable static hosting

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- PrimeFlex responsive utilities
- Touch-friendly interfaces
- Optimized for various screen sizes

## 🔒 Security Features

- reCAPTCHA v3 integration
- Supabase Row Level Security
- Input validation and sanitization
- Secure file uploads
- Authentication guards

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for empowering persons with disabilities**
