import { ApiService } from './../api/api.service';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _uid = new BehaviorSubject<any>(null);
  currentUser: any;

  constructor(
    private fireAuth: Auth,
    private apiService: ApiService
  ) { }

  async login(email: string, password: string): Promise<any> {
    try {
      console.log(email);
      const response = await signInWithEmailAndPassword(this.fireAuth, email, password);
      console.log(response);
      if(response?.user) {
        this.setUserData(response.user.uid);
      }
    } catch(e) {
      console.log(e);
      throw(e);
    }
  }

  getId() {
    const auth = getAuth();
    console.log('current user auth: ', auth.currentUser);
    this.currentUser = auth.currentUser;
    console.log(this.currentUser);
    return this.currentUser?.uid;
  }

  setUserData(uid) {
    this._uid.next(uid);
  }

  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async register(formValue) {
    try {
      const registeredUser = await createUserWithEmailAndPassword(this.fireAuth, formValue.email, formValue.password);
      console.log('registered user: ', registeredUser);
      const data = {
        email: formValue.email,
        name: formValue.username,
        uid: registeredUser.user.uid,
        photo: 'https://i.pravatar.cc/' + this.randomIntFromInterval(200, 400)
      };
      await this.apiService.setDocument(`users/${registeredUser.user.uid}`, data);
      const userData = {
        id: registeredUser.user.uid
      };
      return userData;
    } catch(e) {
      throw(e);
    }
  }

  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.fireAuth, email);
    } catch(e) {
      throw(e);
    }
  }

  async logout() {
    try {
      await this.fireAuth.signOut();
      this._uid.next(null);
      this.currentUser = null;
      return true;
    } catch(e) {
      throw(e);
    }
  }

  checkAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.fireAuth, user => {
        console.log('auth user: ', user);
        resolve(user)
      });
    });
  }

  async getUserData(id) {
    const docSnap: any = await this.apiService.getDocById(`users/${id}`);
      if(docSnap?.exists()) {
        return docSnap.data();
      } else {
        throw('No such document exists');
      }
  }
}