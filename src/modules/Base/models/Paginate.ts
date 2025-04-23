import { IResponse } from "@/modules/Base/hooks/use-http";

export interface IPaginateModel {
  first: string;
  last: string;
  prev: null | string;
  next: null | string;
  currentPage: number;
  from: number;
  to: number;
  total: number;
  perPage: number;
  lastPage: number;
  pages: {
    url: null | string;
    label: string;
    active: boolean;
  }[];
}

const toPaginate = <T extends Omit<IResponse<any, true>, "data">>(
  data: T
): IPaginateModel => ({
  first: data.links?.first!,
  last: data.links?.last!,
  prev: data.links?.prev!,
  next: data.links?.next!,
  currentPage: data.meta?.current_page!,
  from: data.meta?.from!,
  to: data.meta?.to!,
  total: data.meta?.total!,
  perPage: data.meta?.per_page!,
  lastPage: data.meta?.last_page!,
  pages:
    data.meta?.links.map((link) => ({
      url: link.url,
      label: link.label,
      active: link.active,
    })) ?? [],
});

export default toPaginate;
