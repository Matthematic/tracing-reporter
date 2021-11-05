
class Test {
    constructor({id, name, link, issues, shortLink, type}) {
        this.id = id;
        this.name = name;
        this.link = link;
        this.issues = issues;
        this.shortLink = shortLink;
        this.type = type;
    }

    print() {
        if (this.id || this.name || this.type) {
            console.log(`${this.id} - ${this.name} ${this.type} ${this.issues.toString()}`);
        }
    }
}

export default Test;