import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NotificationService {

	onSuccess = new EventEmitter<string>();
	onError = new EventEmitter<string>();
	isLoading = new EventEmitter<boolean>();

  	constructor() { }

  	showSuccess(body : string){
  		this.onSuccess.emit(body);
  	}

  	showError(body : string){
  		this.onError.emit(body);
  	}

  	setIsLoading(isLoading : boolean){
  		this.isLoading.emit(isLoading);
  	}

}
