 export class Source {
id: string;
category: string;
country: string;
description: string;
language:string;
name:string
url:string;

constructor(
id: string,
category: string,
country: string,
description: string,
language:string,
name:string,
url:string,
){
    this.id=id;
    this.category=category;
    this.country=country;
    this.description=description;
    this.language=language;
    this.name=name;
    this.url=url;
}

}