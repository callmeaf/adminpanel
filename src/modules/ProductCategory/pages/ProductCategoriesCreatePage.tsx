"use client";

import ProductCategoryForms from "../widgets/ProductCategoryForms";
import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import usePage from "@/modules/Base/hooks/use-page";
import moduleConfig from "../module.config";

interface IProductCategoryCreatePageProps {}

const ProductCategoryCreatePage: React.FC<IProductCategoryCreatePageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
        <ProductCategoryForms/>
    </DashboardLayout>
  );
};

export default ProductCategoryCreatePage;
