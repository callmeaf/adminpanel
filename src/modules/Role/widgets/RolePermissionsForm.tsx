import * as React from "react";
import useHttp from "@/modules/Base/hooks/use-http";
import coinModuleConfig from "@/modules/Coin/module.config";
import { getCoins } from "@/modules/Coin/requests/coin-requests";
import toCoin from "@/modules/Coin/models/Coin";
import AutoComplete, {
  IOption,
} from "@/modules/Base/components/forms/AutoComplete";
import useValidation from "@/modules/Base/hooks/use-validation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form, { IForm } from "@/modules/Base/components/forms/Form";
import { useTranslations } from "next-intl";
import { Grid2 } from "@mui/material";
import { IRoleModel } from "../models/Role";
import { getPermissions } from "@/modules/Permission/requests/permission-requests";
import toPermission from "@/modules/Permission/models/Permission";

interface IRolePermissionsFormProps extends IForm {
  role: IRoleModel;
}

const RolePermissionsForm: React.FC<IRolePermissionsFormProps> = ({
  role,
  loading,
  onSubmit,
}) => {
  const t = useTranslations("Role.Widgets.Form");

  const { schema } = useValidation((yup, v) =>
    yup.object().shape({
      permissions_ids: yup.array().required(v("required")),
    })
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      permissions_ids: [],
    },
  });

  const [permissions, setPermissions] = React.useState<IOption[]>([]);
  const { handle: handleGetPermissions, loading: loadingGetPermissions } =
    useHttp(coinModuleConfig, getPermissions, {
      onSuccess: (res) => {
        setPermissions(
          res.data
            .map((item) => toPermission(item))
            .map((item) => ({
              id: item.id,
              label: item.name,
              value: item.id,
            }))
        );
      },
    });

  React.useEffect(() => {
    handleGetPermissions({
      per_page: 100,
    });
  }, []);

  React.useEffect(() => {
    if (role && permissions.length) {
      setValue("permissions_ids", role.permissionsArray(permissions) ?? []);
    }
  }, [permissions.length]);

  const submitHandler = (data: any) =>
    onSubmit({
      ...data,
      permissions_ids: data.permissions_ids.map((item: IOption) => item.value),
    });

  return (
    <Form onSubmit={handleSubmit(submitHandler)} loading={loading}>
      <Grid2 size={12}>
        <Controller
          control={control}
          name="permissions_ids"
          render={({ field }) => (
            <AutoComplete
              {...field}
              label={t("permissions_ids_inp_label")}
              error={errors.permissions_ids}
              options={permissions}
              loading={loadingGetPermissions}
              multiple
            />
          )}
        />
      </Grid2>
    </Form>
  );
};

export default RolePermissionsForm;
