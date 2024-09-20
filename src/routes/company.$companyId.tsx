import { useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useShallow } from "zustand/react/shallow";
import { z } from "zod";

import { createFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { getCompanyTreeItems } from "@/lib/api/company.api";
import { transformCompanyItemsToArray } from "@/lib/utils";
import { CompanyBoardHeader } from "@/components/company-view";
import { CompanyBoardTree } from "@/components/company-tree";
import useCompanyTree, {
  CompanyTreeDataItem,
} from "@/stores/company-tree.store";

export const FilterSchema = z.object({
  treeItemName: z.union([z.string().min(1), z.literal("")]),
  onlyCritical: z.boolean(),
  onlyEnergy: z.boolean(),
});

export const Route = createFileRoute("/company/$companyId")({
  loader: ({ params }) => getCompanyTreeItems({ id: params.companyId }),
  pendingComponent: OnPendingComponent,
  component: CompanyBoardComponent,
});

function CompanyBoardComponent() {
  const companyTree = Route.useLoaderData();
  const { companyId } = Route.useParams();

  const methods = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      treeItemName: "",
      onlyCritical: false,
      onlyEnergy: false,
    },
  });

  const [setCompanyTree, filterBy, tree] = useCompanyTree(
    useShallow((state) => [
      state.setCompanyTree,
      state.filterBy,
      state.filteredTree,
    ])
  );
  const treeItems: CompanyTreeDataItem[] = useMemo(
    () => transformCompanyItemsToArray(tree.get(companyId) ?? new Map()),
    [tree, companyId]
  );

  const onValid = useCallback(
    (data: z.infer<typeof FilterSchema>) => {
      filterBy(companyId, data);
    },
    [companyId, filterBy]
  );

  useLayoutEffect(() => {
    if (!companyTree) return;

    setCompanyTree(companyId, companyTree);
  }, [companyTree, companyId, setCompanyTree]);

  useEffect(() => {
    const { unsubscribe } = methods.watch((value) => {
      console.log(FilterSchema.parse(value));
      onValid(FilterSchema.parse(value));
    });

    return () => unsubscribe();
  }, [methods, onValid]);

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-2 flex-shrink-0 flex-grow-0 h-full">
        <CompanyBoardHeader companyId={companyId} />
        <CompanyBoardTree items={treeItems} />
      </form>
    </FormProvider>
  );
}

function OnPendingComponent() {
  const { companyId } = Route.useParams();

  const methods = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      treeItemName: "",
      onlyCritical: false,
      onlyEnergy: false,
    },
  });

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-2 lex-shrink-0 flex-grow-0 h-full">
        <CompanyBoardHeader companyId={companyId} />
        <CompanyBoardTree loading />
      </form>
    </FormProvider>
  );
}
