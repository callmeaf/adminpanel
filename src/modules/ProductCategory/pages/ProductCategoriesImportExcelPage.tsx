"use client";

import DashboardLayout from "@/modules/Dashboard/widgets/DashboardLayout";
import * as React from "react";
import ProductCategoriesImport from "../widgets/ProductCategoriesImport";
import { ImportType } from "@/modules/Base/components/imports/ImportWrapper";

interface IProductCategoriesImportExcelPageProps {}

const ProductCategoriesImportExcelPage: React.FC<IProductCategoriesImportExcelPageProps> = ({}) => {
  return (
    <DashboardLayout withCardWrapper={false}>
      <ProductCategoriesImport type={ImportType.EXCEL} />
    </DashboardLayout>
  );
};

export default ProductCategoriesImportExcelPage;
