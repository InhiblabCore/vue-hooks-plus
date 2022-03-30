import { createApp } from "vue";
// @ts-ignore
import App from "./App.vue";
import Test from "./Test.vue";
import "@vue/repl/style.css";

// import '@varlet/ui/es/snackbar/style'

const app = createApp(Test);

app.mount("#app");
