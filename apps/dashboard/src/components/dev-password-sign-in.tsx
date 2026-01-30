"use client";

import { devPasswordSignInAction } from "@/actions/dev-password-sign-in-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@midday/ui/cn";
import { Form, FormControl, FormField, FormItem } from "@midday/ui/form";
import { Input } from "@midday/ui/input";
import { SubmitButton } from "@midday/ui/submit-button";
import { useAction } from "next-safe-action/hooks";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type Props = {
  className?: string;
};

export function DevPasswordSignIn({ className }: Props) {
  const signIn = useAction(devPasswordSignInAction);
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "compliance@nicholasgousis.com",
      password: "dev123",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    signIn.execute({
      ...values,
      redirectTo: `${window.location.origin}/${searchParams.get("return_to") || ""}`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cn("flex flex-col space-y-4", className)}>
          <div className="text-xs text-orange-500 font-mono mb-2 p-2 bg-orange-50 dark:bg-orange-950 rounded">
            ⚠️ DEV MODE ONLY - Email: compliance@nicholasgousis.com / Password: dev123
          </div>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    autoCapitalize="false"
                    autoCorrect="false"
                    spellCheck="false"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {signIn.result.serverError && (
            <div className="text-xs text-red-500">
              {signIn.result.serverError}
            </div>
          )}

          <SubmitButton
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 px-6 py-4 text-white font-medium flex space-x-2 h-[40px] w-full"
            isSubmitting={signIn.isExecuting}
          >
            Dev Login
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
