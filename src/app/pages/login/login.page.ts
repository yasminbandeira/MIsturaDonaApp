import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  mostrarSenha: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    if (this.email.trim() && this.password.trim()) {
      // Salvar usuário no localStorage
      localStorage.setItem('usuario_logado', JSON.stringify({
        email: this.email,
        nome: this.email.split('@')[0]
      }));
      this.router.navigate(['/product-search']);
    }
  }

  entrarComDemo() {
    // Entrada rápida para demonstração
    localStorage.setItem('usuario_logado', JSON.stringify({
      email: 'demo@misturadona.com',
      nome: 'Demo'
    }));
    this.router.navigate(['/product-search']);
  }

  toggleSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }
}
