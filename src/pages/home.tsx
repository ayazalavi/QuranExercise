import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlashList } from "@shopify/flash-list";
import { Endpoints } from "api/endpoints";
import { getFormatterFor } from "api/formatter";
import ChaptersListItem, { Separator } from "components/chapters.listitem";
import MainView from "components/mainview";
import Switch from "components/switch";
import { useAPI } from "hooks/useAPI";
import { RootStackParamList } from "navigation";
import { useEffect, useState } from "react";
import React from "react";
import { View } from "react-native";
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

function HomePage(props: Props) {
  const [listType, setListType] = useState(Endpoints.CHAPTERS);
  const { data, loading, startDownload, quranDownloaded } = useAPI(
    listType,
    getFormatterFor(listType)
  );
  useEffect(() => {
    startDownload();
  }, []);
  return (
    <MainView>
      <Switch onChange={setListType} />
      <FlashList
        data={data}
        estimatedItemSize={100}
        refreshing={loading || !quranDownloaded}
        onRefresh={() => {}}
        contentContainerStyle={{ paddingBottom: 20 }}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => {
          return listType === Endpoints.CHAPTERS ? (
            <ChaptersListItem {...item} />
          ) : null;
        }}
      />
    </MainView>
  );
}

export default HomePage;
