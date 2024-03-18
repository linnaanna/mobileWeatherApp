import {
  IonAvatar,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";

import useAPI, { SearchResult } from "../hooks/useAPI";
import React, { useState, useEffect } from "react";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./Tab2.css";

const Tab2: React.FC = () => {
  const { searchData } = useAPI();

  const [searchTerm, setSearchTerm] = useState("");

  const [results, setResults] = useState<SearchResult[]>([]);
  const [presentAlert] = useIonAlert();
  const [loading, dismiss] = useIonLoading();

  useEffect(() => {
    if (searchTerm === "") {
      setResults([]);
      return;
    }

    const loadData = async () => {
      await loading();
      const result: any = await searchData(searchTerm);
      console.log(result);

      await dismiss();
      if (result?.Error) {
        presentAlert(result.Error);
      } else {
        setResults(result.Search);
      }
    };
    loadData();
  }, [searchTerm]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Super Weather App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Here's the weather!</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonSearchbar
          placeholder="Search by city"
          value={searchTerm}
          debounce={300}
          onIonChange={(e) => setSearchTerm(e.detail.value!)}
          autocapitalize={""}
        ></IonSearchbar>
        <IonTitle>Hello</IonTitle>

        {results?.map((item: SearchResult) => (
          <IonItem>
            <IonAvatar slot="start">
              <IonImg src={item.condition.icon} />
            </IonAvatar>
            <IonTitle>{item.location.name}</IonTitle>
          </IonItem>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
