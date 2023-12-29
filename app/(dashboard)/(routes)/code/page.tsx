"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Code } from "lucide-react";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";
import { formSchema } from "./contants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import Empty from "@/components/Empty";
import UserAvatar from "@/components/UserAvatar";
import AIAvatar from "@/components/AIAvatar";
import { useProModel } from "@/hooks/use-pro-model";
import toast from "react-hot-toast";

export default function CodePage() {
  const proModal = useProModel();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  // console.log(messages);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt, // taking the user input
      };

      const newMessages = [...messages, userMessage]; // keeping the history
      const response = await axios.post("/api/code", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]); // adding the chatgpt response

      form.reset();
    } catch (error: any) {
      if (error.response.status === 403) {
        proModal.onOpen();
      } else {
        toast("Something went wrong");
      }
      console.log(error);
    } finally {
      router.refresh(); // this used here because to update the counter for upgrade from the database
    }
  }

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate the code with descriptive input. wikiSavvy will provide in detailed explaination"
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        type="text"
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Generate code by providing the input..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No code generated yet..." />
          )}
          <div className="flex flex-col-reverse gap-y-2">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-3 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <AIAvatar />}
                <p className="text-sm">
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full bg-black/10 p-2 rounded-lg">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-black/10 rounded-lg p-1 "
                          {...props}
                        />
                      ),
                    }}
                    className="text-sm overflow-hidden leading-7"
                  >
                    {message.content as any}
                  </ReactMarkdown>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
