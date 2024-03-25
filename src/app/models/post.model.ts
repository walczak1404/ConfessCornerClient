export class Post {
   ConfessionId: string;
   Header: string;
   Content: string;
   Author?: string;
   CreatedOn: string;

   constructor(obj) {
      this.ConfessionId = obj.confessionId;
      this.Header = obj.header;
      this.Content = obj.content;
      this.Author = obj.author;
      this.CreatedOn = obj.createdOn;
   }
}