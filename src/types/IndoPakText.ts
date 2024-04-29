export type IndoPakText = {
  id: number;
  text_indopak: string;
  verse_key: string;
};

export type IndoPakAPIResponse = {
  meta: { filters: { page_number: string } };
  verses: IndoPakText[];
};
