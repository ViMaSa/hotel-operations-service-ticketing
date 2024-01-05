import App from "./App.vue"
import axios from "axios";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { createApp } from "vue"
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faArrowLeft,
  faBellConcierge,
  faCheck,
  faPencil,
  faTableColumns,
  faTicket,
  faTrashCan,
  faX,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faArrowLeft,
  faBellConcierge,
  faCheck,
  faPencil,
  faTableColumns,
  faTicket,
  faTrashCan,
  faX,
);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(router);

app.config.globalProperties.$http = axios;

app.mount("#app");
