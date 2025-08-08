import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User, AuthResponse } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PWDRegistration {
  id?: string;
  personal_info: {
    name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    gender: string;
  };
  disability_info: {
    type: string;
    severity: string;
    diagnosis_date: string;
  };
  education: {
    level: string;
    institution: string;
    year_completed: string;
  };
  skills: string[];
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  government_id_url?: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor() {
    debugger
    this.supabase = createClient(environment.supabase.url, environment.supabase.anonKey);
    // this.initializeAuth();
  }

  private async initializeAuth() {
    debugger
    const { data: { user } } = await this.supabase.auth.getUser();
    this.currentUser.next(user);

    this.supabase.auth.onAuthStateChange((event, session) => {
      this.currentUser.next(session?.user ?? null);
    });
  }

  getCurrentUser(): Observable<User | null> {
    debugger
    return this.currentUser.asObservable();
  }

  async signUp(email: string, password: string): Promise<AuthResponse> {
    return await this.supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    return await this.supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
  }

  async uploadFile(file: File, path: string): Promise<string> {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await this.supabase.storage
      .from('pwd-documents')
      .upload(`${path}/${fileName}`, file);

    if (error) throw error;

    const { data: { publicUrl } } = this.supabase.storage
      .from('pwd-documents')
      .getPublicUrl(`${path}/${fileName}`);

    return publicUrl;
  }

  async createPWDRegistration(data: PWDRegistration): Promise<PWDRegistration> {
    const { data: result, error } = await this.supabase
      .from('pwd_registrations')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async getPWDRegistrations(): Promise<PWDRegistration[]> {
    const { data, error } = await this.supabase
      .from('pwd_registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async updatePWDRegistration(id: string, data: Partial<PWDRegistration>): Promise<PWDRegistration> {
    const { data: result, error } = await this.supabase
      .from('pwd_registrations')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  async deletePWDRegistration(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('pwd_registrations')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
} 