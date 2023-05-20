import { Component, createSignal, Switch, Match, For, onMount } from 'solid-js';
import fetchVideoComments from '../../fetches/fetchVideoComments';
import { YouTubeVideoComment } from '../../types/DataTypes';
import Comment from '../../components/comment/Comment';
import * as tf from "@tensorflow/tfjs";

interface HomeScreenProps {

}

const urls = {
  model: "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json",
  metadata: "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json"
}

const HomeScreen: Component<HomeScreenProps> = (props:HomeScreenProps) => {
  
  const query = fetchVideoComments({});

  const [ model, setModel ] = createSignal<any>();
  const [ metaData, setMetaData ] = createSignal<any>();

  async function loadModel() {
    try {
      const model = await tf.loadLayersModel(urls.model);
      setModel(model);

      console.log("Model has loaded");
    } catch (err) {
      console.log(err)
    }
  }

  async function loadMetadata() {
    try {
      const metadataJson = await fetch(urls.metadata);
      const metadata = await metadataJson.json();
      setMetaData(metadata);

    } catch (err) {
      console.log(err);
    }
  }

  onMount(() => {
    loadModel();
    loadMetadata();
  })
  return (
    <div class="px-10">
      <Switch>
        <Match when={query.isFetching}>
          {"Loading ..."}
        </Match>
        <Match when={query.isSuccess}>
          <For each={query.data.items}>
            {
              (item: YouTubeVideoComment, index) => <Comment
                model={model()}
                metaData={metaData()}
                author = {item.snippet.topLevelComment.snippet.authorDisplayName}
                text={item.snippet.topLevelComment.snippet.textOriginal}
                date={item.snippet.topLevelComment.snippet.updatedAt}
            />
            }
          </For>
        </Match>
      </Switch>


    </div>
  );
}

export default HomeScreen;