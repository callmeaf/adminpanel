import Stepper from "@/modules/Base/components/common/Stepper";
import * as React from "react";
import ProductCategoryInfoForm from "./ProductCategoryInfoForm";
import {useTranslations} from "next-intl";
import useHttp from "@/modules/Base/hooks/use-http";
import {
    storeProductCategory,
    updateProductCategory,
} from "../requests/product-category-requests";
import useStepper from "@/modules/Base/hooks/use-stepper";
import {SET_SNACKBAR} from "@/modules/UI/context/action-types";
import toProductCategory, {IProductCategoryModel} from "@/modules/ProductCategory/models/ProductCategory";
import moduleConfig from "../module.config";

interface IProductCategoryFormsProps {
    productCategoryModel?: IProductCategoryModel;
}

const ProductCategoryForms: React.FC<IProductCategoryFormsProps> = ({productCategoryModel}) => {
    const t = useTranslations("ProductCategory.Widgets.Form");

    const [productCategory, setProductCategory] = React.useState<IProductCategoryModel | undefined>(productCategoryModel);
    const {
        steps,
        activeStep,
        activeStepIndex,
        completed,
        handleNextStep,
        handleBackStep,
        handleResetStep,
        handleGoToRoute,
        handleGoStep,
    } = useStepper([
        {
            id: "product_category_info",
            label: t("product_category_info_label"),
        },
    ]);

    const {handle: handleStoreProductCategory, loading: loadingStoreProductCategory} = useHttp(
        moduleConfig,
        storeProductCategory,
        {
            onSuccess: (res, {uiDispatch, tr}) => {
                uiDispatch({
                    type: SET_SNACKBAR,
                    payload: {
                        type: "success",
                        message: tr("storeProductCategory.success_message"),
                    },
                });
                handleNextStep();
                setProductCategory(toProductCategory(res.data));
            },
        }
    );

    const {handle: handleUpdateProductCategory, loading: loadingUpdateProductCategory} = useHttp(
        moduleConfig,
        updateProductCategory,
        {
            onSuccess: (res, {uiDispatch, tr}) => {
                uiDispatch({
                    type: SET_SNACKBAR,
                    payload: {
                        type: "success",
                        message: tr("updateProductCategory.success_message"),
                    },
                });
                handleNextStep();
                setProductCategory(toProductCategory(res.data));
            },
        }
    );

    const storeProductCategoryHandler = (data: any) => handleStoreProductCategory(data);
    const updateProductCategoryHandler = (data: any) =>
        handleUpdateProductCategory(data, {productCategoryId: productCategory?.id!});

    const resetStepHandler = () => {
        if (productCategoryModel) {
            handleGoToRoute("product_categories_create");
        } else {
            handleResetStep();
            setProductCategory(undefined);
        }
    };

    const goToListRouteHandler = () => {
        handleGoToRoute("product_categories_index");
    };

    const goToEditRouteHandler = () => {
        if (productCategoryModel) {
            handleResetStep();
        } else if (productCategory) {
            handleGoToRoute("product_categories_edit", {
                productCategoryId: productCategory.id,
            });
        }
    };

    return (
        <Stepper
            steps={steps}
            activeStep={activeStep}
            activeStepIndex={activeStepIndex}
            completed={completed}
            handleNextStep={handleNextStep}
            handleBackStep={handleBackStep}
            handleResetStep={resetStepHandler}
            handleGoToList={goToListRouteHandler}
            handleGoToEdit={goToEditRouteHandler}
            handleGoStep={handleGoStep}
            clickableStep={!!productCategory}
        >
            <ProductCategoryInfoForm
                loading={productCategory ? loadingUpdateProductCategory : loadingStoreProductCategory}
                onSubmit={productCategory ? updateProductCategoryHandler : storeProductCategoryHandler}
                productCategory={productCategory}
            />
        </Stepper>
    );
};

export default ProductCategoryForms;
