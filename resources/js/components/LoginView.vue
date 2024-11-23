<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/counter";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = toTypedSchema(
    z.object({
        email: z.string().email(),
        password: z.string().min(4),
    })
);

const form = useForm({
    validationSchema: formSchema,
});

const therouter = useRouter();
const auth = ref({ success: null, message: "" });
const username = ref("");
const password = ref("");
const store = useUserStore();

const customConfig = {
    "Content-Type": "application/json",
};

const bodyParameters = computed(() => {
    return { email: username.value, password: password.value };
});

const login = form.handleSubmit((formData) => {
    username.value = formData.email;
    password.value = formData.password;

    axios({
        url: "http://localhost:8000/api/login",
        method: "post",
        data: bodyParameters.value,
        withCredentials: true,
        headers: customConfig,
    })
        .then((response) => {
            auth.value = response.data;

            if (auth.value.success === true) {
                store.email = username.value;
                store.token = auth.value.data;
                store.thecounter++;
                console.log(store.token);
                therouter.push("/menu");
            }
        })
        .catch((error) => {
            auth.value.success = false;
            auth.value.message =
                "Invalid username or password. Please try again.";
        });
});
</script>

<template>
    <div class="flex items-center justify-center w-full min-h-screen">
        <Card class="w-96">
            <CardHeader class="mb-6 text-3xl font-semibold text-center">
                Library Management System
            </CardHeader>
            <CardContent>
                <form @submit.prevent="login">
                    <FormField v-slot="{ componentField }" name="email">
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    v-bind="componentField"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="password">
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    v-bind="componentField"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <Button type="submit" class="w-full mt-4"> Login </Button>

                    <div
                        v-if="auth.success === false"
                        class="mt-4 text-center text-red-500"
                    >
                        <p>{{ auth.message }}</p>
                    </div>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
