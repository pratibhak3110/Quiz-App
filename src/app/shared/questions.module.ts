// export interface QuestionsSet{
//     paper: string,
//     category: string,
//     type:string,
//     difficulty:string,
//     question: string,
//     correct_answer: string,
//     incorrect_answers: [],
   
// }

export interface QuizData{
    id: number,
    paper: string,
    questionSet:[{
        category: string,
        type: string,
        difficulty: string,
        question: string,
        correct_answer: string,
        incorrect_answers: []
    }]
}
