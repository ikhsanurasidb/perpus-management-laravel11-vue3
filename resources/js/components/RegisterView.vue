<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const router = useRouter();
const showAlertDialog = ref(false);
const alertTitle = ref("");
const alertMessage = ref("");

const formSchema = toTypedSchema(
    z.object({
        name: z
            .string()
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name must not exceed 50 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(4, "Password must be at least 4 characters"),
    })
);

const form = useForm({
    validationSchema: formSchema,
    initialValues: {
        name: "",
        email: "",
        password: "",
    },
});

const onSubmit = async (values) => {
    try {
        const response = await axios.post(
            "http://localhost:8000/api/register",
            values
        );
        console.log(response.data);
        alertTitle.value = "Success";
        alertMessage.value = "Registration successful! You can now log in.";
        showAlertDialog.value = true;
    } catch (error) {
        console.error("Registration error:", error);
        alertTitle.value = "Error";
        alertMessage.value =
            error.response?.data?.message ||
            "An error occurred during registration. Please try again.";
        showAlertDialog.value = true;
    }
};

const handleAlertClose = () => {
    showAlertDialog.value = false;
    if (alertTitle.value === "Success") {
        router.push("/");
    }
};
</script>

<template>
    <div class="flex items-center justify-center w-full min-h-screen">
        <Card class="w-[350px]">
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Create a new account</CardDescription>
            </CardHeader>
            <CardContent>
                <Form
                    @submit="onSubmit"
                    :validation-schema="formSchema"
                    v-slot="{ errors }"
                >
                    <FormField name="name" v-slot="{ field }">
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    v-bind="field"
                                    placeholder="Enter your name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField name="email" v-slot="{ field }">
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    v-bind="field"
                                    type="email"
                                    placeholder="Enter your email"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <FormField name="password" v-slot="{ field }">
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    v-bind="field"
                                    type="password"
                                    placeholder="Enter your password"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                    <Button type="submit" class="w-full mt-4">Register</Button>
                </Form>
            </CardContent>
            <CardFooter class="flex justify-center">
                <router-link
                    to="/"
                    class="text-sm text-blue-600 hover:underline"
                >
                    Already have an account? Log in
                </router-link>
            </CardFooter>
        </Card>
    </div>

    <AlertDialog
        :open="showAlertDialog"
        @update:open="showAlertDialog = $event"
    >
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{{ alertTitle }}</AlertDialogTitle>
                <AlertDialogDescription>
                    {{ alertMessage }}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogAction @click="handleAlertClose"
                    >OK</AlertDialogAction
                >
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>
