import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collection, addDoc, getDocs, query, where, deleteDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) { }

  // Autenticação
  async login(email: string, password: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password);
      return result.user;
    } catch (error) {
      throw error;
    }
  }

  async register(email: string, password: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password);
      return result.user;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw error;
    }
  }

  // Produtos
  async getAllProducts() {
    try {
      const productsRef = collection(this.firestore, 'products');
      const snapshot = await getDocs(productsRef);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw error;
    }
  }

  async checkMixture(product1Id: string, product2Id: string) {
    try {
      const mixturesRef = collection(this.firestore, 'incompatible_mixtures');
      const q = query(
        mixturesRef,
        where('products', 'array-contains-any', [product1Id, product2Id])
      );
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const mixture = snapshot.docs[0].data();
        return {
          safe: false,
          message: mixture['reason'] || 'Esta mistura pode ser perigosa!'
        };
      }

      return {
        safe: true,
        message: 'Esta mistura é segura para uso.'
      };
    } catch (error) {
      throw error;
    }
  }

  // Favoritos
  async addToFavorites(userId: string, productId: string) {
    try {
      const favoritesRef = collection(this.firestore, 'favorites');
      await addDoc(favoritesRef, {
        userId,
        productId,
        createdAt: new Date()
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getFavorites(userId: string) {
    try {
      const favoritesRef = collection(this.firestore, 'favorites');
      const q = query(favoritesRef, where('userId', '==', userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw error;
    }
  }

  async removeFavorite(favoriteId: string) {
    try {
      await deleteDoc(doc(this.firestore, 'favorites', favoriteId));
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Histórico
  async addToHistory(userId: string, product1Id: string, product2Id: string, isSafe: boolean) {
    try {
      const historyRef = collection(this.firestore, 'history');
      await addDoc(historyRef, {
        userId,
        product1Id,
        product2Id,
        isSafe,
        createdAt: new Date()
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getHistory(userId: string) {
    try {
      const historyRef = collection(this.firestore, 'history');
      const q = query(historyRef, where('userId', '==', userId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw error;
    }
  }
}