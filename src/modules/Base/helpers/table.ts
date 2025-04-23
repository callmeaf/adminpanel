interface IDefaultTableParams {
  page?: number;
  per_page?: number;
}

type TDefaultTableParams = (
  values?: IDefaultTableParams
) => IDefaultTableParams;

export const defaultTableParams: TDefaultTableParams = (values = {}) => {
  return {
    page: 1,
    per_page: Number(process.env.NEXT_PUBLIC_PER_PAGE_DEFAULT) ?? 15,
    ...values,
  };
};
