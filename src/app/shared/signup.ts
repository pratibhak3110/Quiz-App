export class SignupClass{
    constructor(
        public id: number,
        public email: String,
        public password: string,
        public usertype: string
    ){}
}

export class AdminValue {
    amount: number;
    category: number;
    difficulty: string;
    type: string;
    paper: any

    constructor() {
        this.amount = 0;
        this.category = 0;
        this.difficulty = '';
        this.type = '';
        this.paper='';
    }

}

export class UserValue {
  id: number;
    constructor() {
       this.id= 0;
    }

}