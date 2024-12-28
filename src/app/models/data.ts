export interface MainModel {
    id?: number;
    question?: string;
    option?: OptionDataModel[];
    answer?: string;
    correctOptionId?: string;
}
export interface OptionDataModel {
    choice?: string;
    isCorrect?: boolean;
    correctOptionId?: string;
}

