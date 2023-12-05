import { reactive } from "vue";

export const userState = reactive({
  username: null
});

export function setUser(username) {
  userState.username = username;
}

export function clearUser() {
  userState.username = null;
}
