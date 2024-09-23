"use client";

import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

import { Table } from "@prisma/client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { tableSchema } from "@/schemas/table-schema";

import { Heading } from "@/components/custom-ui/heading";
import { Paragraph } from "@/components/custom-ui/paragraph";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TableFormProps {
  initialData: Table | null;
}

const TableForm: React.FC<TableFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof tableSchema>>({
    resolver: zodResolver(tableSchema),
    defaultValues: initialData || {
      group: "",
      performer: "",
      partner_name: "",
      partner_contact: "",
      request: "",
      response_to_a_request: "",
      request_solution_date: "",
      solving_request_in_days: "",
      feedback: "",
      source: "",
      status: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof tableSchema>) => {
    try {
      setIsLoading(true);

      if (!initialData) {
        await axios.post(`/api/${params.dashboardId}/tables`, values);
      } else {
        await axios.patch(
          `/api/${params.dashboardId}/tables/${params.tableId}`,
          values,
        );
      }

      form.reset();

      router.replace(`/${params.dashboardId}/tables`);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-y-8">
      <div>
        <Heading size="h3">
          {initialData ? "Edit table" : "Create a table"}
        </Heading>
        <Paragraph className="text-muted-foreground">
          {initialData ? "Make changes to your table." : "Add a new table."}
        </Paragraph>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3 lg:grid-cols-5">
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="performer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Performer</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="partner_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Partner Name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="partner_contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Partner Contact</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="request"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Request</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="response_to_a_request"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Response to a Request</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="request_solution_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Request Solution Date</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="solving_request_in_days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solving Request in Days</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Feedback</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button disabled={isLoading}>
              {initialData ? "Save Changes" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TableForm;
