// stores/messageStore.ts
import { makeAutoObservable } from "mobx";

class MessageStore {
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setErrorMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }

  setSuccessMessage(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }
}

const messageStore = new MessageStore();
export default messageStore;
