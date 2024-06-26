import { fetchDataFor } from "api";
import { Endpoints } from "api/endpoints";
import { userSelectedFontSize } from "components/theme";
import { Quran } from "hooks/useAPI";
import { SetStateAction } from "react";
import { Dimensions } from "react-native";
import { Text } from "react-native-svg";
import { IndoPakText } from "types/IndoPakText";
import { QuranChaptersinPage } from "types/quran.pages";
import { RubElHizbType } from "types/rub_el_hiz";

export let QuranText: string = "";
export let Juz: Record<string, RubElHizbType[]> = {};

const maxWordsIneachPage = (totalChapters: number, totalBismillah: number) => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const viewWidth = screenWidth - 50; // Assuming 90% of screen width
  const viewHeight = screenHeight - totalChapters * 35 - totalBismillah * 40; // Assuming 50% of screen height
  const fontSize = userSelectedFontSize; // Adjust this based on your text's font size
  const maxWordsPerLine = Math.floor(viewWidth / (fontSize / 2)); // Approximation
  const maxLines = Math.floor(viewHeight / fontSize);
  const maxWordsInView = maxWordsPerLine * maxLines;
  const averageCharsPerWord = 8;
  return maxWordsInView;
};

const downloadQuranIndopakByJuz = (
  setQuranDownloaded: (p: boolean) => void
) => {
  setQuranDownloaded(false);
  const promises = [...Array(1).keys()].map((ind) =>
    fetchDataFor(Endpoints.QURAN_INDOPAK, [], ["juz_number=" + (ind + 1)])
  );

  Promise.allSettled(promises)
    .then((results) =>
      results.forEach((result: PromiseSettledResult<any>) => {
        if (result.status === "fulfilled") {
          Quran[result.value.meta.filters.juz_number] = result.value.verses;
        }
      })
    )
    .then(() => (QuranText = allTextQuran()))
    .finally(() => setQuranDownloaded(true));
};

const downloaRubElHizbAndDoFormat = (
  setRubElHizDownloaded: (p: boolean) => void
): Promise<any> => {
  setRubElHizDownloaded(false);
  const promises = [...Array(240).keys()].map((ind) =>
    fetchDataFor(Endpoints.RUB_EL_HIZB, [`${ind + 1}`])
  );

  return Promise.allSettled(promises)
    .then((results) =>
      Promise.allSettled(
        results.map(async (result: PromiseSettledResult<any>) => {
          if (result.status === "fulfilled") {
            const firstVerse = result.value.verses.shift();
            firstVerse.verse_details = await fetchDataFor(
              Endpoints.VERSE_DETAILS,
              [firstVerse.verse_key],
              [
                "words=true&translations=131&word_fields=text_uthmani,text_indopak,code_v1,v1_page,verse_id,verse_key&fields=chapter_id",
              ]
            );
            return firstVerse;
          }
        })
      )
    )
    .then((results) =>
      results.map((result: PromiseSettledResult<any>) =>
        result.status === "fulfilled" ? result.value : {}
      )
    )
    .finally(() => setRubElHizDownloaded(true));
};

function generateNumbering(num: number) {
  let result;
  // if (num % 4 === 0) {
  //   // If the number is divisible by 4
  //   result = num / 4;
  // } else {
  // If the number is not divisible by 4
  const quotient = Math.floor((num - 1) / 4);
  const remainder = (num - 1) % 4;
  if (remainder === 0) {
    result = quotient + 1;
  } else {
    result = `${remainder}/4`;
  }
  // }
  return result;
}

const allTextQuran = () =>
  Object.values(Quran).reduce((acc: string, verses: IndoPakText[]) => {
    const verseTexts = verses.map(
      (verse) =>
        verse.text_indopak +
        "    " +
        "\uF67C" +
        " " +
        convertToArabicNumber(verse.verse_key.split(":")[1])
    );
    return acc + verseTexts;
  }, "");

const makePagesOfText = () => {
  let totalChapters = 0,
    pagesQuran: Record<string, QuranChaptersinPage | QuranChaptersinPage[]> =
      {},
    totalBismillah = 0;

  const appendTextInPage = (
    chapter: QuranChaptersinPage,
    verse: IndoPakText,
    maxWords: number
  ) => {
    chapter.text.length;
  };
  const verifyVerseFitWithinPAge = (
    verse: IndoPakText,
    currentPage: QuranChaptersinPage
  ) => {
    const verseText = verse.text_indopak + "   " + "\uF67C" + "  ";
    const currentPageText = currentPage.text;
    if (
      currentPageText.length + verseText.length <=
      maxWordsIneachPage(totalChapters, totalBismillah)
    )
      return true;
    else return false;
  };
  const juzMap = (verse: IndoPakText) => {
    const [chapter, verse_number] = verse.verse_key.split(":");
    const currentPage = Object.keys(pagesQuran).pop() || "1";
    const pageExists = Object.hasOwn(pagesQuran, currentPage);
    if (verse_number === "1") {
      if (chapter !== "1") totalBismillah += 1;
      totalChapters += 1;
    }
    if (!pageExists) {
      //verifyVerseFitWithinPAge(verse, )
      // pagesQuran[currentPage] = { chapter_number: chapter, text:  };
    } else if (pageExists) {
      const onlyChapter = Object.hasOwn(
        pagesQuran[currentPage],
        "chapter_number"
      );
      const onlYChapterObj = pagesQuran[currentPage] as QuranChaptersinPage;
      if (onlyChapter && onlYChapterObj.chapter_number === chapter) {
        // appendTextInPage(onlYChapterObj, verse, maxWordsIneachPage())
      }
    }
    if (!Object.hasOwn(pagesQuran[currentPage], "chapter_number")) {
      if (
        (pagesQuran[currentPage] as QuranChaptersinPage).chapter_number ===
        chapter
      ) {
        const currentPageTextLength = (
          pagesQuran[currentPage] as QuranChaptersinPage
        ).text.length;
        // if(currentPageTextLength < maxWordsIneachPage(1, ))
      }
    } else {
    }
    //   if (!totalChapters.find(chapter => chapter.chapter_number)) {
    //     totalChapters.push(chapter);
    //     if (chapter !== "1") totalBismillah += 1;
    //   }
    //   pagesQuran[currentPage].
  };
  Object.keys(Quran).map((juz) => Quran[juz].map(juzMap));
};

function convertToArabicNumber(englishNumber: string) {
  const arabicDigits = [
    "\u06F0",
    "\u06F1",
    "\u06F2",
    "\u06F3",
    "\u06F4",
    "\u06F5",
    "\u06F6",
    "\u06F7",
    "\u06F8",
    "\u06F9",
  ];
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let arabicNumber = "";

  // Replace each English digit with its Arabic counterpart
  for (let i = 0; i < englishNumber.length; i++) {
    const digit = englishNumber[i];
    const index = englishDigits.indexOf(digit);
    arabicNumber += index !== -1 ? arabicDigits[index] : digit;
  }

  return arabicNumber;
}

function calculateWordsThatFit(
  text: string,
  fontSize: number,
  lineHeight: number,
  componentWidth: number,
  componentHeight: number
) {
  const words = text.split(" ");
  const maxLines = Math.floor(componentHeight / lineHeight);

  let totalHeight = 0;
  let currentLineHeight = 0;
  let currentLineWidth = 0;
  let wordsThatFit = 0;
  let finalWords = "";

  for (const word of words) {
    const wordWidth = word.length * fontSize * 0.28; // Approximate width of word
    currentLineWidth += wordWidth;
    if (currentLineWidth / componentWidth > maxLines) {
      break;
    }
    finalWords += " " + word;
  }

  console.log(finalWords);
  return finalWords;
}

export {
  maxWordsIneachPage,
  downloadQuranIndopakByJuz,
  makePagesOfText,
  convertToArabicNumber,
  calculateWordsThatFit,
  downloaRubElHizbAndDoFormat,
  generateNumbering,
};
