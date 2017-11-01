export class AFUtils {
  public afPathMaker(paths: string[]): string {
    return "/" + paths.join("/");
  }
}