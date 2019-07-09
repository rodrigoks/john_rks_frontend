export class CollectionUtils {

  public static removeItem(collection: any[], id: number): any {
    return collection.filter(item => item.id !== id);
  }

}
