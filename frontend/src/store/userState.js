import { reactive } from "vue";

export const userState = reactive({
  username: null
});

export function initializeUserState () {
  const username = sessionStorage.getItem("username");

  if(username) {
    setUser(username);
  }
}

export function setUser(username) {
  userState.username = username;
}

export function clearUser() {
  userState.username = null;
}
