"use client";

import ProductCategoriesForm from "../widgets/ProductCategoriesForm";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";
import { useParams } from "next/navigation";
import toProductCategory, { IProductCategoryModel } from "../models/ProductCategory";
import useHttp from "@/modules/Base/hooks/use-http";
import { getProductCategoryByKey } from "../requests/product-category-requests";
import Show from "@/modules/Base/components/common/Show";
import FormLoading from "@/modules/Base/components/Loading/FormLoading";

interface IProductCategoryEditPageProps {}

const ProductCategoryEditPage: React.FC<IProductCategoryEditPageProps> = ({}) => {
  usePage(moduleConfig);

  const params = useParams();
  const [productCategory, setProductCategory] = React.useState<IProductCategoryModel | undefined>(undefined);

  const { handle: handleGetProductCategoryByKey, loading: loadingGetProductCategoryByKey } = useHttp(
    moduleConfig,
    getProductCategoryByKey,
    {
      onSuccess: (res) => {
        setProductCategory(toProductCategory(res.data));
      },
    }
  );
  React.useEffect(() => {
    handleGetProductCategoryByKey(
      {},
      {
        key: params.productCategoryId,
      }
    );
  }, [params.productCategoryId]);

  return (
    <DashboardLayout>
      <Show when={!!productCategory}>
        <Show.When>
          <ProductCategoriesForm productCategoryModel={productCategory} />
        </Show.When>
        <Show.Else>
          <FormLoading open={loadingGetProductCategoryByKey} />
        </Show.Else>
      </Show>
    </DashboardLayout>
  );
};

export default ProductCategoryEditPage;
