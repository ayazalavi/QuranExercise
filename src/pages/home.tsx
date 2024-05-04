import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlashList } from "@shopify/flash-list";
import { Endpoints } from "api/endpoints";
import { getFormatterFor } from "api/formatter";
import ChaptersListItem, { Separator } from "components/chapters.listitem";
import JuzListItem from "components/juz.listitem";
import MainView from "components/mainview";
import Switch from "components/switch";
import { DataContext, useAPI } from "hooks/useAPI";
import { RootStackParamList } from "navigation";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { View } from "react-native";
import { ChaptersType } from "types/chapters";
import { RubElHizbType } from "types/rub_el_hiz";
type Props = NativeStackScreenProps<RootStackParamList, "Home">;

function HomePage(props: Props) {
  const [listType, setListType] = useState(Endpoints.CHAPTERS);
  const {
    data,
    loading,
    chapters,
    fetchChapters,
    rubelHizDownloaded,
    startDownloadRubElHizb,
  } = useAPI(listType, getFormatterFor(listType));
  useEffect(() => {
    // startDownload();
    fetchChapters();
    startDownloadRubElHizb();
  }, []);

  const { setChapters } = useContext(DataContext);
  useEffect(() => {
    setChapters(chapters);
  }, [chapters]);
  console.log(data, chapters);
  return (
    <MainView>
      <Switch onChange={setListType} />
      <FlashList
        data={data as any}
        estimatedItemSize={100}
        refreshing={loading || !rubelHizDownloaded}
        onRefresh={() => {}}
        contentContainerStyle={{ paddingBottom: 20 }}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => {
          return listType === Endpoints.CHAPTERS ? (
            <ChaptersListItem {...(item as ChaptersType)} />
          ) : (
            <JuzListItem
              item={item as any}
              chapter={chapters.find(
                (chapter) =>
                  chapter.id ===
                  (item as RubElHizbType)?.verse_details?.verse.chapter_id
              )}
            />
          );
        }}
      />
    </MainView>
  );
}

export default HomePage;
