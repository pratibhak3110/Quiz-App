

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