import { createStore } from 'solid-js/store';

interface SolidStore {
  videoId: string;
}

const Store = createStore<SolidStore>({
  videoId: "i_q0jqsBKnw"
});

export default Store;

