// export class CreateQuiz{
//     constructor(
//         public id: number,
//         public question: string,
//         public option1: string,
//         public option2: string,
//         public option3: string,
//         public option4: string,
//         public correctAns?: string
//     ){}
// }

// class Options {
//     constructor(
//         public text: string,
//         public correct = false,
//     ){}
// }

export class CreateQuiz{
    constructor(
        public id: number,
        public category: string,
        public question: string,
        public options: [
            option1: string,
             option2: string,
             option3: string,
             option4: string,
             correctAns?: string
        ]
    ){}
}


// new CreateQuiz(1,'que', [ new Options('first opt', true)])