export interface PartialRouteObject {
  caseSensitive?: boolean;
  children?: PartialRouteObject[];
  element?: React.ReactNode;
  path?: string;
}
