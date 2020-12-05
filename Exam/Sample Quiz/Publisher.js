class Auther {
    constructor(nme, brth, bks){
        this.name = nme,
        this.birth = brth,
        this.books = bks || [];
    }
    addBook(b){
        this.books.push(b);
        b.auther = this;
    }
    toString(){
        console.log(
            this.name, " ",
            this.birth, " ",
            "with ", this.books.length, " books"
        );
    }
}

class Book {
    constructor(bookName, auther, pgs){
        this.name = bookName,
        this.auther = auther,
        this.pages = pgs
    }
}
let book1 = new Book("criminal of dawn", Auther1, 631);

let Auther1 = new Auther("Blake", 1975, [book1]);

Auther1.addBook(book1);