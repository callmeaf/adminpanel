"use client";

import * as React from "react";
import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import ProductCategoriesWrapper from "../widgets/ProductCategoriesWrapper";
import moduleConfig from "../module.config";
import usePage from "@/modules/Base/hooks/use-page";

interface IProductCategoriesTrashedPageProps {
}

const ProductCategoriesTrashedPage: React.FC<IProductCategoriesTrashedPageProps> = ({}) => {
  usePage(moduleConfig);

  return (
    <DashboardLayout>
        <ProductCategoriesWrapper trashed/>
    </DashboardLayout>
  );
};

export default ProductCategoriesTrashedPage;
